import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function CardProduct({ url, title, description, category, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="overflow-hidden flex-col items-center justify-center cursor-pointer relative transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
    >
      <motion.img
        className=" rounded-lg w-full h-[200px] object-cover transition-all duration-[600ms] ease-in-out"
        src={url}
        alt={title}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.1 }}
      />
      <div className="p-4 sm:p-4">
        <div className="text-xs text-textDarkPrimary inline-block p-2 border border-white/10 rounded-lg">
          {category}
        </div>
        <h2 className="mt-2 text-lg font-semibold text-textDarkPrimary">
          {title}
        </h2>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}

export default CardProduct;
