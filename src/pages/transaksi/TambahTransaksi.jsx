import { IoIosSave } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Navbar from "../../components/templates/Navbar";
import { RiErrorWarningFill } from "react-icons/ri";

const TambahTransaksi = () => {
  return (
    <Navbar title="Item">
      <div className="shadow rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Detail Transaksi</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={"/transaksi/tambah_transaksi/item_transaksi"}>
              <Button color={"primary"}>
                <RiErrorWarningFill
                  className="fs-5 mb-1"
                  style={{ marginRight: "10px" }}
                />
                Item Transaksi
              </Button>
            </Link>
          </div>
        </div>
        <hr />
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">No Surat Jalan</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Nama Pengatur</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Nama Penyetuju</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Nama Pengirim</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Nama Penerima</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-2">
            <label class="form-label mt-2">Qty</label>
          </div>
          <div class="col-10">
            <input type="number" min={"0"} class="form-control" />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3 mt-5">
          <Link to={"/transaksi"} className="text-decoration-none text-red">
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

export default TambahTransaksi;
