import { IoTimeOutline } from "react-icons/io5";
import Navbar from "../components/templates/Navbar";
import BarChart from "../components/BarChart";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DashboardPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleDropdownToggle = () => setIsOpen(!isOpen);
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    const params = {
      year: selectedYear ? selectedYear : currentYear,
    };

    const fetchDashboard = async () => {
      try {
        if (user.data.role === 1) {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/dashboard/data`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              params,
            }
          );
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.log("Error get Dashboard:", error);
      }
    };

    fetchDashboard();
  }, [selectedYear]);

  return (
    <Navbar title="Dashboard">
      {user.data.role === 1 && (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="dropdown dropbottom">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 p-2"
                  type="button"
                  onClick={handleDropdownToggle}
                  aria-expanded={isOpen}
                >
                  <IoTimeOutline className="fs-4" />
                  <span style={{ paddingRight: "30px" }}>{selectedYear}</span>
                </button>
                {isOpen && (
                  <ul className="dropdown-menu show">
                    {years.map((year) => (
                      <li key={year}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleYearSelect(year)}
                        >
                          {year}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3 mt-4">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-6">
                <div className="rounded-3 bg-white p-4 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0 fw-bold text-primary">
                    Total Barang Tersedia
                  </h4>
                  <div
                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <span className="fs-6">
                      {dashboardData && dashboardData.availableProducts}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="rounded-3 bg-white p-4 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0 fw-bold text-primary">
                    Total Kuantitas Barang Tersedia
                  </h4>
                  <div
                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <span className="fs-6">
                      {dashboardData &&
                        dashboardData.totalAvailableProductQuantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {user.data.role === 1 ? (
        <>
          <div className="mt-4">
            <div className="rounded-3 bg-white p-4">
              <p className="h4 mb-3 fw-bold text-primary">Jumlah Surat Jalan</p>
              <hr />
              <BarChart
                selectedYear={selectedYear ? selectedYear : 2024}
                data={dashboardData && dashboardData}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-3 bg-white p-4 pb-2">
          <div className="p-4 text-center">
            <h1>Selamat datang di sistem gudang</h1>
            <p className="fs-3">
              silahkan masuk menu Cek validasi Stok untuk proses validasi stok
              yang tersedia
            </p>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default DashboardPage;
