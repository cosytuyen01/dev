import { useLocation } from "react-router-dom";
import Contact from "../../../components/contact";
import HashtagList from "../../../components/hashtags";
import ProductCardList from "../../../components/productList";
import UserProfileCard from "../../../components/userProfileCard";
import { useEffect } from "react";
import ExperienceList from "../../../components/ExList";
import { useScroll, useTransform, motion } from "framer-motion";
import useInfo from "../../../hook/useInfo";

function Home() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const opacityDecs = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacityHashtag = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const { Infos, loading } = useInfo();

  return (
    <div
      className={`pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] transition-colors duration-300 `}
    >
      <UserProfileCard />

      <div className="flex flex-col pt-8 sm:pt-16 gap-4 sm:px-0">
        {/* Skeleton cho Contact */}
        {loading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-8 w-full"></div>
        ) : (
          <Contact />
        )}

        {/* Skeleton cho phần giới thiệu nếu đang loading */}
        {loading ? (
          <>
            <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-6 w-full mx-auto mt-4" />
            <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-6 w-full mx-auto mt-4" />
            <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-6 w-full mx-auto mt-4" />
          </>
        ) : (
          <motion.p
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              opacity: opacityDecs,
            }}
            className="text-[18px] sm:text-[24px] text-textLightPrimary dark:text-white/90 text-center md:text-start"
          >
            {Infos?.[0]?.about}
          </motion.p>
        )}

        {/* Skeleton cho HashtagList */}
        {loading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-6 w-1/2 mx-auto mt-4"></div>
        ) : (
          <motion.div
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              opacity: opacityHashtag,
            }}
          >
            <HashtagList />
          </motion.div>
        )}
      </div>

      {/* Skeleton cho ProductCardList */}
      <div className="pt-8 sm:pt-16">
        {loading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-64 w-full mt-4"></div>
        ) : (
          <ProductCardList viewAll={true} isHome={true} />
        )}
      </div>

      {/* Skeleton cho ExperienceList */}
      <div className="pt-10">
        {loading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-darkSubbg rounded-md h-16 w-full mt-4"></div>
        ) : (
          <ExperienceList />
        )}
      </div>
    </div>
  );
}

export default Home;
