import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../../components/templates/Navbar";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { IoIosSave } from "react-icons/io";

const ItemTransaksi = () => {
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
          <h1 className="h4">Item Transaksi</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <FaPlus className="fs-6 mb-1" style={{ marginRight: "10px" }} />
              Tambah Item
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Tambah Item
                    </h1>
                  </div>
                  <div className="modal-body">
                    <div class="mb-3">
                      <label class="form-label mt-2">Pilih Barang</label>
                      <select type="text" class="form-control">
                        <option selected>- Pilih Barang -</option>
                        <option value="1">Barang 1</option>
                        <option value="2">Barang 2</option>
                        <option value="3">Barang 3</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label mt-2">Kuantitas Barang</label>
                      <input type="number" class="form-control" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Button color={"primary"}>
                      <IoIosSave
                        className="fs-6 mb-1"
                        style={{ marginRight: "10px" }}
                      />
                      Simpan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Table columns={columns} record={record} />
        <div className="d-flex justify-content-between mb-3 mt-5">
          <Link
            to={"./transaksi/tambah_transaksi"}
            className="text-decoration-none text-red"
          >
            <span style={{ color: "red" }}>
              <FaArrowLeft
                className="fs-6 mb-1"
                style={{ marginRight: "10px", color: "red" }}
              />
              <span className="fw-medium">Kembali</span>
            </span>
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default ItemTransaksi;
