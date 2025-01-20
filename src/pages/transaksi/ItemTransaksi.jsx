import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "../../components/templates/Navbar";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { IoIosSave } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useProduct } from "../../context/ProductContext";
import Swal from "sweetalert2";
import { useRef } from "react";

const ItemTransaksi = () => {
  const { product, type } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [transactionItem, setTransactionItem] = useState([]);
  const { id } = useParams();
  const formRef = useRef(null);

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transaction/${id}/add-item`,
        {
          productCode: e.target.productCode.value,
          quantity: parseInt(e.target.quantity.value),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchTransactionsItem();

      if (formRef.current) {
        formRef.current.reset();
      }

      setSelectedType("");
      setFilteredProducts([]);

      document
        .getElementById("exampleModal")
        .classList.remove("show", "d-block");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.classList.remove("modal-backdrop"));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transactions Item created successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create Transactions Item!",
      });
    }
  };

  const handleDeleteItem = async (productCode) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL
          }/transaction/${id}/delete-item/${productCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTransactionItem((prevItems) => {
          if (Array.isArray(prevItems)) {
            return [...prevItems, response.data.data];
          }
          return [response.data.data];
        });

        fetchTransactionsItem();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The Transaction item has been deleted.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete Transaction item.",
        });
      }
    }
  };

  const fetchTransactionsItem = async () => {
    const params = {
      page: 1,
      dataPerPage: 1000,
    };

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/${id}/items`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params,
        }
      );
      setTransactionItem(response.data.data);
    } catch (error) {
      console.log("Error get Transactions Item:", error);
    }
  };

  useEffect(() => {
    fetchTransactionsItem();
  }, []);

  const handleTypeChange = (e) => {
    const typeId = e.target.value;
    setSelectedType(typeId);

    const filtered = product?.data?.filter(
      (item) => item.typeId === parseInt(typeId)
    );
    setFilteredProducts(filtered || []);
  };

  const columns = [
    { name: "Kode Barang", selector: (row) => row.kode_barang, sortable: true },
    { name: "Nama Barang", selector: (row) => row.nama_barang, sortable: true },
    {
      name: "Jenis Barang",
      selector: (row) => row.jenis_barang,
      sortable: true,
    },
    { name: "Ukuran Unit", selector: (row) => row.unit_size, sortable: true },
    { name: "Kuantitas", selector: (row) => row.kuantitas, sortable: true },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="d-flex gap-1">
          <Button
            color={"danger"}
            onClick={() => handleDeleteItem(row.kode_barang)}
          >
            <MdDelete className="d-flex align-items-center" />
          </Button>
        </div>
      ),
    },
  ];

  const transactionsItem = transactionItem?.data || [];
  const record = [];

  transactionsItem.map((v) => {
    if (v && v.id) {
      record.push({
        id: v.id,
        kode_barang: v.productCode || "No productCode",
        nama_barang: v.product.name || "No Name",
        jenis_barang: v.product.type.name || "No Type",
        unit_size:
          v.product.unit_size.name + " " + v.product.unit.name || "No Size",
        kuantitas: v.quantity || "No quantity",
      });
    }
  });

  record.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });

  return (
    <Navbar title="Surat Jalan">
      <div className="rounded-3 bg-white p-4 pb-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h1 className="h4">Item Surat Jalan</h1>
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
              tabIndex="-1"
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
                  <form ref={formRef} onSubmit={handleCreateItem}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label mt-2">Jenis Barang</label>
                        <select
                          className="form-control"
                          name="typeId"
                          onChange={handleTypeChange}
                        >
                          <option value="">Pilih Jenis Barang</option>
                          {type?.data?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedType && (
                        <div className="mb-3">
                          <label className="form-label mt-2">Barang</label>
                          <select className="form-control" name="productCode">
                            <option value="">Pilih Barang</option>
                            {filteredProducts.map((item) => (
                              <option key={item.id} value={item.code}>
                                {`${item.name} - ${item.unit_size.name} ${item.unit.name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {selectedType && (
                        <div className="mb-3">
                          <label className="form-label mt-2">
                            Kuantitas Barang
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="quantity"
                          />
                        </div>
                      )}
                    </div>
                    {selectedType && (
                      <div className="modal-footer">
                        <Button color={"primary"}>
                          <IoIosSave
                            className="fs-6 mb-1"
                            style={{ marginRight: "10px" }}
                          />
                          Simpan
                        </Button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Table columns={columns} record={record} />
      </div>
    </Navbar>
  );
};

export default ItemTransaksi;
