import { MdSpaceDashboard } from "react-icons/md";
import Image from "../../components/Image";
import { FaDatabase } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { FaRegFolderClosed } from "react-icons/fa6";
import Button from "../../components/Button";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ children, title }) => {
  const location = useLocation();
  const { handleLogout } = useAuth();

  const user = jwtDecode(localStorage.getItem("token"));

  return (
    <div>
      <header className="navbar sticky-top bg-primary flex-md-nowrap p-0">
        <Link
          to={"/"}
          className="bg-info col-md-3 col-lg-2 me-0 px-3 fs-6 text-white text-center"
        >
          <Image src={"/data/logo.png"} width={"150px"} style={"my-3"} />
        </Link>
        <a className="col-md-8 col-lg-8 px-4 fs-3 text-white text-start text-decoration-none fw-bold">
          {title}
        </a>
        <div className="col-md-3 col-lg-2 px-4 fs-6 text-white text-end text-decoration-none">
          <CgProfile className="fs-3 mx-2 mb-1" />
          {user.data.name}
        </div>
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
                    <Link
                      className={`nav-link d-flex align-items-center gap-2 ${
                        location.pathname === "/"
                          ? "text-white"
                          : "text-primary"
                      }`}
                      to={"/"}
                    >
                      <MdSpaceDashboard className="fs-5" />
                      Beranda
                    </Link>
                  </li>
                  {user.data.role == 1 && (
                    <div>
                      <li
                        className={`nav-item py-2 ${
                          location.pathname.includes("/barang")
                            ? "bg-primary rounded-2"
                            : ""
                        }`}
                      >
                        <Link
                          className={`nav-link d-flex align-items-center gap-2 ${
                            location.pathname.includes("/barang")
                              ? "text-white"
                              : "text-primary"
                          }`}
                          to={"/barang"}
                        >
                          <FaDatabase className="fs-5" />
                          Master
                        </Link>
                      </li>
                      <li
                        className={`nav-item py-2 ${
                          location.pathname.includes("/transaksi")
                            ? "bg-primary rounded-2"
                            : ""
                        }`}
                      >
                        <Link
                          className={`nav-link d-flex align-items-center gap-2 ${
                            location.pathname.includes("/transaksi")
                              ? "text-white"
                              : "text-primary"
                          }`}
                          to={"/transaksi"}
                        >
                          <IoNewspaper className="fs-5" />
                          Transaksi
                        </Link>
                      </li>
                    </div>
                  )}
                  {user.data.role == 2 && (
                    <li
                      className={`nav-item py-2 ${
                        location.pathname.includes("/validasi")
                          ? "bg-primary rounded-2"
                          : ""
                      }`}
                    >
                      <Link
                        className={`nav-link d-flex align-items-center gap-2 ${
                          location.pathname.includes("/validasi")
                            ? "text-white"
                            : "text-primary"
                        }`}
                        to={"/validasi"}
                      >
                        <FaRegFolderClosed className="fs-5" />
                        Cek Validasi Stok
                      </Link>
                    </li>
                  )}
                </ul>

                <ul
                  className="nav flex-column mb-auto"
                  style={{ marginTop: "120%" }}
                >
                  <hr className="my-3" />
                  <li className="nav-item">
                    <a className="nav-link d-flex align-items-center gap-2 text-primary">
                      <CgProfile className="fs-3" />
                      {user.data.name}
                    </a>
                  </li>
                  <li className="nav-item">
                    <div className="mx-3 my-3">
                      <Link
                        to={"/login"}
                        className="text-decoration-none text-white"
                      >
                        <div className="d-grid gap-2">
                          <Button color={"danger"} onClick={handleLogout}>
                            <CiLogout className="mb-1 mx-1" />
                            Keluar
                          </Button>
                        </div>
                      </Link>
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
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
