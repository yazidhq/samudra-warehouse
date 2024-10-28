import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MasterPage from "./pages/MasterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/master" element={<MasterPage />} />
        <Route path="/transaksi" element={<MasterPage />} />
        <Route path="/validasi" element={<MasterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
