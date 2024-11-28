import { useLocation } from "react-router-dom";
import InfoPage from "../../../components/infoPage";
import ProductCardList from "../../../components/productList";
import Tabs from "../../../components/tabs";
import { useEffect } from "react";

function Projects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] ">
      <InfoPage
        title={"Sản phẩm"}
        desc={"Một số sản phẩm đã làm nhiều năm qua"}
      />
      <div className="pt-0 sm:pt-4 items-center">
        <div className="pb-4 items-center">
          <Tabs />
        </div>
        <ProductCardList />
      </div>
    </div>
  );
}

export default Projects;
