import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data";

const DetailProject = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const productData = products.find((product) => product.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, 0]);





  const oddImages = productData?.images.filter((_, index) => index % 2 === 0);
  const evenImages = productData?.images.filter((_, index) => index % 2 !== 0);

  return (
    <div className="pt-[140px] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center gap-6"
      >
        <img
          src={productData?.logo}
          alt={productData?.title}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-3xl"
        />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-textDarkPrimary text-center md:text-left break-words w-full px-4 md:px-0">
            {productData?.title}
          </h1>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 font-medium">
            {productData?.category}
          </h3>
        </div>
      </motion.div>

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={productData?.images[0]}
        alt="Product Thumbnail"
        className="border border-gray-200 rounded-2xl mt-8 w-full max-w-[90vw] object-contain"
      />

      <div className="mt-12 flex flex-col md:flex-row gap-8 w-full max-w-[1200px] px-6">
        <motion.div
          style={{ y: translateY }}
          transition={{ duration: 1 }}
          className="border border-gray-200 rounded-xl p-6 flex-1"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-textDarkPrimary border-b border-gray-200 pb-3 mb-4">
            Overview
          </h1>
          <p className="text-gray-700">{productData.description}</p>
        </motion.div>
        <motion.div
          style={{ y: translateY }}
          transition={{ duration: 1 }}
          className="border border-gray-200 rounded-xl p-6 flex-1"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-textDarkPrimary border-b border-gray-200 pb-3 mb-4">
            Tools
          </h1>
          {productData.tools.map((tool, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{tool.name}</h3>
                <p className="text-gray-500">Design tool</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-[1200px] mt-10">
        <div className="flex flex-col gap-6 w-full sm:w-1/2">
          {oddImages.map((imageUrl, index) => (
            <motion.img
              key={index}
              src={imageUrl}
              alt="Odd Image"
              className="rounded-2xl bg-gray-50 cursor-pointer w-full object-contain"
            />
          ))}
        </div>
        <div className="flex flex-col gap-6 w-full sm:w-1/2">
          {evenImages.map((imageUrl, index) => (
            <motion.img
              key={index}
              src={imageUrl}
              alt="Even Image"
              className="rounded-2xl bg-gray-200 cursor-pointer w-full object-contain"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default DetailProject;
