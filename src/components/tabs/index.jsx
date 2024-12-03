import { useRef } from "react";
import "./style.css";
// eslint-disable-next-line react/prop-types
const Tabs = ({ activeTab, setActiveTab, data = [] }) => {
  const imageRefs = useRef([]);
  const handleClick = (tab, index) => {
    setActiveTab(tab);
    // Tự động cuộn đến ảnh đã chọn
    imageRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "center", // Cuộn đến vị trí giữa
      inline: "center", // Cuộn ảnh vào giữa theo chiều ngang
    });
  };
  return (
    <div className="flex space-x-4 py-4  scroll-container hide-scrollbar">
      {data.map((tab, index) => (
        <button
          key={tab}
          ref={(el) => (imageRefs.current[index] = el)}
          onClick={() => handleClick(tab, index)} // This will update the active tab in parent
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            activeTab === tab
              ? "bg-black text-white dark:bg-white/90 dark:text-black/80"
              : "bg-gray-200 text-subText hover:bg-gray-300 dark:bg-darkSubbg dark:text-white/80 dark:hover:bg-darkSubbg/50"
          }`}
        >
          <p className=" whitespace-nowrap">{tab}</p>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
