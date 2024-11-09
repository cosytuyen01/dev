import { useLocation } from "react-router-dom";
import Contact from "../../../components/contact";
import HashtagList from "../../../components/hashtags";
import ProductCardList from "../../../components/productList";
import UserProfileCard from "../../../components/userProfileCard";
import { useEffect } from "react";
import ExperienceList from "../../../components/ExList";

function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px]  dark:text-white transition-colors duration-300">
      <UserProfileCard />
      <div className="flex flex-col pt-8 sm:pt-16 gap-4 sm:px-0">
        <Contact />
        <p className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90">
          Forward-thinking product designer specializing in crafting immersive
          and intuitive user experiences, consistently pushing the boundaries of
          design innovation.
        </p>
        <HashtagList />
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

export default Home;
