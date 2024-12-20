import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const CardBlog = ({ imageSrc, title, date, onClick }) => {
  const datee = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = datee.toLocaleDateString("en-US", options);
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
          className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-[16px] font-semibold text-white/80 truncate">
        {title}
      </h3>
      <p className="text-white/60 text-[14px]">{formattedDate}</p>
    </motion.div>
  );
};

export default CardBlog;
