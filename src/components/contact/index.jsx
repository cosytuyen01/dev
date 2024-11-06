import { useEffect, useState } from "react";
import SvgIcon from "../../assets/iconSvg";
import { FaFacebook } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";
const Contact = () => {
  const [localTime, setLocalTime] = useState("");

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
      icon: <FaSkype size={24} className="text-black" />,
      url: "https://join.skype.com/invite/vFQzDGABfKVw",
    },
    {
      icon: <FaFacebook size={24} className="text-black" />,
      url: "https://web.facebook.com/vpttuyen",
    },
  ];

  return (
    <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-0 justify-between rounded-lg mx-auto w-full ">
      {/* Contact Button and Social Icons */}
      <div className="flex items-center gap-4  justify-between">
        {/* Contact Button */}
        <button className=" bg-black text-white px-4 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition">
          <SvgIcon name={"download"} height={24} width={24} color={"white"} />
          <span>Download CV</span>
        </button>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          {socialMedia.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Local Time Display */}
      <div className="w-full sm:w-1/2 justify-center bg-gray-200 px-4 py-3 rounded-full flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-gray-500">Local time:</span>
        <span className="font-medium">{localTime}</span>
      </div>
    </div>
  );
};

export default Contact;
