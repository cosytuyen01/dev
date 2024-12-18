import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import UserRoutes from "./userRoutes";
import DashboardRoutes from "./dashboardRoutes";
import Login from "./pages/login";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="bg-backgroundPrimary dark:bg-darkBg h-screen">
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? <DashboardRoutes /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
