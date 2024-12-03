import { useLocation } from "react-router-dom";
import InfoPage from "../../../components/infoPage";
import ProductCardList from "../../../components/productList";
import Tabs from "../../../components/tabs";
import { useEffect, useState } from "react";

function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const tabs = ["All", "Website", "Mobile"];
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] ">
      <InfoPage
        title={"Sản phẩm"}
        desc={"Một số sản phẩm đã làm nhiều năm qua"}
      />
      <div className="pt-0 sm:pt-4 items-center">
        <div className="sticky top-0 z-10  dark:bg-darkBg/90 bg-backgroundPrimary/90 backdrop-blur">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} data={tabs} />
        </div>
        <ProductCardList activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Projects;
