/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SvgIcon from "../../../../assets/iconSvg";

import Modal from "react-modal";
import "./style.css";
import useProducts from "../../../../hook/useProducts";

import Figma from "../../../../assets/images/Figma.png";
import Ai from "../../../../assets/images/Adobe Ai.webp";
import Pts from "../../../../assets/images/Adobe pts.png";
import Xd from "../../../../assets/images/Adobe Xd.png";
import { Helmet } from "react-helmet";
import useBlog from "../../../../hook/useBlog";
import RenderEditorData from "../../../../components/renderEditorData";

Modal.setAppElement("#root");
const DetailBlog = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState("black");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blog, loading } = useBlog();

  const productData = blog.find((product) => product.id === parseInt(id));
  const date = new Date(productData?.created_at);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log("productData", productData);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const updateIconColor = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIconColor("gray");
      } else {
        setIconColor("gray");
      }
    };

    updateIconColor();

    const observer = new MutationObserver(updateIconColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const allImages = productData?.img_detail || [];

  const handleBackClick = () => {
    navigate(-1);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const imageRefs = useRef([]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    imageRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const translateY = useTransform(scrollYProgress, [0.1, 0.3], [0, 0]);
  const opacityTool = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const opacityTitle = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const opacityDecs = useTransform(scrollYProgress, [0.4, 1], [1, 0]);

  const toolImages = {
    Figma: Figma,
    "Adobe Ai": Ai,
    "Adobe Pts": Pts,
    "Adobe Xd": Xd,
  };

  return (
    <div
      className={`sm:pt-[20px] lg:px-0 pt-[10px] flex flex-col items-center w-full lg:w-[752px] h-[100%] pb-10`}
    >
      <Helmet>
        <title>{"Blog about " + productData?.title || "Blog about..."}</title>
        <link rel="icon" href={productData?.thumb} type="image/png" />
      </Helmet>
      <div
        onClick={handleBackClick}
        className={`px-4  flex items-center gap-2 w-full cursor-pointer sticky top-0 z-${
          isModalOpen ? 0 : 10
        } dark:bg-darkBg/90 bg-backgroundPrimary/90 backdrop-blur py-4`}
      >
        <SvgIcon name={"back"} height={24} width={24} color={iconColor} />
        <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start font-medium">
          Go back
        </p>
      </div>

      {/* Image with scroll and fade-in effect */}
      <div className="px-4 w-full ">
        {/* Skeleton loading for image */}
        {loading ? (
          <div className="w-full h-64 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-xl mt-4"></div>
        ) : (
          <motion.img
            loading="lazy"
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={productData?.thumb}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            alt="Product Thumbnail"
            className="rounded-xl mt-4 w-full object-contain"
          />
        )}

        {/* Skeleton loading for title */}
        {loading ? (
          <div className="w-full mt-4 bg-gray-200 dark:bg-darkSubbg animate-pulse h-8 rounded-lg"></div>
        ) : (
          <motion.div
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col w-full pt-4 border-b-[1px] border-black/10 dark:border-white/10 pb-4"
          >
            <h1 className=" text-textColor dark:text-white/90 text-[26px] md:text-[40px] font-bold w-full">
              {productData?.title}
            </h1>
            <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/80  font-bold">
              {formattedDate}
            </p>
          </motion.div>
        )}

        <div>
          {/* Skeleton for description */}
          {loading ? (
            <div className="h-4 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md w-full mt-4"></div>
          ) : (
            <motion.p
              style={
                {
                  // opacity: opacityDecs,
                  // translateY: translateY,
                }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[16px] sm:text-[24px] text-textLightPrimary dark:text-white/90 pt-4"
            >
              <RenderEditorData editorData={productData?.desc} />
              {/* {productData?.desc} */}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
