import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ imageSrc, title, category, onClick }) => {
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
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-[180px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-[16px]  font-semibold text-white/80">{title}</h3>
      <p className="text-white/60 text-[14px]">{category}</p>
    </motion.div>
  );
};

export default ProductCard;
