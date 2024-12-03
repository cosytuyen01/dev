import { useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data";
import SvgIcon from "../../../../assets/iconSvg";
import Modal from "react-modal";
import "./style.css";
Modal.setAppElement("#root");
const DetailProject = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState("black");
  const [selectedImage, setSelectedImage] = useState(0); // Ảnh đang được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal
  const productData = products.find((product) => product.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    // Ngừng cuộn khi modal mở
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Trả lại trạng thái cuộn khi component bị unmount hoặc khi modal đóng
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

  const oddImages = productData?.images.filter((_, index) => index % 2 === 0);
  const evenImages = productData?.images.filter((_, index) => index % 2 !== 0);

  const handleBackClick = () => {
    navigate(-1);
  };
  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
  };
  const openModal = (index) => {
    setSelectedImage(index); // Cập nhật ảnh được chọn
    setIsModalOpen(true); // Mở modal
  };

  const imageRefs = useRef([]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    // Tự động cuộn đến ảnh đã chọn
    imageRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "center", // Cuộn đến vị trí giữa
      inline: "center", // Cuộn ảnh vào giữa theo chiều ngang
    });
  };
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]); // Opacity thay đổi từ 1 đến 0
  const translateY = useTransform(scrollYProgress, [0.1, 0.3], [0, 0]);
  const opacityTool = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]); // Opacity thay đổi từ 1 đến 0
  const opacityTitle = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]); // Opacity thay đổi từ 1 đến 0
  const opacityDecs = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]); // Opacity thay đổi từ 1 đến 0

  return (
    <div className="px-4 sm:pt-[40px] lg:px-0 pt-[20px] flex flex-col items-center w-full lg:w-[752px] h-[100%]">
      <div
        onClick={handleBackClick}
        className="flex items-center gap-2 w-full cursor-pointer"
      >
        <SvgIcon name={"back"} height={24} width={24} color={iconColor} />
        <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start font-medium">
          Quay lại
        </p>
      </div>

      {/* Image with scroll and fade-in effect */}
      <motion.img
        transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian chuyển động
        src={productData?.images[0]}
        initial={{ opacity: 0, y: 50 }} // Vị trí ban đầu (ngầm ở dưới)
        whileInView={{ opacity: 1, y: 0 }} // Khi ảnh vào viewport
        viewport={{ once: true }}
        style={{
          opacity: opacity,
          translateY: translateY,
        }}
        alt="Product Thumbnail"
        className="rounded-xl mt-4 w-full object-contain"
      />

      <motion.div
        style={{
          opacity: opacityTitle,
          translateY: translateY,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col w-full pt-4 border-b-[1px] border-black/10 dark:border-white/10 pb-4"
      >
        <h1 className="sm:text-start text-textColor dark:text-white/90 text-[26px] md:text-[40px] text-center font-bold w-full">
          {productData?.title}
        </h1>
        <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start font-bold">
          {productData?.category}
        </p>
      </motion.div>
      <div>
        <motion.div
          style={{
            opacity: opacityTool,
            translateY: translateY,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pt-4 border-b-[1px] border-black/10 dark:border-white/10"
        >
          <p className="text-[18px] sm:text-[24px] text-textLightPrimary dark:text-white/90 pb-4">
            Vai trò {productData?.job}
          </p>
          {productData.tools.map((tool, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/80">
                  {tool.name}
                </h3>
                <p className="text-gray-800 dark:text-white/80">{tool.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          style={{
            opacity: opacityDecs,
            translateY: translateY,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[16px] sm:text-[24px] text-textLightPrimary dark:text-white/90 pt-4"
        >
          {productData.description}
        </motion.p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[1200px] mt-4 pb-20">
        {/* Odd Images with Scroll Effect */}
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          {oddImages.map((imageUrl, index) => (
            <motion.img
              key={index}
              src={imageUrl}
              alt="Odd Image"
              className="rounded-2xl cursor-pointer w-full object-contain"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        {/* Even Images with Scroll Effect */}
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          {evenImages.map((imageUrl, index) => (
            <motion.img
              key={index}
              src={imageUrl}
              alt="Even Image"
              className="rounded-2xl cursor-pointer w-full object-contain"
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
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
          overlayClassName="fixed inset-0 dark:bg-black/20 bg-white/20 backdrop-blur"
        >
          <div className="relative  rounded-lg max-w-3xl ">
            <button
              onClick={closeModal}
              className="absolute top-2 right-0 p-2 rounded-full dark:bg-white bg-black mr-4"
            >
              <SvgIcon
                name={"close"}
                height={24}
                width={24}
                color={iconColor}
              />
            </button>
            {/* Ảnh phóng to */}
            <img
              src={productData?.images[selectedImage]}
              alt={`image-${selectedImage}`}
              className="w-[100vw] h-[80vh] object-contain rounded-lg "
            />
            <div className="mt-4 flex gap-2  scroll-container hide-scrollbar">
              {productData?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  className={`w-16 h-16 object-cover cursor-pointer transition-all duration-100 rounded-lg ${
                    selectedImage === index
                      ? "border-4 border-blue-500 shadow-lg"
                      : "opacity-50"
                  }`}
                  ref={(el) => (imageRefs.current[index] = el)}
                  onClick={() => handleImageClick(index)} // Thay đổi ảnh khi nhấn vào ảnh nhỏ
                />
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DetailProject;
