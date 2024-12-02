import { useEffect } from "react";
import InfoPage from "../../../components/infoPage";
import { useLocation } from "react-router-dom";
import ExperienceList from "../../../components/ExList";
function About() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const handleDownloadCVClick = () => {
    const cvLink =
      "https://drive.google.com/file/d/1D21U89Z1Er0uWm5tMIs2KwZ9vUzPgDnQ/view"; // Replace this with your actual Google Drive CV link
    window.open(cvLink, "_blank"); // Opens in a new tab
  };
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] h-[100%]">
      <InfoPage title={"Giới thiệu"} desc={"Thông tin giới thiệu chi tiết"} />
      <div className="pt-0 sm:pt-4 flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row  gap-4  w-full ">
          <div className="flex flex-1 items-end justify-end ">
            <img
              src="https://i.ibb.co/mDdbCjv/photo-1648854006531-361649aa182c-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg"
              alt="Car"
              className="w-full h-[150px] sm:h-[174px]  object-cover rounded-l-3xl "
            />
          </div>

          <div className="flex flex-[2] items-center justify-center">
            <img
              src="https://i.ibb.co/nbYg74H/avatar.jpg"
              alt="Woman"
              className="h-[400px] sm:h-[364px] w-full object-cover rounded-tl-3xl rounded-br-3xl"
            />
          </div>

          <div className="flex flex-1  justify-start">
            <img
              src="https://images.unsplash.com/photo-1607706009771-de8808640bcf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Dog"
              className="w-full h-[150px] sm:h-[174px] object-cover rounded-r-3xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8">
          <p className=" text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90">
            Với 3 năm kinh nghiệm trong lĩnh vực thiết kế UI/UX và 1 năm lập
            trình mobile, tôi mang đến sự kết hợp giữa thẩm mỹ và công nghệ để
            tạo ra các sản phẩm không chỉ đẹp mắt mà còn có tính ứng dụng cao.
            Từ việc thiết kế giao diện người dùng tinh tế cho đến xây dựng các
            tính năng ứng dụng mượt mà, tôi luôn nỗ lực mang lại trải nghiệm tốt
            nhất cho người dùng và khách hàng.
          </p>
          <div className="flex gap-2 flex-col justify-center">
            <p className="text-subText text-[18px] sm:text-[24px] text-center md:text-start dark:text-white/60">
              UIUX & Developer &bull; Tân Phú, Hồ Chí Minh
            </p>
            <button
              onClick={handleDownloadCVClick}
              className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90"
            >
              DownLoad CV
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <ExperienceList />
      </div>
    </div>
  );
}

export default About;
