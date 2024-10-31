import Navbar from "../../../components/templates/Navbar";
import Button from "../../../components/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const DataBarang = () => {
  const columns = [
    { name: "No", selector: (row) => row.no, sortable: true },
    { name: "Kode Barang", selector: (row) => row.kode_barang, sortable: true },
    {
      name: "Jenis Barang",
      selector: (row) => row.jenis_barang,
      sortable: true,
    },
    { name: "Nama Barang", selector: (row) => row.nama_barang, sortable: true },
    {
      name: "Satuan Barang",
      selector: (row) => row.satuan_barang,
      sortable: true,
    },
    {
      name: "Ukuran Barang",
      selector: (row) => row.ukuran_barang,
      sortable: true,
    },
    { name: "Stok Barang", selector: (row) => row.stok_barang, sortable: true },
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
      kode_barang: "KB001",
      jenis_barang: "Electronics",
      nama_barang: "Laptop",
      satuan_barang: "Unit",
      ukuran_barang: "15 inch",
      stok_barang: 25,
    },
  ];

  return (
    <Navbar title="Item">
      <div className="shadow rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Daftar Item</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={"/barang/tambah_barang"}>
              <Button color={"primary"}>
                <FaPlus className="fs-6 mb-1" style={{ marginRight: "10px" }} />
                Tambah Item
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

export default DataBarang;
