// routes/UserRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import "./App.css";
import BottomMenu from "./components/bottomMenu";
import Projects from "./pages/user/projects";

const UserRoutes = () => {
  return (
    <div className="bg-backgroundPrimary flex flex-col justify-center ">
      <div className="flex-grow flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
      <BottomMenu />
    </div>
  );
};

export default UserRoutes;
