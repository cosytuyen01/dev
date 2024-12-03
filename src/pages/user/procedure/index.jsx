import { useLocation } from "react-router-dom";
import InfoPage from "../../../components/infoPage";
import Tabs from "../../../components/tabs";
import { useEffect, useState } from "react";

function Procedure() {
  const [activeTab, setActiveTab] = useState("Xác định");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const tabs = [
    "Xác định",
    "Nghiên cứu",
    "Phân tích",
    "Thiết kế",
    "Demo Prototyping",
  ];
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] h-[100vh]">
      <InfoPage
        title={"Quy trình"}
        desc={"Dưới đây là một số bước quan trọng trong quy trình thiết kế "}
      />
      <div className="pt-0 sm:pt-4 items-center">
        <div className="pb-4 items-center">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} data={tabs} />
        </div>
      </div>
    </div>
  );
}

export default Procedure;
