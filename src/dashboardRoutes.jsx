import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "./components/sideBar";
import Header from "./components/header";
import InfoPage from "./pages/dashboard/info";
import ProductPage from "./pages/dashboard/product";
import BottomMenu from "./components/bottomMenuDashboard";
import Experience from "./pages/dashboard/ex";

function DashboardApp() {
  const { scrollY } = useScroll();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 50) {
      setIsHeaderVisible(false);
    } else if (latest < lastScrollY) {
      setIsHeaderVisible(true);
    }
    setLastScrollY(latest);
  });

  const customTheme = {
    token: {
      colorPrimary: "#6F6ADC",
      colorPrimaryHover: "#837de7",
      colorPrimaryActive: "#6F6ADC",
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <motion.div
        className="fixed top-0 left-0 h-1 origin-left z-20"
        style={{ scaleX: scrollY }}
      />

      <div className="flex bg-[#121212] justify-end pb-10">
        <div className="fixed top-0 left-0  hidden-custom w-[210px]">
          <Sidebar />
        </div>
        <div className="w-[calc(100%-210px)] custom-content">
          <motion.div
            className="z-10 fixed custom-width backdrop-blur-md"
            initial={{ y: 0 }}
            animate={{ y: isHeaderVisible || !isMobile ? 0 : -100 }}
            transition={{ duration: 0.3 }}
          >
            <Header />
          </motion.div>
          <div className="h-100vh pt-16 mt-2">
            <Routes>
              <Route path="/" element={<InfoPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/work" element={<Experience />} />
            </Routes>
          </div>
          <div className={`${isMobile ? "block" : "hidden"}`}>
            <BottomMenu />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default DashboardApp;
