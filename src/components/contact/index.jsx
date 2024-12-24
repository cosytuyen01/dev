import { useEffect, useState } from "react";
import SvgIcon from "../../assets/iconSvg";
import { FaFacebook } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";
const Contact = (data) => {
  const [localTime, setLocalTime] = useState("");
  const [iconColor, setIconColor] = useState("white");
  useEffect(() => {
    // Function to update icon color based on current theme
    const updateIconColor = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIconColor("black"); // Chế độ tối => màu biểu tượng là đen
      } else {
        setIconColor("white"); // Chế độ sáng => màu biểu tượng là trắng
      }
    };

    // Run the function initially
    updateIconColor();

    // Listen for changes in theme
    const observer = new MutationObserver(updateIconColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Cập nhật thời gian địa phương mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Social media data array
  const socialMedia = [
    {
      icon: <FaSkype size={24} className="text-black dark:text-white/90" />,
      url: data?.data?.skype,
    },
    {
      icon: <FaFacebook size={24} className="text-black dark:text-white/90" />,
      url: data?.data?.fb,
    },
  ];
  const handleDownloadCVClick = () => {
    const cvLink = data?.data?.cv; // Replace this with your actual Google Drive CV link
    window.open(cvLink, "_blank"); // Opens in a new tab
  };
  return (
    <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-0 justify-between rounded-lg mx-auto w-full ">
      {/* Contact Button and Social Icons */}
      <div className="flex items-center gap-4  justify-between w-full sm:w-auto ">
        {/* Contact Button */}
        <button
          onClick={handleDownloadCVClick}
          className=" bg-black dark:bg-white text-white px-4 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-white/90 transition"
        >
          <SvgIcon name={"download"} height={24} width={24} color={iconColor} />
          <span className="dark:text-black">Download CV</span>
        </button>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          {socialMedia.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-gray-200 dark:bg-darkSubbg p-3 rounded-full hover:bg-gray-300 transition dark:hover:bg-darkSubbg/50"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Local Time Display */}
      <div className="w-full sm:w-1/2 justify-center dark:bg-darkSubbg bg-gray-200 px-4 py-3 rounded-full flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-gray-500 dark:text-white/50">Local time:</span>
        <span className="font-medium text-black dark:text-white/80">
          {localTime || "00:00:00"}
        </span>
      </div>
    </div>
  );
};

export default Contact;
