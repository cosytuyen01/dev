import { useLocation, useNavigate } from "react-router-dom";
import SvgIcon from "../../assets/iconSvg";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const BottomMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [iconColor, setIconColor] = useState("light");

  useEffect(() => {
    // Function to update icon color based on current theme
    const updateIconColor = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIconColor("dark"); // Chế độ tối => màu biểu tượng là đen
      } else {
        setIconColor("light"); // Chế độ sáng => màu biểu tượng là trắng
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
  const iconData = [
    { name: "home", navigation: "/" },
    { name: "blog", navigation: "/blog" },
    // { name: "product", navigation: "/projects" },
    { name: "user", navigation: "/about" },

    // { name: "design", navigation: "/components" },
    { name: "light", navigation: "" }, // Nút chuyển đổi Light/Dark mode
  ];
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 50) {
      setIsMenuVisible(false);
    } else if (latest < lastScrollY) {
      setIsMenuVisible(true);
    }
    setLastScrollY(latest);
  });

  // Function to toggle dark mode by adding/removing "dark" class from html element
  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    // Set initial theme based on localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isMenuVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 w-[100%] sm:bottom-4 inset-x-0 flex justify-center"
    >
      <div className="flex px-4 sm:px-2 w-[100%] sm:w-auto sm:gap-4 justify-between p-2 bg-white dark:bg-darkSubbg dark:text-white sm:rounded-full transition-colors duration-300 shadow-2xl">
        {iconData.map((item, index) => {
          const isActive = location.pathname === item.navigation;
          return (
            <div
              key={index}
              className="flex w-1/4 flex-col items-center cursor-pointer"
              onClick={() =>
                item.name === "light"
                  ? toggleTheme()
                  : navigate(item.navigation)
              }
            >
              <div
                className={`p-4 rounded-full transition duration-200 ease-in-out ${
                  isActive
                    ? "bg-bgFocus dark:bg-white/20"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10"
                }`}
                tabIndex={0}
              >
                <SvgIcon
                  name={item.name === "light" ? iconColor : item.name}
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
