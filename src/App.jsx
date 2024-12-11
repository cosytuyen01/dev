import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoutes from "./userRoutes";
import DashboardRoutes from "./dashboardRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
