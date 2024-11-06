import Contact from "../../../components/contact";
import HashtagList from "../../../components/hashtags";
import ProductCardList from "../../../components/productList";
import UserProfileCard from "../../../components/userProfileCard";

function Home() {
  return (
    <div className="pt-16 mx-auto pb-40 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px]">
      <UserProfileCard />
      <div className="flex flex-col pt-16 gap-4 sm:px-0">
        <Contact />
        <p className="text-[24px] text-center md:text-start">
          Forward-thinking product designer specializing in crafting immersive
          and intuitive user experiences, consistently pushing the boundaries of
          design innovation.
        </p>
        <HashtagList />
      </div>
      <ProductCardList />
    </div>
  );
}

export default Home;
