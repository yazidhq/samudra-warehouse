import { IoIosSave } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Navbar from "../../components/templates/Navbar";
import { useTransaction } from "../../context/TransactionContext";

const TambahTransaksi = () => {
  const { handleCreate } = useTransaction();

  return (
    <Navbar title="Item">
      <div className="rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Detail Transaksi</h1>
        </div>
        <hr />
        <form onSubmit={handleCreate}>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">No Surat Jalan</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="deliveryOrderNumber"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Nama Pengatur</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="organizerName"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Nama Penyetuju</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" name="approvalName" />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Nama Pengirim</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" name="senderName" />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Toko Penerima</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="recipientName"
              />
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
              <IoIosSave
                className="fs-6 mb-1"
                style={{ marginRight: "10px" }}
              />
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default TambahTransaksi;
