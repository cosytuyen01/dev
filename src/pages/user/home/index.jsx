import Contact from "../../../components/contact";
import HashtagList from "../../../components/hashtags";
import ProductCardList from "../../../components/productList";
import UserProfileCard from "../../../components/userProfileCard";

function Home() {
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px]  dark:text-white transition-colors duration-300">
      <UserProfileCard />
      <div className="flex flex-col pt-16 gap-4 sm:px-0">
        <Contact />
        <p className="text-[18px] sm:text-[24px] text-subText text-center md:text-start dark:text-white/70">
          Forward-thinking product designer specializing in crafting immersive
          and intuitive user experiences, consistently pushing the boundaries of
          design innovation.
        </p>
        <HashtagList />
      </div>
      <div className="pt-16">
        <ProductCardList viewAll={true} isHome={true} />
      </div>
    </div>
  );
}

export default Home;
