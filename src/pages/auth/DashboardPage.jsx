import { MdSpaceDashboard } from "react-icons/md";
import Image from "../../components/Image";
import { FaDatabase } from "react-icons/fa";
import { IoNewspaper, IoTimeOutline } from "react-icons/io5";
import { FaRegFolderClosed } from "react-icons/fa6";
import Button from "../../components/Button";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();

  return (
    <div>
      <header className="navbar sticky-top bg-primary flex-md-nowrap p-0">
        <a
          className="bg-info col-md-3 col-lg-2 me-0 px-3 fs-6 text-white text-center"
          href="#"
        >
          <Image src={"/data/logo.png"} width={"150px"} style={"my-3"} />
        </a>
        <a
          className="col-md-8 col-lg-8 px-4 fs-3 text-white text-start text-decoration-none fw-bold"
          href="#"
        >
          Dashboard
        </a>
        <a
          className="col-md-3 col-lg-2 px-4 fs-6 text-white text-end text-decoration-none"
          href="#"
        >
          <CgProfile className="fs-3 mx-2 mb-1" />
          Admin Gudang
        </a>
      </header>

      <div className="container-fluid">
        <div className="row">
          <div className="sidebar col-md-3 col-lg-2 p-0 bg-white px-2">
            <div
              className="offcanvas-md offcanvas-end bg-white"
              tabIndex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-3 text-body-secondary text-uppercase">
                  <span>Menu</span>
                </h6>
                <ul className="nav flex-column mb-auto">
                  <li
                    className={`nav-item py-2 ${
                      location.pathname === "/" ? "bg-primary rounded-2" : ""
                    }`}
                  >
                    <a
                      className={`nav-link d-flex align-items-center gap-2 ${
                        location.pathname === "/"
                          ? "text-white"
                          : "text-primary"
                      }`}
                      href="#"
                    >
                      <MdSpaceDashboard className="fs-5" />
                      Beranda
                    </a>
                  </li>
                  <li
                    className={`nav-item py-2 ${
                      location.pathname === "/master"
                        ? "bg-primary rounded-2"
                        : ""
                    }`}
                  >
                    <a
                      className={`nav-link d-flex align-items-center gap-2 ${
                        location.pathname === "/master"
                          ? "text-white"
                          : "text-primary"
                      }`}
                      href="#"
                    >
                      <FaDatabase className="fs-5" />
                      Master
                    </a>
                  </li>
                  <li
                    className={`nav-item py-2 ${
                      location.pathname === "/transaksi"
                        ? "bg-primary rounded-2"
                        : ""
                    }`}
                  >
                    <a
                      className={`nav-link d-flex align-items-center gap-2 ${
                        location.pathname === "/transaksi"
                          ? "text-white"
                          : "text-primary"
                      }`}
                      href="#"
                    >
                      <IoNewspaper className="fs-5" />
                      Transaksi
                    </a>
                  </li>
                  <li
                    className={`nav-item py-2 ${
                      location.pathname === "/validasi"
                        ? "bg-primary rounded-2"
                        : ""
                    }`}
                  >
                    <a
                      className={`nav-link d-flex align-items-center gap-2 ${
                        location.pathname === "/validasi"
                          ? "text-white"
                          : "text-primary"
                      }`}
                      href="#"
                    >
                      <FaRegFolderClosed className="fs-5" />
                      Cek Validasi Stok
                    </a>
                  </li>
                </ul>

                <ul
                  className="nav flex-column mb-auto"
                  style={{ marginTop: "120%" }}
                >
                  <hr className="my-3" />
                  <li className="nav-item">
                    <a
                      className="nav-link d-flex align-items-center gap-2 text-primary"
                      href="#"
                    >
                      <CgProfile className="fs-3" />
                      Nama Admin
                    </a>
                  </li>
                  <li className="nav-item">
                    <div className="mx-3 my-3">
                      <div className="d-grid gap-2">
                        <Button color={"danger"}>
                          <CiLogout className="mb-1 mx-1" />
                          Keluar
                        </Button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 bg-grey"
            style={{ minHeight: "100vh" }}
          >
            <div className="shadow rounded-3 bg-white p-4 pb-2">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <h1 className="h4">Beranda</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
                  >
                    <IoTimeOutline className="fs-4" />
                    Filter Tahun
                  </button>
                </div>
              </div>
              <hr />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
