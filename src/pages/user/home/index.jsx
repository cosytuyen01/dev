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
          Với 3 năm kinh nghiệm trong lĩnh vực thiết kế UI/UX và 1 năm lập trình
          mobile, tôi mang đến sự kết hợp giữa thẩm mỹ và công nghệ để tạo ra
          các sản phẩm không chỉ đẹp mắt mà còn có tính ứng dụng cao. Từ việc
          thiết kế giao diện người dùng tinh tế cho đến xây dựng các tính năng
          ứng dụng mượt mà, tôi luôn nỗ lực mang lại trải nghiệm tốt nhất cho
          người dùng và khách hàng.
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
