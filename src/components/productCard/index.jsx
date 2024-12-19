import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ imageSrc, title, category, onClick, loading }) => {
  return (
    <motion.div className="w-full rounded-xl cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden rounded-xl">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Skeleton loader for title */}
      <h3 className="mt-2 text-lg font-semibold text-textColor dark:text-white/80">
        {title}
      </h3>

      {/* Skeleton loader for category */}
      <p className="text-subText dark:text-white/60">{category}</p>
    </motion.div>
  );
};

export default ProductCard;
