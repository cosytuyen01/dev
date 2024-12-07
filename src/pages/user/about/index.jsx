import { useEffect, useState } from "react";
import InfoPage from "../../../components/infoPage";
import { useLocation } from "react-router-dom";
import ExperienceList from "../../../components/ExList";
import { motion, useScroll, useTransform } from "framer-motion";

const SkeletonLoader = () => (
  <div className="w-full h-[400px] sm:h-[364px] bg-black/10 dark:bg-darkSubbg animate-pulse rounded-full" />
);

function About() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  // Trạng thái để theo dõi ảnh có đang tải không
  useEffect(() => {
    const images = [
      "https://i.ibb.co/mDdbCjv/photo-1648854006531-361649aa182c-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
      "https://i.ibb.co/nbYg74H/avatar.jpg",
      "https://images.unsplash.com/photo-1607706009771-de8808640bcf?q=80&w=1974&auto=format&fit=crop&ixlib=r...",
    ];

    // Tạo một đối tượng Image để kiểm tra việc tải ảnh
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    // Kiểm tra khi tất cả ảnh tải xong
    Promise.all(imagePromises)
      .then(() => setLoading(false)) // Cập nhật loading thành false khi tất cả ảnh đã tải xong
      .catch(() => setLoading(false)); // Nếu có lỗi trong quá trình tải ảnh
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.2, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
  const opacityDecs = useTransform(scrollYProgress, [0.3, 1.1], [1, 0]);
  const opacityInfoMore = useTransform(scrollYProgress, [0.7, 1.4], [1, 0]);

  const handleDownloadCVClick = () => {
    const cvLink =
      "https://drive.google.com/file/d/1D21U89Z1Er0uWm5tMIs2KwZ9vUzPgDnQ/view"; // Thay thế bằng link CV thực tế
    window.open(cvLink, "_blank"); // Mở CV trong tab mới
  };

  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] h-[100%]">
      <InfoPage title={"Giới thiệu"} desc={"Thông tin giới thiệu chi tiết"} />
      <motion.div className="pt-0 sm:pt-4 flex flex-col items-center justify-center">
        <motion.div
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            scale: scale,
            opacity: opacity,
          }}
          className="flex flex-col sm:flex-row  gap-4  w-full "
        >
          <div className="flex flex-1 items-end justify-end ">
            {loading ? (
              <SkeletonLoader /> // Hiển thị Skeleton trong khi ảnh tải
            ) : (
              <img
                src="https://i.ibb.co/mDdbCjv/photo-1648854006531-361649aa182c-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg"
                alt="Car"
                className="w-full h-[150px] sm:h-[174px] object-cover rounded-l-3xl"
              />
            )}
          </div>

          <div className="flex flex-[2] items-center justify-center">
            {loading ? (
              <SkeletonLoader /> // Hiển thị Skeleton trong khi ảnh tải
            ) : (
              <img
                src="https://i.ibb.co/nbYg74H/avatar.jpg"
                alt="Woman"
                className="h-[400px] sm:h-[364px] w-full object-cover rounded-tl-3xl rounded-br-3xl"
              />
            )}
          </div>

          <div className="flex flex-1 justify-start">
            {loading ? (
              <SkeletonLoader /> // Hiển thị Skeleton trong khi ảnh tải
            ) : (
              <img
                src="https://images.unsplash.com/photo-1607706009771-de8808640bcf?q=80&w=1974&auto=format&fit=crop&ixlib=r... "
                alt="Dog"
                className="w-full h-[150px] sm:h-[174px] object-cover rounded-r-3xl"
              />
            )}
          </div>
        </motion.div>
        <div className="flex flex-col gap-4 pt-8">
          <motion.p
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              opacity: opacityDecs,
            }}
            className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90"
          >
            Với 3 năm kinh nghiệm trong lĩnh vực thiết kế UI/UX và 1 năm lập
            trình mobile, tôi mang đến sự kết hợp giữa thẩm mỹ và công nghệ để
            tạo ra các sản phẩm không chỉ đẹp mắt mà còn có tính ứng dụng cao.
            Từ việc thiết kế giao diện người dùng tinh tế cho đến xây dựng các
            tính năng ứng dụng mượt mà, tôi luôn nỗ lực mang lại trải nghiệm tốt
            nhất cho người dùng và khách hàng.
          </motion.p>
          <motion.div
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              opacity: opacityInfoMore,
            }}
            className="flex gap-2 flex-col justify-center"
          >
            <p className="text-subText text-[18px] sm:text-[24px] text-center md:text-start dark:text-white/60">
              UIUX & Developer &bull; Tân Phú, Hồ Chí Minh
            </p>
            <button
              onClick={handleDownloadCVClick}
              className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90"
            >
              DownLoad CV
            </button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="pt-10">
        <ExperienceList />
      </motion.div>
    </div>
  );
}

export default About;
