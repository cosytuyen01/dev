import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoutes from "./userRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
