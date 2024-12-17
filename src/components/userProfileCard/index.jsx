/* eslint-disable no-unused-vars */
import SvgIcon from "../../assets/iconSvg";
import bgProfile from "../../assets/images/bg-profile.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import useInfo from "../../hook/useInfo";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="w-full h-full bg-black/10 dark:bg-darkSubbg animate-pulse rounded-full" />
);

const UserProfileCard = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const { Infos, loading } = useInfo();
  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={
        {
          // scale: scale,
          // opacity: opacity,
          // y: translateY,
        }
      }
      className="relative flex items-center rounded-lg gap-6 flex-col sm:flex-row"
    >
      {/* Avatar Background */}
      <img
        src={bgProfile}
        alt="Profile"
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 dark:opacity-5"
      />
      <div className="relative z-10 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          // Khi ảnh tải thành công
          <img
            src={Infos?.[0]?.avatar} // Link ảnh avatar chính
            alt="Profile"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* User Information */}
      <div className="relative z-10 flex flex-col items-center sm:items-start">
        <div className="text-center sm:text-start flex items-center text-textColor dark:text-white/90 text-[26px] md:text-[40px] font-bold">
          {Infos?.[0]?.fullname || "Đang tải..."}
          <span className="ml-2">
            <SvgIcon name={"check"} height={30} width={30} color={"#2b9cd5"} />
          </span>
        </div>
        <div className="text-subText text-[18px] sm:text-[24px] dark:text-white/60 text-center sm:text-start">
          {Infos?.[0]?.job || "Đang tải..."} &bull; {Infos?.[0]?.location}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
