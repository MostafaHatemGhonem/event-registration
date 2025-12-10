import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { DataUser } from "./hooks/Data";
import type { User } from "./types/index";
import { useState } from "react";

function App() {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState<User | null>(null);
  return (
    <DataUser value={user}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </DataUser>
  );
}

export default App;
