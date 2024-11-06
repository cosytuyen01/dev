import "./style.css";
import Logo from "../../assets/images/Logo.svg";
import SvgIcon from "../../assets/iconSvg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../button";
const Header = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Điều hướng và lưu trữ ID phần tử cần cuộn
  const navigateAndScroll = (path, sectionId) => {
    localStorage.setItem("scrollToSectionId", sectionId);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Tự động cuộn đến phần đã lưu trong localStorage sau khi chuyển trang
  useEffect(() => {
    const sectionId = localStorage.getItem("scrollToSectionId");
    if (sectionId && location.pathname === "/") {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          localStorage.removeItem("scrollToSectionId");
        }
      }, 200);
    }
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeOut" }}
      // style={{
      //   scale: scale,
      //   opacity: opacity,
      //   y: translateY,
      // }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-[780px]  mx-auto mt-10 px-4"
    >
      <div
        onClick={() => navigateAndScroll("/", "")}
        className="flex flex-col cursor-pointer"
      >
        <img className="w-24" src={Logo} alt="Logo" />
        <p className="text-sm italic text-gray-400 mt-1">UIUX Designer</p>
      </div>
      <div className="flex items-center gap-4">
        <div onClick={toggleMobileMenu} className="p-2 rounded-md bg-gray-200 lg:hidden cursor-pointer">
          <SvgIcon
            name={isMobileMenuOpen ? "close" : "menu"}
            height={24}
            width={24}
            color={"var(--textDarkPrimary)"}
          />
        </div>
        {isMobileMenuOpen && (
          <div className="fixed top-16 right-0 w-full p-6 bg-black/50 backdrop-blur-md flex flex-col z-40 lg:hidden">
            <Button
              text="Work"
              onClick={() => navigateAndScroll("/", "work-section")}
              className="mb-2"
            />
            <Button
              text="Resume"
              onClick={() => navigateAndScroll("/", "resume-section")}
              className="mb-2"
            />
            <Button
              text="Contact"
              onClick={() => navigateAndScroll("/", "contact-section")}
              className="mb-2"
            />
          </div>
        )}
        <div className="hidden lg:flex gap-4">
          <Button
            text="Work"
            onClick={() => navigateAndScroll("/", "work-section")}
          />
          <Button
            text="Resume"
            onClick={() => navigateAndScroll("/", "resume-section")}
          />
          <Button
            text="Contact"
            onClick={() => navigateAndScroll("/", "contact-section")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
