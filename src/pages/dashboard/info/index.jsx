import { useEffect } from "react";
import "./style.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Button from "../../../components/button";
import useInfo from "../../../hook/useInfo";

const SkeletonLoader = () => (
  <div className="w-full h-full bg-black/10 dark:bg-darkSubbg animate-pulse rounded-full" />
);
const InfoPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { Infos, loading, error } = useInfo();
  console.log("Infos", Infos?.[0]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="p-4 bg-black/95 rounded-2xl overflow-hidden">
        <div className="flex flex-row justify-between items-center pb-4 border-b-2 border-borderColor mb-6">
          <h1 className="font-bold text-white/90 text-2xl ">
            Thông tin cá nhân
          </h1>
          <Button text={"Sửa"} />
        </div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="justify-center items-center flex flex-col gap-4"
        >
          <div className="relative z-10 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden">
            {loading ? (
              <SkeletonLoader />
            ) : (
              // Khi ảnh tải thành công
              <img
                src={Infos?.[0].avatar} // Link ảnh avatar chính
                alt="Profile"
                className="object-cover  w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden"
              />
            )}
          </div>

          <h1 className="font-bold text-white/90">{Infos?.[0]?.fullname}</h1>
          <div className="text-white/50">{Infos?.[0]?.job}</div>
          <div className="text-white/50">{Infos?.[0]?.location}</div>
        </motion.div>
      </div>

      <div className="p-4 bg-black/95 rounded-2xl ">
        <div className="flex flex-row justify-between items-center pb-4 border-b-2 border-borderColor mb-6">
          <h1 className=" font-bold text-white/90 text-2xl ">
            Thông tin liên hệ
          </h1>
          <Button text={"Sửa"} />
        </div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="justify-center items-center flex flex-col gap-4"
        >
          {/* <Contact /> */}
        </motion.div>
      </div>
      <div className="p-4 bg-black/95 rounded-2xl">
        <div className="flex flex-row justify-between items-center pb-4 border-b-2 border-borderColor mb-6">
          <h1 className=" font-bold text-white/90 text-2xl ">Mạng xã hội</h1>
          <Button text={"Sửa"} />
        </div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="justify-center items-center flex flex-col gap-4"
        >
          {/* <SocialNetwork /> */}
        </motion.div>
      </div>
    </div>
  );
};

export default InfoPage;
