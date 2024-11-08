import { useLocation, useNavigate } from "react-router-dom";
import SvgIcon from "../../assets/iconSvg";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const iconData = [
  { name: "home", navigation: "/" },
  { name: "product", navigation: "/products" },
  { name: "work", navigation: "/work" },
  { name: "user", navigation: "/user" },
];

const BottomMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 50) {
      setIsMenuVisible(false);
    } else if (latest < lastScrollY) {
      setIsMenuVisible(true);
    }
    setLastScrollY(latest);
  });
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isMenuVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 w-[100%]  sm:bottom-4 inset-x-0 flex justify-center"
    >
      <div className="flex px-4 sm:px-0 w-[100%] sm:w-auto sm:gap-4 justify-between  bg-white sm:rounded-full p-2 ">
        {iconData.map((item, index) => {
          const isActive = location.pathname === item.navigation;

          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(item.navigation)}
            >
              <div
                className={`p-4 rounded-full transition duration-200 ease-in-out ${
                  isActive ? "bg-bgFocus" : "bg-gray-100 hover:bg-gray-200"
                }`}
                tabIndex={0}
              >
                <SvgIcon
                  name={item.name}
                  color={"var(--textColor)"}
                  height={24}
                  width={24}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomMenu;
