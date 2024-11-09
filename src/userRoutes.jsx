// routes/UserRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import "./App.css";
import BottomMenu from "./components/bottomMenu";
import Projects from "./pages/user/projects";
import About from "./pages/user/about";

const UserRoutes = () => {
  return (
    <div className="bg-backgroundPrimary dark:bg-darkBg flex flex-col justify-center ">
      <div className="flex-grow flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <BottomMenu />
    </div>
  );
};

export default UserRoutes;
