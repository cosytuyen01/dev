/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import InfoPage from "../../../components/infoPage";
import { useLocation } from "react-router-dom";
import ExperienceList from "../../../components/ExList";
import { motion, useScroll, useTransform } from "framer-motion";
import useInfo from "../../../hook/useInfo";

function About() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
  const opacityDecs = useTransform(scrollYProgress, [0.3, 1.1], [1, 0]);
  const opacityInfoMore = useTransform(scrollYProgress, [0.7, 1.4], [1, 0]);

  const { Infos, loading } = useInfo(); // Trạng thái loading từ hook useInfo
  const handleDownloadCVClick = () => {
    const cvLink = `${Infos?.[0]?.cv}`; // Thay thế bằng link CV thực tế
    window.open(cvLink, "_blank"); // Mở CV trong tab mới
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className={`pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] ${
        loading ? "h-screen" : "h-full"
      }`}
    >
      <InfoPage title={"Giới thiệu"} desc={"Thông tin giới thiệu chi tiết"} />
      <motion.div className="pt-0 sm:pt-4 flex flex-col items-center justify-center">
        <motion.div
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={
            {
              // scale: scale,
              // opacity: opacity,
            }
          }
          className="flex flex-col sm:flex-row gap-4 w-full"
        >
          {/* Left Image */}
          <div className="flex flex-1 items-end justify-end">
            {!loading && (
              <img
                src="https://i.ibb.co/mDdbCjv/photo-1648854006531-361649aa182c-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg"
                alt="Car"
                className="w-full h-[150px] sm:h-[174px] object-cover rounded-l-3xl"
              />
            )}
          </div>

          {/* Center Image (Avatar) */}
          <div className="flex flex-[2] items-center justify-center">
            {!loading && (
              <img
                src={Infos?.[0]?.avatar}
                alt="Woman"
                className="h-[400px] sm:h-[364px] w-full object-cover rounded-tl-3xl rounded-br-3xl"
              />
            )}
          </div>

          {/* Right Image */}
          <div className="flex flex-1 justify-start">
            {!loading && (
              <img
                src="https://images.unsplash.com/photo-1607706009771-de8808640bcf?q=80&w=1974&auto=format&fit=crop&ixlib=r..."
                alt="Dog"
                className="w-full h-[150px] sm:h-[174px] object-cover rounded-r-3xl"
              />
            )}
          </div>
        </motion.div>

        {/* Description */}
        <div className="flex flex-col gap-4 pt-8">
          <motion.p
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={
              {
                // opacity: opacityDecs,
              }
            }
            className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90"
          >
            {!loading && Infos?.[0]?.about}
          </motion.p>

          {/* Additional Info */}
          <motion.div
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              opacity: opacityInfoMore,
            }}
            className="flex gap-2 flex-col justify-center"
          >
            <p className="text-subText text-[18px] sm:text-[24px] text-center md:text-start dark:text-white/60">
              {Infos?.[0]?.job || "Đang tải..."} &bull; {Infos?.[0]?.location}
            </p>
            <button
              onClick={handleDownloadCVClick}
              className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90"
            >
              {!loading && "Download CV"}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Experience List */}
      <motion.div className="pt-10">
        <ExperienceList />
      </motion.div>
    </div>
  );
}

export default About;
