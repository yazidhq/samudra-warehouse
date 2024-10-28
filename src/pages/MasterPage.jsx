import Navbar from "../components/templates/Navbar";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";

const MasterPage = () => {
  return (
    <Navbar title="Master">
      <div className="shadow rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Daftar Item</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Button color={"primary"}>
              <FaPlus className="fs-6 mb-1" style={{ marginRight: "10px" }} />
              Tambah Item
            </Button>
          </div>
        </div>
        <hr />
      </div>
    </Navbar>
  );
};

export default MasterPage;
