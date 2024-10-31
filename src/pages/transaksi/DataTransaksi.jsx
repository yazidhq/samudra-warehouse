import { FaPlus } from "react-icons/fa";
import Table from "../../components/Table";
import Navbar from "../../components/templates/Navbar";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const DataTransaksi = () => {
  const columns = [
    { name: "No", selector: (row) => row.no, sortable: true },
    {
      name: "No Surat Jalan",
      selector: (row) => row.no_surat_jalan,
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
      name: "Nama Penerima",
      selector: (row) => row.nama_penerima,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: () => (
        <div className="d-flex gap-1">
          <Button color={"warning"}>
            <MdOutlineEdit className="d-flex align-items-center" />
          </Button>
          <Button color={"danger"}>
            <MdDelete className="d-flex align-items-center" />
          </Button>
        </div>
      ),
    },
  ];

  const record = [
    {
      no: 1,
      no_surat_jalan: "NSJ001",
      nama_pengatur: "Andi",
      nama_penyetuju: "Dani",
      nama_pengirim: "Dinda",
      nama_penerima: "Linda",
      qty: 100,
    },
  ];

  return (
    <Navbar title="Transaksi">
      <div className="shadow rounded-3 bg-white p-4 pb-2">
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
