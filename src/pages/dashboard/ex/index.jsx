import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExperienceCard from "../../../components/experienceCardDashboard";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useWork from "../../../hook/useWork";
import Loading from "../../../components/loading";
import EditWork from "./edit";
import dayjs from "dayjs";

function Experience() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const { work, loading, addWork, deleteWork, fetchWork, updateWork } =
    useWork();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleEdit = (data) => {
    setOpen(true);
    setData(data);
  };
  const sortedData = work.sort((a, b) => {
    // So sánh `startDate` của 2 đối tượng
    const dateA = dayjs(a.date.startDate, "MM/YYYY");
    const dateB = dayjs(b.date.startDate, "MM/YYYY");

    return dateB.isBefore(dateA) ? -1 : 1; // Nếu dateB < dateA, b đứng trước
  });

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
    try {
      (await data?.id) ? updateWork(product) : addWork(product);
      setOpen(false);
      setData(null);
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
      {sortedData?.map((work, index) => (
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
