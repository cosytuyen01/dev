import { useLocation } from "react-router-dom";
import InfoPage from "../../../components/infoPage";
import ProductCardList from "../../../components/productList";
import Tabs from "../../../components/tabs";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useProducts from "../../../hook/useProducts";

// Thêm Skeleton Loading
const SkeletonInfoPage = () => (
  <div className="space-y-4">
    <div className="w-1/2 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-lg"></div>
    <div className="w-full h-4 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-lg"></div>
  </div>
);

const SkeletonTabs = () => (
  <div className="flex space-x-4">
    <div className="w-24 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
    <div className="w-24 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
    <div className="w-24 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
  </div>
);

const SkeletonProductCardList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-lg h-[350px]"
      ></div>
    ))}
  </div>
);

function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const tabs = ["All", "Website", "Mobile"];
  const { loading } = useProducts();

  return (
    <div
      className={`pt-16 mx-auto pb-10 px-2 sm:px-6 lg:px-8 w-full lg:w-[752px] `}
    >
      <Helmet>
        <title>Danh sách sản phẩm</title>
      </Helmet>

      <InfoPage
        title={"Sản phẩm"}
        desc={"Một số sản phẩm đã làm nhiều năm qua"}
      />

      <div className="pt-0 sm:pt-4 items-center">
        <div className="px-2 sticky top-0 z-10 dark:bg-darkBg/90 bg-backgroundPrimary/90 backdrop-blur">
          {/* Tabs với Skeleton */}
          {loading ? (
            <SkeletonTabs />
          ) : (
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              data={tabs}
            />
          )}
        </div>

        <div className="px-2 ">
          {/* ProductCardList với Skeleton */}
          {loading ? (
            <SkeletonProductCardList />
          ) : (
            <ProductCardList activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
