import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const useWork = () => {
  const [work, setWork] = useState([]); // Lưu trữ sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi lấy dữ liệu (nếu có)

  // Hàm fetch dữ liệu sản phẩm từ Supabase
  const fetchWork = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("work").select("*");
      if (error) throw error;
      setWork(data);
    } catch (err) {
      setError("Failed to fetch data from Supabase: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm sản phẩm mới
  const addWork = async (newdata) => {
    try {
      const { error } = await supabase.from("work").insert([newdata]);
      if (error) throw error;
      fetchWork();
    } catch (err) {
      setError("Failed to add work: " + err.message);
    }
  };

  // Hàm sửa thông tin sản phẩm
  const updateWork = async (data) => {
    try {
      const { error } = await supabase
        .from("work")
        .update(data)
        .eq("id", data.id); // Giả sử id là trường duy nhất để xác định sản phẩm

      if (error) throw error;
      fetchWork();
    } catch (err) {
      setError("Failed to update work: " + err.message);
    }
  };

  // Hàm xóa sản phẩm
  const deleteWork = async (dataId) => {
    try {
      const { error } = await supabase.from("work").delete().eq("id", dataId); // Xóa sản phẩm theo ID

      if (error) throw error;

      // Cập nhật lại danh sách sản phẩm sau khi xóa
      setWork((prevwork) => prevwork.filter((data) => data.id !== dataId));
    } catch (err) {
      setError("Failed to delete data: " + err.message);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchWork();
  }, []);

  return {
    work,
    loading,
    error,
    addWork,
    updateWork,
    deleteWork,
    fetchWork,
  };
};

export default useWork;
