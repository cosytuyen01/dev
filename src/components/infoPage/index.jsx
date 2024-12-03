/* eslint-disable react/prop-types */
import bgProfile from "../../assets/images/bg-profile.svg";
import { motion, useScroll, useTransform } from "framer-motion";

function InfoPage({ title, desc }) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        scale: scale,
        opacity: opacity,
        y: translateY,
      }}
      className="relative flex items-center rounded-lg gap-6 flex-col w-[100%] h-[120px]"
    >
      <img
        src={bgProfile} // Thay link này bằng ảnh đại diện của bạn
        alt="Profile"
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 dark:opacity-5"
      />
      <div className="z-10 items-center flex flex-col">
        <h1 className="flex items-center text-textColor text-[26px] md:text-[40px] font-bold dark:text-white/80 ">
          {title}
        </h1>
        <p className="text-subText text-[18px] sm:text-[24px] text-center dark:text-white/60">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default InfoPage;
