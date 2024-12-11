import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const useInfo = () => {
  const [Infos, setInfos] = useState([]); // Lưu trữ sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi lấy dữ liệu (nếu có)

  // Hàm fetch dữ liệu
  const fetchInfos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("info").select("*");
      if (error) throw error;
      setInfos(data);
    } catch (err) {
      setError("Failed to fetch data from Supabase: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm sửa thông tin
  const updateInfo = async (updatedInfo) => {
    try {
      const { data, error } = await supabase
        .from("info")
        .update(updatedInfo, { returning: "representation" })
        .eq("id", updatedInfo.id); // Giả sử id là trường duy nhất để xác định sản phẩm

      if (error) throw error;

      // Cập nhật lại
      setInfos((prevInfos) =>
        prevInfos.map((Info) => (Info.id === updatedInfo.id ? data?.[0] : Info))
      );
      fetchInfos();
    } catch (err) {
      setError("Failed to update Info: " + err.message);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchInfos();
  }, []);

  return { Infos, loading, error, updateInfo };
};

export default useInfo;
