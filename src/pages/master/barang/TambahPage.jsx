import { IoIosSave } from "react-icons/io";
import Button from "../../../components/Button";
import Navbar from "../../../components/templates/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MasterPage = () => {
  return (
    <Navbar title="Item">
      <div className="shadow rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Form Item</h1>
        </div>
        <hr />
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Kode Barang</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Jenis Barang</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Nama Barang</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Satuan Barang</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Ukuran Barang</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">stok Barang</label>
          </div>
          <div class="col-10">
            <input type="number" min={"0"} class="form-control" />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3 mt-5">
          <Link to={"/barang"} className="text-decoration-none text-red">
            <span style={{ color: "red" }}>
              <FaArrowLeft
                className="fs-6 mb-1"
                style={{ marginRight: "10px", color: "red" }}
              />
              <span className="fw-medium">Kembali</span>
            </span>
          </Link>
          <Button color={"primary"}>
            <IoIosSave className="fs-6 mb-1" style={{ marginRight: "10px" }} />
            Simpan
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default MasterPage;
