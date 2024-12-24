/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import InfoPage from "../../../components/infoPage";
import ProductCardList from "../../../components/productList";
import Tabs from "../../../components/tabs";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useProducts from "../../../hook/useProducts";
import BlogList from "../../../components/BlogList";

// Thêm Skeleton Loading
const SkeletonInfoPage = () => (
  <div className="space-y-4">
    <div className="w-1/2 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-lg"></div>
    <div className="w-full h-4 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-lg"></div>
  </div>
);

const SkeletonTabs = () => (
  <div className="mx-[-36px] sm:mx-0 flex space-x-4 ">
    <div className="w-24 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
    <div className="w-24 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
    <div className="w-24 h-8 bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-md"></div>
  </div>
);

const SkeletonProductCardList = () => (
  <div className="mx-[-36px]  sm:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 dark:bg-darkSubbg animate-pulse rounded-lg h-[350px]"
      ></div>
    ))}
  </div>
);

function Blogs() {
  const [activeTab, setActiveTab] = useState("All");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { loading } = useProducts();

  return (
    <div
      className={`pt-16 mx-auto pb-10 px-2 sm:px-6 lg:px-8 w-full lg:w-[752px] `}
    >
      <Helmet>
        <title>My blogs</title>
      </Helmet>
      <InfoPage title={"My blogs"} desc={"Some blogs share experiences"} />
      <div className="pt-0 sm:pt-4 items-center">
        <div className="px-2 ">
          {/* ProductCardList với Skeleton */}
          {loading ? <SkeletonProductCardList /> : <BlogList />}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
