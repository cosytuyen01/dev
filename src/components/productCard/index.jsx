import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton"; // Import Skeleton

// eslint-disable-next-line react/prop-types
const ProductCard = ({ imageSrc, title, category, onClick, loading }) => {
  return (
    <motion.div
      className="w-full rounded-xl cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl">
        {/* Skeleton loader for image */}
        {loading ? (
          <Skeleton height={300} width="100%" /> // Hiển thị Skeleton nếu đang loading
        ) : (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        )}
      </div>

      {/* Skeleton loader for title */}
      <h3 className="mt-2 text-lg font-semibold text-textColor dark:text-white/80">
        {loading ? <Skeleton width="80%" /> : title}
      </h3>

      {/* Skeleton loader for category */}
      <p className="text-subText dark:text-white/60">
        {loading ? <Skeleton width="60%" /> : category}
      </p>
    </motion.div>
  );
};

export default ProductCard;
