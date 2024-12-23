/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import useBlog from "../../hook/useBlog";
import CardBlog from "../cardBlog";
import dayjs from "dayjs";

function BlogList({ isHome }) {
  const { blog } = useBlog();
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    console.log("id", id);

    navigate(`/detail_blog/${id}`);
  };
  // const sortedData = blog.sort((a, b) => {
  //   // So sánh `startDate` của 2 đối tượng
  //   const dateA = dayjs(a.date.startDate, "MM/YYYY");
  //   const dateB = dayjs(b.date.startDate, "MM/YYYY");

  //   return dateB.isBefore(dateA) ? -1 : 1; // Nếu dateB < dateA, b đứng trước
  // });
  console.log("blog", blog);

  return (
    <div className=" flex flex-col">
      {isHome && (
        <h2 className="text-start w-full mb-6 text-[32px] font-semibold text-gray-800 dark:text-white/80">
          Blog của tôi
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blog.map((blog, index) => (
          <CardBlog
            onClick={() => handleCardClick(blog.id)}
            imageSrc={blog?.thumb}
            key={index}
            date={blog?.created_at}
            title={blog?.title}
          />
        ))}
      </div>
      {isHome && (
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => navigate("/projects")}
            className="font-medium transition-all px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-white/90 bg-subBackground dark:bg-darkSubbg rounded-3xl dark:hover:bg-darkSubbg/50 mt-8"
          >
            Xem tất cả
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogList;
