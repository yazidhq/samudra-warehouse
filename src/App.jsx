import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MasterPage from "./pages/MasterPage";
import TransaksiPage from "./pages/TransaksiPage";
import ValidasiPage from "./pages/ValidasiPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/master" element={<MasterPage />} />
        <Route path="/transaksi" element={<TransaksiPage />} />
        <Route path="/validasi" element={<ValidasiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
