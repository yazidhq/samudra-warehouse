import { FaPlus } from "react-icons/fa";
import Navbar from "../../components/templates/Navbar";
import Button from "../../components/Button";
import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import axios from "axios";
import Swal from "sweetalert2";

const ValidasiPage = () => {
  const { product, type } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [validateList, setValidateList] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("validateData"));
    setValidateList(storedData?.items || []);
  }, []);

  const handleTypeChange = (e) => {
    const typeId = e.target.value;
    setSelectedType(typeId);

    const filtered = product?.data?.filter(
      (item) => item.typeId === parseInt(typeId)
    );
    setFilteredProducts(filtered || []);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      productCode: e.target.productCode.value,
      quantity: parseInt(e.target.quantity.value),
    };

    setValidateList((prevProducts) => {
      const updatedList = [...prevProducts, data];
      const wrappedData = { items: updatedList };
      localStorage.setItem("validateData", JSON.stringify(wrappedData));
      return updatedList;
    });
  };

  const handleDelete = (index) => {
    setValidateList((prevList) => {
      const updatedList = prevList.filter((_, i) => i !== index);
      const wrappedData = { items: updatedList };
      localStorage.setItem("validateData", JSON.stringify(wrappedData));
      return updatedList;
    });
  };

  const handleIncreaseQuantity = (index) => {
    setValidateList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].quantity += 1;
      const wrappedData = { items: updatedList };
      localStorage.setItem("validateData", JSON.stringify(wrappedData));
      return updatedList;
    });
  };

  const handleDecreaseQuantity = (index) => {
    setValidateList((prevList) => {
      const updatedList = [...prevList];
      if (updatedList[index].quantity > 1) {
        updatedList[index].quantity -= 1;
        const wrappedData = { items: updatedList };
        localStorage.setItem("validateData", JSON.stringify(wrappedData));
      }
      return updatedList;
    });
  };

  const handleValidate = async () => {
    const payload = { items: validateList };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stock/check`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const invalidItems = response.data.data.filter((item) => !item.valid);

      if (invalidItems.length > 0) {
        const invalidMessages = invalidItems
          .map(
            (item) =>
              `Product Code: ${item.productCode} has insufficient stock.`
          )
          .join("\n");
        Swal.fire({
          icon: "error",
          title: "Validation Failed",
          text: `The following items are invalid:\n${invalidMessages}`,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Stock validated successfully!",
        }).then(() => {
          navigate("/barang");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to validate stock.",
      });
    }
  };

  return (
    <Navbar title="Validasi Stok">
      <div className="rounded-3 bg-white p-4 pb-2">
        <form onSubmit={handleSave}>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h1 className="h4">Item</h1>
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
                                {item.name}
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
                            min="1" // Ensure quantity cannot be less than 1
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div className="mb-4">
          <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
            {Array.isArray(validateList) &&
              validateList.map((v, index) => {
                const productDetails = product?.data?.find(
                  (item) => item.code === v.productCode
                );

                const headerBgColor =
                  v.quantity < productDetails?.quantity
                    ? "bg-primary"
                    : "bg-danger";

                return (
                  <div className="card border-0" key={index}>
                    <div
                      className={`card-header ${headerBgColor} text-white fw-medium d-flex justify-content-between align-items-center`}
                    >
                      <div>
                        {v.productCode} ({productDetails?.quantity})
                      </div>
                      <div>
                        <MdDelete
                          className="fs-2 text-danger bg-white rounded-1 p-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                    <div className="card-body border rounded-bottom">
                      <h5 className="card-title">{productDetails?.name}</h5>
                      <p className="card-text">
                        {productDetails?.unit_size.name}{" "}
                        {productDetails?.unit.name}
                      </p>
                      <div className="d-flex justify-content-end align-items-center gap-3">
                        <FiMinus
                          className="fs-3 border border-1 border-dark rounded-circle"
                          onClick={() => handleDecreaseQuantity(index)}
                        />
                        <input
                          type="number"
                          className="text-center border-0 rounded bg-secondary py-2"
                          value={v.quantity}
                          disabled
                        />
                        <FiPlus
                          className="fs-3 border border-1 border-dark rounded-circle"
                          onClick={() => handleIncreaseQuantity(index)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="d-flex justify-content-between mb-3 mt-5">
            <Button color={"primary"} onClick={handleValidate}>
              <IoIosSave
                className="fs-6 mb-1"
                style={{ marginRight: "10px" }}
              />
              Validasi Stok
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ValidasiPage;
