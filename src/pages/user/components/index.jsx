import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import InfoPage from "../../../components/infoPage";

import Tabs from "../../../components/tabs";
import { useEffect, useState } from "react";
import mockup from "../../../assets/images/mockup.png";
import Button from "./button";
import Confirm from "./confirm";
function Components() {
  const [activeTab, setActiveTab] = useState("Button");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const tabs = ["Button", "Modal", "Loading", "Input", "Card"];
  const handleClick = (type) => {
    console.log(`${type} button clicked!`);
  };
  return (
    <div className="pt-16 mx-auto pb-10  sm:px-6 lg:px-8 w-full lg:w-[752px] h-full">
      <InfoPage title={"Components"} desc={"Một số component thường sử dụng"} />
      <motion.img
        transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian chuyển động
        src={mockup}
        initial={{ opacity: 0, y: 50 }} // Vị trí ban đầu (ngầm ở dưới)
        whileInView={{ opacity: 1, y: 0 }} // Khi ảnh vào viewport
        viewport={{ once: true }}
        alt="Product Thumbnail"
        className=" rounded-xl mt-4 w-[80%]  md:w-full object-contain "
      />
      <div className="px-4 sticky top-0 z-10  dark:bg-darkBg/90 bg-backgroundPrimary/90 backdrop-blur">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} data={tabs} />
      </div>
      {activeTab === "Button" && (
        <div className="flex flex-wrap gap-4 py-4">
          <Button
            label="Primary"
            type="primary"
            onClick={() => handleClick("Primary")}
          />
          <Button
            label="Secondary"
            type="secondary"
            onClick={() => handleClick("Secondary")}
          />
          <Button
            label="Danger"
            type="danger"
            onClick={() => handleClick("Danger")}
          />
          <Button
            label="Success"
            type="success"
            onClick={() => handleClick("Success")}
          />
          <Button
            label="Warning"
            type="warning"
            onClick={() => handleClick("Warning")}
          />
          <Button
            label="Info"
            type="info"
            onClick={() => handleClick("Info")}
          />
        </div>
      )}
      {activeTab === "Modal" && (
        <div className="flex flex-col lg:flex-wrap gap-4 py-4">
          <Confirm
            title={"Confirm"}
            isOpen={true}
            message="Are you sure you want to proceed?"
          />
          <Confirm
            isOpen={true}
            title="Modal Title"
            message="Are you sure you want to proceed?"
            type={"danger"}
          />
          <Confirm
            isOpen={true}
            title="Modal Title"
            message="Are you sure you want to proceed?"
            type={"success"}
          />
          <Confirm
            isOpen={true}
            title="Modal Title"
            message="Are you sure you want to proceed?"
            type={"warning"}
          />
          <Confirm
            isOpen={true}
            title="Modal Title"
            message="Are you sure you want to proceed?"
            type={"info"}
          />
        </div>
      )}
    </div>
  );
}

export default Components;
