import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function CardProduct({ url, title, category, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="overflow-hidden flex-col items-center justify-center cursor-pointer relative transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          className=" rounded-lg w-full h-[180px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          src={url}
          alt={title}
        />
      </div>

      <div className="flex flex-col sm:p-4 gap-2">
        <h2 className="mt-2 text-[16px] font-semibold text-white/90">
          {title}
        </h2>
        <div className="text-xs  text-white/60 inline-block p-2 border border-white/10 rounded-lg">
          {category}
        </div>
      </div>
    </motion.div>
  );
}

export default CardProduct;
