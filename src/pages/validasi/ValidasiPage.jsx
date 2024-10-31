import { FaPlus } from "react-icons/fa";
import Navbar from "../../components/templates/Navbar";
import Button from "../../components/Button";
import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";

const ValidasiPage = () => {
  return (
    <Navbar title="Validasi Stok">
      <div className="shadow rounded-3 bg-white p-4 pb-2">
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
                      <label className="form-label mt-2">Kategori Barang</label>
                      <select type="text" className="form-control">
                        <option selected>- Pilih Kategori -</option>
                        <option>Kategori 1</option>
                        <option>Kategori 2</option>
                        <option>Kategori 3</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label mt-2">
                        Kuantitas Barang
                      </label>
                      <input type="number" className="form-control" />
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
        <div className="mb-4">
          <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
            <div className="card border-0">
              <div className="card-header bg-primary text-white fw-medium d-flex justify-content-between align-items-center">
                <div>Kode Barang</div>
                <div>
                  <MdDelete className="fs-2 text-danger bg-white rounded-1 p-1" />
                </div>
              </div>
              <div className="card-body border rounded-bottom">
                <h5 className="card-titl e">Nama Barang - 1 Liter</h5>
                <p className="card-text">1 Kaleng/ Kemasan</p>
                <div className="d-flex justify-content-end align-items-center gap-3">
                  <FiMinus className="fs-3 border border-1 border-dark rounded-circle" />
                  <input
                    type="number"
                    className="text-center border-0 rounded bg-secondary py-2"
                    disabled
                  />
                  <FiPlus className="fs-3 border border-1 border-dark rounded-circle" />
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header bg-primary text-white fw-medium d-flex justify-content-between align-items-center">
                <div>Kode Barang</div>
                <div>
                  <MdDelete className="fs-2 text-danger bg-white rounded-1 p-1" />
                </div>
              </div>
              <div className="card-body border rounded-bottom">
                <h5 className="card-titl e">Nama Barang - 1 Liter</h5>
                <p className="card-text">1 Kaleng/ Kemasan</p>
                <div className="d-flex justify-content-end align-items-center gap-3">
                  <FiMinus className="fs-3 border border-1 border-dark rounded-circle" />
                  <input
                    type="number"
                    className="text-center border-0 rounded bg-secondary py-2"
                    disabled
                  />
                  <FiPlus className="fs-3 border border-1 border-dark rounded-circle" />
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header bg-primary text-white fw-medium d-flex justify-content-between align-items-center">
                <div>Kode Barang</div>
                <div>
                  <MdDelete className="fs-2 text-danger bg-white rounded-1 p-1" />
                </div>
              </div>
              <div className="card-body border rounded-bottom">
                <h5 className="card-titl e">Nama Barang - 1 Liter</h5>
                <p className="card-text">1 Kaleng/ Kemasan</p>
                <div className="d-flex justify-content-end align-items-center gap-3">
                  <FiMinus className="fs-3 border border-1 border-dark rounded-circle" />
                  <input
                    type="number"
                    className="text-center border-0 rounded bg-secondary py-2"
                    disabled
                  />
                  <FiPlus className="fs-3 border border-1 border-dark rounded-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mb-3 text-end">
          <Button color={"primary px-5"}>Verifikasi</Button>
        </div>
      </div>
    </Navbar>
  );
};

export default ValidasiPage;
