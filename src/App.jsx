import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import AdminLogin from "./components/pages/AdminLogin";
import AdminDashboard from "./components/pages/AdminDashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        <Route path="/Admin" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
        <Route
          path="/AdminDashBoard"
          element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
