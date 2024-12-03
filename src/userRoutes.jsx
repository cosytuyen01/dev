// routes/UserRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import "./App.css";
import BottomMenu from "./components/bottomMenu";
import Projects from "./pages/user/projects";
import About from "./pages/user/about";
import DetailProject from "./pages/user/projects/detail";
import Procedure from "./pages/user/procedure";

const UserRoutes = () => {
  return (
    <div className="bg-backgroundPrimary dark:bg-darkBg flex flex-col justify-center h-full">
      <div className="flex-grow flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/procedure" element={<Procedure />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="detail/:id" element={<DetailProject />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <BottomMenu />
    </div>
  );
};

export default UserRoutes;
