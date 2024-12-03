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
import EditBarang from "./pages/master/barang/EditBarang";
import EditTransaksi from "./pages/transaksi/EditTransaksi";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { TransactionProvider } from "./context/TransactionContext";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const currentTime = Date.now() / 1000;
  if (!token || jwtDecode(token).exp < currentTime)
    return <Navigate to="/login" />;

  const user = jwtDecode(token);

  if (allowedRoles && !allowedRoles.includes(user.data.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

let user;
if (token) {
  try {
    user = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    user = null;
  }
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProductProvider>
          <TransactionProvider>
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
                  <ProtectedRoute allowedRoles={[1]}>
                    <DataBarang />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/barang/tambah_barang"
                element={
                  <ProtectedRoute allowedRoles={[1]}>
                    <TambahBarang />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/barang/edit_barang/:id"
                element={
                  <ProtectedRoute allowedRoles={[1]}>
                    <EditBarang />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaksi"
                element={
                  <ProtectedRoute allowedRoles={[1]}>
                    <DataTransaksi />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaksi/tambah_transaksi"
                element={
                  <ProtectedRoute allowedRoles={[1]}>
                    <TambahTransaksi />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaksi/edit_transaksi/:id"
                element={
                  <ProtectedRoute allowedRoles={[1]}>
                    <EditTransaksi />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaksi/:id/item_transaksi"
                element={
                  <ProtectedRoute allowedRoles={[1]}>
                    <ItemTransaksi />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/validasi"
                element={
                  <ProtectedRoute allowedRoles={[2]}>
                    <ValidasiPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </TransactionProvider>
        </ProductProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
