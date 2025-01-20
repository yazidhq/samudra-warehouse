import { IoIosSave } from "react-icons/io";
import Button from "../../../components/Button";
import Navbar from "../../../components/templates/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import { useEffect } from "react";

const TambahBarang = () => {
  const {
    unit,
    unitSize,
    type,
    handleCreate,
    fetchProducts,
    fetchUnit,
    fetchUnitSize,
    fetchType,
  } = useProduct();

  useEffect(() => {
    fetchProducts();
    fetchUnit();
    fetchUnitSize();
    fetchType();
  }, []);

  return (
    <Navbar title="Tambah Barang">
      <form onSubmit={handleCreate}>
        <div className="rounded-3 bg-white p-4 pb-2">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h1 className="h4">Form Tambah Barang</h1>
          </div>
          <hr />
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Kode Barang</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" name="code" />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Jenis Barang</label>
            </div>
            <div className="col-10">
              <select className="form-control" name="typeId">
                <option value="">Pilih Jenis Barang</option>
                {type?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Nama Barang</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" name="name" />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Satuan Barang</label>
            </div>
            <div className="col-10">
              <select className="form-control" name="unitId">
                <option value="">Pilih Satuan Barang</option>
                {unit?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">Ukuran Barang</label>
            </div>
            <div className="col-10">
              <select className="form-control" name="unitSizeId">
                <option value="">Pilih Ukuran Barang</option>
                {unitSize?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-2">
              <label className="form-label mt-2">stok Barang</label>
            </div>
            <div className="col-10">
              <input
                type="number"
                min={"0"}
                className="form-control"
                name="quantity"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3 mt-5">
            <Link to={"/barang"} className="text-decoration-none text-red">
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

export default TambahBarang;
