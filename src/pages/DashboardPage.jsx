import { IoTimeOutline } from "react-icons/io5";
import Navbar from "../components/templates/Navbar";
import BarChart from "../components/BarChart";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const DashboardPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleDropdownToggle = () => setIsOpen(!isOpen);
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  return (
    <Navbar title="Dashboard">
      {user.data.role === 1 && (
        <div className="mb-3">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="rounded-3 bg-white p-4 shadow-sm d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Total Barang</h5>
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <span className="fs-5">20</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="rounded-3 bg-white p-4 shadow-sm d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Transaksi Keluar</h5>
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <span className="fs-5">40</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="shadow-sm rounded-3 bg-white p-4 pb-2 mb-3">
        {user.data.role === 1 ? (
          <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
              <h1 className="h4">Jumlah Transaksi Keluar Barang</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="dropdown dropstart">
                  <button
                    className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
                    type="button"
                    onClick={handleDropdownToggle}
                    aria-expanded={isOpen}
                  >
                    <IoTimeOutline className="fs-4" />
                    {selectedYear}
                  </button>
                  {isOpen && (
                    <ul
                      className="dropdown-menu show"
                      style={{ left: "-10rem" }}
                    >
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
            <hr />
            <div style={{ height: "500px" }}>
              <BarChart selectedYear={selectedYear} />
            </div>
          </>
        ) : (
          <div className="p-4 text-center">
            <h1>Selamat datang di sistem gudang</h1>
            <p className="fs-3">
              silahkan masuk menu Cek validasi Stok untuk proses validasi stok
              yang tersedia
            </p>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default DashboardPage;
