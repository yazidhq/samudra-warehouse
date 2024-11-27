import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ValidasiPage from "./pages/validasi/ValidasiPage";
import DataBarang from "./pages/master/barang/DataBarang";
import TambahBarang from "./pages/master/barang/TambahBarang";
import DataTransaksi from "./pages/transaksi/DataTransaksi";
import TambahTransaksi from "./pages/transaksi/TambahTransaksi";
import ItemTransaksi from "./pages/transaksi/ItemTransaksi";
import { AuthProvider } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/barang"
            element={
              <ProtectedRoute>
                <DataBarang />
              </ProtectedRoute>
            }
          />
          <Route
            path="/barang/tambah_barang"
            element={
              <ProtectedRoute>
                <TambahBarang />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transaksi"
            element={
              <ProtectedRoute>
                <DataTransaksi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaksi/tambah_transaksi"
            element={
              <ProtectedRoute>
                <TambahTransaksi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaksi/tambah_transaksi/item_transaksi"
            element={
              <ProtectedRoute>
                <ItemTransaksi />
              </ProtectedRoute>
            }
          />

          <Route
            path="/validasi"
            element={
              <ProtectedRoute>
                <ValidasiPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
