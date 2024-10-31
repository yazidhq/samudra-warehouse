import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ValidasiPage from "./pages/validasi/ValidasiPage";
import DataBarang from "./pages/master/barang/DataBarang";
import TambahBarang from "./pages/master/barang/TambahBarang";
import DataTransaksi from "./pages/transaksi/DataTransaksi";
import TambahTransaksi from "./pages/transaksi/TambahTransaksi";
import ItemTransaksi from "./pages/transaksi/ItemTransaksi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<DashboardPage />} />

        <Route path="/barang" element={<DataBarang />} />
        <Route path="/barang/tambah_barang" element={<TambahBarang />} />

        <Route path="/transaksi" element={<DataTransaksi />} />
        <Route
          path="/transaksi/tambah_transaksi"
          element={<TambahTransaksi />}
        />
        <Route
          path="/transaksi/tambah_transaksi/item_transaksi"
          element={<ItemTransaksi />}
        />

        <Route path="/validasi" element={<ValidasiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
