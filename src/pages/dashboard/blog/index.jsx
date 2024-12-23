import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Loading from "../../../components/loading";
import useBlog from "../../../hook/useBlog";
import CardBlog from "../../../components/cardBlogDashboard";
import EditBlog from "./edit";

export default function BlogPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const { blog, loading, deleteBlog, updateBlog, addBlog, fetchBlog } =
    useBlog();

  const handleEdit = (data) => {
    setOpen(true);
    setData(data);
  };
  const handleDelete = async () => {
    try {
      await deleteBlog(data.id);
      message.success("Xóa bài viết thành công");
      setOpen(false);
      fetchBlog();
    } catch (err) {
      message.error("Có lỗi khi xóa kỹ năng", err); // Thông báo lỗi nếu có
    }
  };
  const handleSave = async (product) => {
    try {
      (await data?.id) ? updateBlog(product) : addBlog(product);
      setOpen(false);
      message.success(
        data?.id
          ? "Chỉnh sửa bài viết thành công!"
          : "Thêm bài viết thành công!"
      );
    } catch (err) {
      console.error("Failed to save info:", err.message);
    }
  };
  const onCloseAdd = () => {
    setOpen(false);
    setData(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex flex-row  items-center gap-4">
          <h1 className="font-bold text-white/90 text-2xl ">
            Danh sách bài viết
          </h1>
          <Button
            onClick={() => setOpen(true)}
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-4 pb-10">
          {blog?.map((blog, index) => (
            <CardBlog
              onClick={() => handleEdit(blog)}
              imageSrc={blog?.thumb}
              key={index}
              date={blog?.created_at}
              title={blog?.title}
            />
          ))}
        </div>
      )}
      <EditBlog
        isOpen={open}
        onClose={onCloseAdd}
        data={data}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
