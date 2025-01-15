import { FaPlus } from "react-icons/fa";
import Table from "../../components/Table";
import Navbar from "../../components/templates/Navbar";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useTransaction } from "../../context/TransactionContext";
import { useEffect } from "react";
import { AiFillDatabase } from "react-icons/ai";
import dayjs from "dayjs";

const DataTransaksi = () => {
  const { transaction, fetchTransactions, handleDelete } = useTransaction();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    {
      name: "No Surat Jalan",
      selector: (row) => row.no_surat_jalan,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Nama Pengatur",
      selector: (row) => row.nama_pengatur,
      sortable: true,
    },
    {
      name: "Nama Penyetuju",
      selector: (row) => row.nama_penyetuju,
      sortable: true,
    },
    {
      name: "Nama Pengirim",
      selector: (row) => row.nama_pengirim,
      sortable: true,
    },
    {
      name: "Toko Penerima",
      selector: (row) => row.nama_penerima,
      sortable: true,
    },
    {
      name: "Total Kuantitas Barang",
      selector: (row) => row.total_kuantitas,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="d-flex gap-1">
          <Link to={`/transaksi/${row.id}/item_transaksi`}>
            <Button color={"info text-white"}>
              <AiFillDatabase className="d-flex align-items-center" />
            </Button>
          </Link>
          <Link to={`/transaksi/edit_transaksi/${row.id}`}>
            <Button color={"warning"}>
              <MdOutlineEdit className="d-flex align-items-center" />
            </Button>
          </Link>
          <Button color={"danger"} onClick={() => handleDelete(row.id)}>
            <MdDelete className="d-flex align-items-center" />
          </Button>
        </div>
      ),
    },
  ];

  const record = (transaction?.data || []).map((v) => ({
    id: v.id,
    no_surat_jalan: v.deliveryOrderNumber || "No deliveryOrderNumber",
    nama_pengatur: v.organizerName || "No organizerName",
    createdAt: dayjs().format("DD-MM-YYYY") || "No createdAt",
    nama_penyetuju: v.approvalName || "No approvalName",
    nama_pengirim: v.senderName || "No senderName",
    nama_penerima: v.recipientName || "No recipientName",
    total_kuantitas: v.totalQuantity || "No totalQuantity",
  }));

  record.sort((a, b) => b.id - a.id);

  return (
    <Navbar title="Transaksi">
      <div className="rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Daftar Transaksi</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={"/transaksi/tambah_transaksi"}>
              <Button color={"primary"}>
                <FaPlus className="fs-6 mb-1" style={{ marginRight: "10px" }} />
                Tambah Transaksi
              </Button>
            </Link>
          </div>
        </div>
        <hr />
        <Table columns={columns} record={record} />
      </div>
    </Navbar>
  );
};

export default DataTransaksi;
