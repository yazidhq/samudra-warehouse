import { IoTimeOutline } from "react-icons/io5";
import Navbar from "../../components/templates/Navbar";

const DashboardPage = () => {
  return (
    <Navbar>
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
    </Navbar>
  );
};

export default DashboardPage;
