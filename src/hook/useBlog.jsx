import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const useBlog = () => {
  const [blog, setBlog] = useState([]); // Lưu trữ sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi lấy dữ liệu (nếu có)

  // Hàm fetch dữ liệu sản phẩm từ Supabase
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) throw error;
      setBlog(data);
    } catch (err) {
      setError("Failed to fetch data from Supabase: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm sản phẩm mới
  const addBlog = async (newdata) => {
    try {
      const { error } = await supabase.from("blogs").insert([newdata]);
      if (error) throw error;
      fetchBlog();
    } catch (err) {
      setError("Failed to add blog: " + err.message);
    }
  };

  // Hàm sửa thông tin sản phẩm
  const updateBlog = async (data) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update(data)
        .eq("id", data.id); // Giả sử id là trường duy nhất để xác định sản phẩm

      if (error) throw error;
      fetchBlog();
    } catch (err) {
      setError("Failed to update blog: " + err.message);
    }
  };

  // Hàm xóa sản phẩm
  const deleteBlog = async (dataId) => {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", dataId); // Xóa sản phẩm theo ID

      if (error) throw error;

      // Cập nhật lại danh sách sản phẩm sau khi xóa
      setBlog((prevblog) => prevblog.filter((data) => data.id !== dataId));
    } catch (err) {
      setError("Failed to delete data: " + err.message);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchBlog();
  }, []);

  return {
    blog,
    loading,
    error,
    addBlog,
    updateBlog,
    deleteBlog,
    fetchBlog,
  };
};

export default useBlog;
