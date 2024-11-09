import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Websites", "Apps"];

  return (
    <div className="flex space-x-4 py-4 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            activeTab === tab
              ? "bg-black text-white dark:bg-white/90 dark:text-black/80"
              : "bg-gray-200 text-subText hover:bg-gray-300 dark:bg-darkSubbg dark:text-white/80 dark:hover:bg-darkSubbg/50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
