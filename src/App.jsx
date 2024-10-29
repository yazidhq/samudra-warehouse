import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DataBarangPage from "./pages/master/barang/DataPage";
import TambahBarangPage from "./pages/master/barang/TambahPage";
import TransaksiPage from "./pages/transaksi/TransaksiPage";
import ValidasiPage from "./pages/validasi/ValidasiPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<DashboardPage />} />

        <Route path="/barang" element={<DataBarangPage />} />
        <Route path="/barang/tambah_barang" element={<TambahBarangPage />} />

        <Route path="/transaksi" element={<TransaksiPage />} />
        <Route path="/validasi" element={<ValidasiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
