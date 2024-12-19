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

Modal.setAppElement("#root");
const DetailProject = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState("black");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, loading } = useProducts();
  const productData = products.find((product) => product.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      className={`sm:pt-[20px] lg:px-0 pt-[10px] flex flex-col items-center w-full lg:w-[752px] h-[100%] `}
    >
      <Helmet>
        <title> {"Sản phẩm " + productData?.name || "Chi tiết sản phẩm"}</title>
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
          Quay lại
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
            style={{
              opacity: opacity,
              translateY: translateY,
            }}
            alt="Product Thumbnail"
            className="rounded-xl mt-4 w-full object-contain"
          />
        )}

        {/* Skeleton loading for title */}
        {loading ? (
          <div className="w-full mt-4 bg-gray-200 dark:bg-darkSubbg animate-pulse h-8 rounded-lg"></div>
        ) : (
          <motion.div
            style={
              {
                // opacity: opacityTitle,
                // translateY: translateY,
              }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col w-full pt-4 border-b-[1px] border-black/10 dark:border-white/10 pb-4"
          >
            <h1 className="sm:text-start text-textColor dark:text-white/90 text-[26px] md:text-[40px] text-center font-bold w-full">
              {productData?.name}
            </h1>
            <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/80 text-center sm:text-start font-bold">
              {productData?.category}
            </p>
          </motion.div>
        )}

        <div>
          {/* Skeleton for tools */}
          {loading ? (
            <div className="space-y-4 mt-4">
              <div className="h-6 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md w-2/4"></div>
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-14 h-14 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md w-2/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              style={
                {
                  // opacity: opacityTool,
                  // translateY: translateY,
                }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pt-4 border-b-[1px] border-black/10 dark:border-white/10"
            >
              <p className="text-[18px] sm:text-[24px] text-textLightPrimary dark:text-white/90 pb-4">
                Vai trò {productData?.role}
              </p>
              {productData?.tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <img
                    loading="lazy"
                    src={toolImages[tool] || Figma}
                    alt={tool}
                    className="w-14 h-14 rounded-mdss object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/80">
                      {tool}
                    </h3>
                    <p className="text-gray-800 dark:text-white/80">
                      {tool.sub}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

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
              {productData?.description}
            </motion.p>
          )}
        </div>

        <div className="flex sm:flex-row gap-2 w-full max-w-[1200px] mt-4 pb-20  ">
          <div className="flex flex-wrap gap-4">
            {allImages?.map((imageUrl, index) => (
              <motion.img
                loading="lazy"
                key={index}
                src={imageUrl}
                alt={`Image-${index}`}
                className="rounded-2xl cursor-pointer w-full sm:w-[calc(50%-8px)] object-contain"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                onClick={() => openModal(index)}
              />
            ))}
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10]"
            overlayClassName="fixed inset-0 dark:bg-black/20 bg-white/20 backdrop-blur"
          >
            <div className="relative rounded-lg max-w-3xl">
              <button
                onClick={closeModal}
                className=" absolute top-2 right-0 p-2 rounded-full dark:bg-white bg-black mr-4"
              >
                <SvgIcon
                  name={"close"}
                  height={24}
                  width={24}
                  color={iconColor}
                />
              </button>
              <img
                src={productData?.img_detail[selectedImage]}
                alt={`image-${selectedImage}`}
                className="w-[100vw] h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 flex gap-2  scroll-container hide-scrollbar">
                {productData?.img_detail.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    className={`w-[64px] h-[64px] object-cover cursor-pointer transition-all duration-100 rounded-lg ${
                      selectedImage === index
                        ? "border-4 border-blue-500 shadow-lg"
                        : "opacity-50"
                    }`}
                    ref={(el) => (imageRefs.current[index] = el)}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DetailProject;
