import { useLocation, useNavigate } from "react-router-dom";
import SvgIcon from "../../assets/iconSvg";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const BottomMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const iconData = [
    { name: "user", navigation: "" },
    { name: "product", navigation: "products" },
    { name: "work", navigation: "work" },
  ];
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
      className="z-50 fixed bottom-0 w-[100%] sm:bottom-4 inset-x-0 flex justify-center"
    >
      <div className="flex px-4 sm:px-2 w-[100%] sm:w-auto sm:gap-4 justify-between p-2 bg-darkSubbg  sm:rounded-full transition-colors duration-300 shadow-2xl">
        {iconData.map((item, index) => {
          const isActive = location.pathname === item.navigation;
          return (
            <div
              key={index}
              className="flex w-1/4 flex-col items-center cursor-pointer"
              onClick={() => navigate(item.navigation)}
            >
              <div
                className={`p-4 rounded-full transition duration-200 ease-in-out ${
                  isActive ? "bg-white/20" : "bg-white/5 dark:hover:bg-white/10"
                }`}
                tabIndex={0}
              >
                <SvgIcon
                  name={item.name}
                  color={"white"}
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
