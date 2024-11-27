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
import { ProductProvider } from "./context/ProductContext";
import EditBarang from "./pages/master/barang/EditBarang";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProductProvider>
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
              path="/barang/edit_barang/:id"
              element={
                <ProtectedRoute>
                  <EditBarang />
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
        </ProductProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
