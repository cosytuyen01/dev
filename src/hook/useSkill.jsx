import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const useSkills = () => {
  const [Skills, setSkills] = useState([]); // Lưu trữ sản phẩm
  const [loadingSkill, setLoadingSkill] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi lấy dữ liệu (nếu có)

  const fetchSkills = async () => {
    try {
      setLoadingSkill(true);
      const { data, error } = await supabase.from("skill").select("*");
      if (error) {
        throw error;
      }
      setSkills(data); // Cập nhật lại state
      return data;
    } catch (err) {
      setError("Failed to fetch data from Supabase: " + err.message);
    } finally {
      setLoadingSkill(false);
    }
  };
  console.log("Skills", Skills);

  // Hàm thêm sản phẩm mới
  const addSkill = async (newSkill) => {
    try {
      const { error } = await supabase.from("skill").insert([newSkill]);

      if (error) throw error;

      // Cập nhật lại danh sách sản phẩm sau khi thêm
      fetchSkills();
    } catch (err) {
      setError("Failed to add Skill: " + err.message);
    }
  };

  // Hàm sửa thông tin sản phẩm
  const updateSkill = async (updatedSkill) => {
    console.log("updatedSkill", updatedSkill);

    try {
      const { error } = await supabase
        .from("skill")
        .update(updatedSkill)
        .eq("id", updatedSkill.id); // Giả sử id là trường duy nhất để xác định sản phẩm

      if (error) throw error;
      fetchSkills();
    } catch (err) {
      setError("Failed to update Skill: " + err.message);
    }
  };

  // Hàm xóa sản phẩm
  const deleteSkill = async (SkillId) => {
    try {
      const { error } = await supabase.from("skill").delete().eq("id", SkillId); // Xóa sản phẩm theo ID
      fetchSkills();
      if (error) throw error;
    } catch (err) {
      setError("Failed to delete Skill: " + err.message);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    Skills,
    loadingSkill,
    error,
    addSkill,
    updateSkill,
    deleteSkill,
    fetchSkills,
  };
};

export default useSkills;
