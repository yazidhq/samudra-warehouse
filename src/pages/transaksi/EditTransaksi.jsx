import { IoIosSave } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Navbar from "../../components/templates/Navbar";
import { RiErrorWarningFill } from "react-icons/ri";
import { useTransaction } from "../../context/TransactionContext";
import { useEffect, useState } from "react";

const EditTransaksi = () => {
  const { id } = useParams();
  const { transaction, handleUpdate } = useTransaction();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    if (transaction?.data?.length) {
      const transactionToEdit = transaction?.data?.find(
        (item) => item.id === parseInt(id)
      );
      if (transactionToEdit) {
        setCurrentTransaction(transactionToEdit);
      } else {
        console.error("Transaction not found!");
      }
    }
  }, [id, transaction]);

  if (!currentTransaction) {
    return "";
  }

  return (
    <Navbar title="Edit Surat Jalan">
      <form onSubmit={(e) => handleUpdate(e, id)}>
        <div className="rounded-3 bg-white p-4 pb-2">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h1 className="h4">Form Edit Surat Jalan</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <Link to={`/transaksi/${currentTransaction.id}/item_transaksi`}>
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
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">No Surat Jalan</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="deliveryOrderNumber"
                defaultValue={currentTransaction.deliveryOrderNumber}
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
                defaultValue={currentTransaction.organizerName}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Nama Penyetuju</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="approvalName"
                defaultValue={currentTransaction.approvalName}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Nama Pengirim</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="senderName"
                defaultValue={currentTransaction.senderName}
              />
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
                defaultValue={currentTransaction.recipientName}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Total Kuantitas Barang</label>
            </div>
            <div className="col-10">
              <input
                readOnly
                type="text"
                className="form-control bg-secondary"
                value={currentTransaction.totalQuantity}
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
        </div>
      </form>
    </Navbar>
  );
};

export default EditTransaksi;
