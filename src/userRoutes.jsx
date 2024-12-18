import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/user/home";
import "./App.css";
import BottomMenu from "./components/bottomMenu";
import Projects from "./pages/user/projects";
import About from "./pages/user/about";
import DetailProject from "./pages/user/projects/detail";
import "react-loading-skeleton/dist/skeleton.css";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import Components from "./pages/user/components";

const UserRoutes = () => {
  const location = useLocation(); // Hook to get the current path

  return (
    <div className="bg-backgroundPrimary dark:bg-darkBg flex flex-col justify-center">
      <div className="flex-grow flex justify-center ">
        {/* Apply transitions to all pages */}
        <TransitionGroup>
          <SwitchTransition>
            <CSSTransition
              key={location.key} // Ensure key changes with location
              timeout={200}
              classNames="zoom" // Custom class for transition effect
            >
              <Routes location={location}>
                <Route exact path="/" element={<Home />} />
                <Route path="/components" element={<Components />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<DetailProject />} />
              </Routes>
            </CSSTransition>
          </SwitchTransition>
        </TransitionGroup>
      </div>
      <BottomMenu />
    </div>
  );
};

export default UserRoutes;
