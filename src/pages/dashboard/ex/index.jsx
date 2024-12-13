import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExperienceCard from "../../../components/experienceCardDashboard";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useWork from "../../../hook/useWork";
import Loading from "../../../components/loading";
import EditWork from "./edit";

function Experience() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const { work, loading, addWork, deleteWork, fetchWork, updateWork } =
    useWork();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log("work", work);

  const handleEdit = (data) => {
    setOpen(true);
    setData(data);
  };
  const handleDelete = async () => {
    try {
      await deleteWork(data.id);
      message.success("Xóa kinh nghiệm thành công");
      setOpen(false);
      fetchWork();
    } catch (err) {
      message.error("Có lỗi khi xóa kinh nghiệm", err); // Thông báo lỗi nếu có
    }
  };
  const handleSave = async (product) => {
    console.log("product", product);

    try {
      (await data?.id) ? updateWork(product) : addWork(product);
      setOpen(false);
      message.success(`Thêm kinh nghiệm thành công!`);
    } catch (err) {
      console.error("Failed to save info:", err.message);
    }
  };
  const onCloseAdd = () => {
    setOpen(false);
    setData(null);
  };
  return (
    <div className="flex flex-col w-full p-4  h-screen gap-4">
      <div className="flex flex-row  items-center gap-4">
        <h1 className="font-bold text-white/90 text-2xl ">
          Danh sách kinh nghiệm
        </h1>
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </div>
      {loading && <Loading />}
      {work?.map((work, index) => (
        <ExperienceCard
          onClick={() => handleEdit(work)}
          key={index}
          job={work}
        />
      ))}
      <EditWork
        isOpen={open}
        onClose={onCloseAdd}
        data={data}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Experience;