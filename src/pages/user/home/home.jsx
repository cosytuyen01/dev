/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import Contact from "../../../components/contact";
import HashtagList from "../../../components/hashtags";
import ProductCardList from "../../../components/productList";
import UserProfileCard from "../../../components/userProfileCard";
import { useEffect } from "react";
import ExperienceList from "../../../components/ExList";
import Loading from "../../../components/loading";

import { useScroll, useTransform, motion } from "framer-motion";
import useInfo from "../../../hook/useInfo";

function HomeIndex() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const opacityDecs = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacityHashtag = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const { Infos, loading } = useInfo();

  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px]  dark:text-white transition-colors duration-300 h-full">
      <UserProfileCard />
      <div className="flex flex-col pt-8 sm:pt-16 gap-4 sm:px-0">
        <Contact />
        <motion.p
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={
            {
              // opacity: opacityDecs,
            }
          }
          className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90"
        >
          {Infos?.[0]?.about}
        </motion.p>
        <motion.div
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={
            {
              // opacity: opacityHashtag,
            }
          }
        >
          <HashtagList />
        </motion.div>
      </div>
      <div className="pt-8 sm:pt-16">
        <ProductCardList viewAll={true} isHome={true} />
      </div>
      <div className="pt-10">
        <ExperienceList />
      </div>
    </div>
  );
}

export default HomeIndex;
