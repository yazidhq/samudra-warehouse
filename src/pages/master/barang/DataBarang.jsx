import Navbar from "../../../components/templates/Navbar";
import Button from "../../../components/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const DataBarang = () => {
  const {
    fetchProducts,
    fetchUnit,
    fetchUnitSize,
    fetchType,
    product,
    handleDelete,
  } = useProduct();
  const [productHistory, setProductHistory] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchUnit();
    fetchUnitSize();
    fetchType();
  }, []);

  const handleHistory = async (id) => {
    try {
      const response = await axios.get(
        "https://api.samudraperkasa.my.id/api/product/history/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { page: 1, dataPerPage: 1000, productId: id },
        }
      );
      console.log("History response:", response.data);
      setProductHistory(response.data.data.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
    }
  };

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
            onClick={() => handleHistory(row.id)}
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

  const record = (product?.data || []).map((v) => ({
    id: v.id,
    kode_barang: v.code || "No code",
    jenis_barang: v.type?.name || "No type",
    nama_barang: v.name || "No name",
    satuan_barang: v.unit?.name || "No unit",
    ukuran_barang: v.unit_size?.name || "No size",
    stok_barang: v.quantity || 0,
  }));

  record.sort((a, b) => b.kode_barang.localeCompare(a.kode_barang));

  return (
    <Navbar title="Stok Barang">
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
                  Histori Barang
                </h1>
              </div>
              <div className="modal-body">
                {productHistory && productHistory.length > 0 ? (
                  productHistory.map((v) => (
                    <div key={v.id} className="card mb-3">
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          {v.deliveryOrderNumber &&
                            `[${v.deliveryOrderNumber}]`}{" "}
                          {v.reason}:{" "}
                          {v.quantityChange > 0
                            ? `+${v.quantityChange}`
                            : v.quantityChange}
                        </div>
                        <div>
                          {dayjs(v.timestamp).format("DD MMMM YYYY HH:mm")}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No history found for this product.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Daftar Stok Barang</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={"/barang/tambah_barang"}>
              <Button color={"primary"}>
                <FaPlus className="fs-6 mb-1" style={{ marginRight: "10px" }} />
                Tambah Stok
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
