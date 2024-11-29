import Navbar from "../../../components/templates/Navbar";
import Button from "../../../components/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import { AiOutlineMenu } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";

const DataBarang = () => {
  const { setProduct, product, handleDelete } = useProduct();

  useEffect(() => {
    const params = {
      page: 1,
      dataPerPage: 1000,
    };

    try {
      const fetchProducts = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product/list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params,
          }
        );
        setProduct(response.data.data);
      };
      fetchProducts();
    } catch (error) {
      console.log("Error get product:", error);
    }
  }, []);

  const columns = [
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
      cell: (row) => (
        <div className="d-flex gap-1">
          <button
            type="button"
            className="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target={`#historyModal${row.id}`}
          >
            <AiOutlineMenu className="d-flex align-items-center" />
          </button>
          <Link to={`/barang/edit_barang/${row.id}`}>
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

  const products = product?.data || [];
  const record = [];

  products.map((v) => {
    if (v && v.id) {
      record.push({
        id: v.id,
        kode_barang: v.code || "No code",
        jenis_barang: v.type?.name || "No type",
        nama_barang: v.name || "No name",
        satuan_barang: v.unit?.name || "No unit",
        ukuran_barang: v.unit_size?.name || "No size",
        stok_barang: v.quantity || 0,
      });
    }
  });

  record.sort((a, b) => {
    if (a.kode_barang > b.kode_barang) return -1;
    if (a.kode_barang < b.kode_barang) return 1;
    return 0;
  });

  return (
    <Navbar title="Item">
      {record.map((row) => (
        <div
          className="modal fade"
          id={`historyModal${row.id}`}
          tabIndex="-1"
          aria-labelledby={`historyModalLabel${row.id}`}
          aria-hidden="true"
          key={row.id}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id={`historyModalLabel${row.id}`}
                >
                  History Transaksi
                </h1>
              </div>
              <div className="modal-body">{row.kode_barang}</div>
            </div>
          </div>
        </div>
      ))}

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
