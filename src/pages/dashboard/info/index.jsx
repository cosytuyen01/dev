import { useEffect, useState } from "react";
import "./style.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Button from "../../../components/button";
import useInfo from "../../../hook/useInfo";
import EditInfo from "./edit";
import EditContact from "./editContact";
import useSkills from "../../../hook/useSkill";
import EditSkill from "./editSkill";
import { message } from "antd";
import Loading from "../../../components/loading";

const SkeletonLoader = () => (
  <div className="w-full h-full bg-black/10 dark:bg-darkSubbg animate-pulse rounded-full" />
);
const InfoPage = () => {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const [dataSkill, setDataSkill] = useState(null);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { Infos, loading, updateInfo } = useInfo();
  const {
    Skills,
    loadingSkill,
    addSkill,
    updateSkill,
    deleteSkill,
    fetchSkills,
  } = useSkills();

  const handleEditInfo = () => {
    setOpen(true);
  };
  const onCloseAdd = () => {
    setOpen(false);
  };

  const handleSave = async (updatedInfo) => {
    try {
      await updateInfo(updatedInfo);
      setOpen(false);
    } catch (err) {
      console.error("Failed to save info:", err.message);
    }
  };

  const handleEditContact = () => {
    setOpenContact(true);
  };
  const onCloseAddContact = () => {
    setOpenContact(false);
  };
  const handleSaveContact = async (updatedInfo) => {
    try {
      await updateInfo(updatedInfo);
      message.success("Lưu thông tin liên hệ thành công!");
      setOpenContact(false);
    } catch (err) {
      console.error("Failed to save info:", err.message);
    }
  };

  const handleEditSkill = (data) => {
    setOpenSkill(true);
    setDataSkill(data);
  };

  const handleAddSkill = () => {
    setOpenSkill(true);
  };
  const onCloseAddSkill = () => {
    setOpenSkill(false);
    setDataSkill(null);
  };
  const handleSaveSkill = async (data) => {
    try {
      (await data?.id) ? updateSkill(data) : addSkill(data);
      setOpenSkill(false);
    } catch (err) {
      console.error("Failed to save info:", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSkill(dataSkill.id); // Gọi hàm deleteSkill từ hook để xóa kỹ năng
      message.success("Kỹ năng đã được xóa!");
      setOpenSkill(false);
      fetchSkills();
    } catch (err) {
      message.error("Có lỗi khi xóa kỹ năng", err); // Thông báo lỗi nếu có
    }
  };
  return (
    <div className="h-none md:h-screen  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="flex flex-col p-4 bg-black/95 rounded-2xl ">
        <div className=" flex flex-row justify-between items-center pb-4 border-b-2 border-borderColor mb-6">
          <h1 className="font-bold text-white/90 text-2xl ">
            Thông tin cá nhân
          </h1>
          <Button text={"Sửa"} onClick={handleEditInfo} />
        </div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="justify-center items-center flex flex-col gap-2"
        >
          <div className="relative z-10 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden">
            {loading ? (
              <Loading />
            ) : (
              // Khi ảnh tải thành công
              <img
                src={Infos?.[0]?.avatar} // Link ảnh avatar chính
                alt="Profile"
                className="object-cover  w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden"
              />
            )}
          </div>

          <h1 className="font-bold text-white/90">{Infos?.[0]?.fullname}</h1>
          <div className="text-white/50">
            {Infos?.[0]?.job || "Đang tải..."} &bull; {Infos?.[0]?.location}
          </div>
          <div className="text-white/50">{Infos?.[0]?.about}</div>
        </motion.div>
      </div>

      <div className="p-4 bg-black/95 rounded-2xl ">
        <div className="flex flex-row justify-between items-center pb-4 border-b-2 border-borderColor mb-6">
          <h1 className=" font-bold text-white/90 text-2xl ">
            Thông tin liên hệ
          </h1>
          <Button text={"Sửa"} onClick={handleEditContact} />
        </div>
        <div className="flex flex-col gap-4 items-start justify-star w-full overflow-hidden">
          <Button
            style={{ width: "inherit" }}
            text={Infos?.[0]?.fb || "FB Chưa cập nhật..."}
          ></Button>

          <Button
            style={{ width: "inherit" }}
            text={Infos?.[0]?.skype || "Skype Chưa cập nhật..."}
          ></Button>
          <Button
            style={{ width: "inherit" }}
            text={`${Infos?.[0]?.cv}` || "CV Chưa cập nhật..."}
          />
        </div>
      </div>
      <div className="p-4 bg-black/95 rounded-2xl">
        <div className="flex flex-row justify-between items-center pb-4 border-b-2 border-borderColor mb-6">
          <h1 className="font-bold text-white/90 text-2xl ">Kỹ năng</h1>
          <Button text={"Thêm"} onClick={handleAddSkill} />
        </div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="justify-center items-center flex flex-col gap-4"
        >
          <div className="flex flex-wrap gap-2 w-full justify-center sm:justify-start">
            {!loadingSkill &&
              Skills.map((skill, index) => (
                <span
                  onClick={() => handleEditSkill(skill)}
                  key={index}
                  className="px-3 py-1 bg-darkSubbg text-white/80 rounded-full text-[14px]"
                >
                  #{skill?.nameSkill}
                </span>
              ))}
          </div>
        </motion.div>
      </div>
      <EditInfo
        isOpen={open}
        data={Infos?.[0]}
        onClose={onCloseAdd}
        onSave={handleSave}
      />
      <EditContact
        isOpen={openContact}
        data={Infos?.[0]}
        onClose={onCloseAddContact}
        onSave={handleSaveContact}
      />
      <EditSkill
        isOpen={openSkill}
        data={dataSkill}
        onClose={onCloseAddSkill}
        onSave={handleSaveSkill}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default InfoPage;
