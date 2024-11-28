import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data";
import SvgIcon from "../../../../assets/iconSvg";

const DetailProject = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState("black");
  const productData = products.find((product) => product.id === parseInt(id));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    // Function to update icon color based on current theme
    const updateIconColor = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIconColor("gray"); // Chế độ tối => màu biểu tượng là đen
      } else {
        setIconColor("gray"); // Chế độ sáng => màu biểu tượng là trắng
      }
    };

    // Run the function initially
    updateIconColor();

    // Listen for changes in theme
    const observer = new MutationObserver(updateIconColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  const oddImages = productData?.images.filter((_, index) => index % 2 === 0);
  const evenImages = productData?.images.filter((_, index) => index % 2 !== 0);
  const handleBackClick = () => {
    navigate(-1); // Quay lại trang trước
  };
  return (
    <div className="px-4  sm:pt-[40px] lg:px-0 pt-[20px] flex flex-col items-center w-full lg:w-[752px] h-[100%]">
      <div
        onClick={handleBackClick}
        className="flex items-center gap-2 w-full cursor-pointer"
      >
        <SvgIcon name={"back"} height={24} width={24} color={iconColor} />
        <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start font-medium">
          Quay lại
        </p>
      </div>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={productData?.images[0]}
        alt="Product Thumbnail"
        className=" rounded-xl mt-4 w-full object-contain"
      />
      <div className="flex flex-col w-full pt-4 border-b-[1px] border-black/10 dark:border-white/10 pb-4">
        <h1 className=" sm:text-start text-textColor dark:text-white/90 text-[26px] md:text-[40px] text-center font-bold w-full">
          {productData?.title}
        </h1>
        <p className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start font-bold">
          {productData?.category}
        </p>
      </div>
      <div className="">
        <div className="pt-4 border-b-[1px] border-black/10 dark:border-white/10">
          {/* <p className=" text-[18px] sm:text-[24px] text-textLightPrimary  dark:text-white/90 pb-4">
            {productData?.category}
          </p> */}
          <p className="text-[18px] sm:text-[24px] text-textLightPrimary  dark:text-white/90 pb-4">
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
        </div>

        <p className="text-[16px] sm:text-[24px] text-textLightPrimary  dark:text-white/90 pt-4">
          {productData.description}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[1200px] mt-4 pb-20">
        <div className="flex flex-col gap-2 w-full sm:w-1/2 ">
          {oddImages.map((imageUrl, index) => (
            <motion.img
              key={index}
              src={imageUrl}
              alt="Odd Image"
              className="rounded-2xl bg-black/20 dark:bg-white/20 cursor-pointer w-full object-contain"
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-1/2  ">
          {evenImages.map((imageUrl, index) => (
            <motion.img
              key={index}
              src={imageUrl}
              alt="Even Image"
              className="rounded-2xl bg-black/10 dark:bg-white/10 cursor-pointer w-full object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProject;
