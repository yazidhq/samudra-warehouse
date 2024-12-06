import { FaPlus } from "react-icons/fa";
import Table from "../../components/Table";
import Navbar from "../../components/templates/Navbar";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useTransaction } from "../../context/TransactionContext";
import axios from "axios";
import { useEffect } from "react";
import { AiFillDatabase } from "react-icons/ai";

const DataTransaksi = () => {
  const { setTransaction, transaction, handleDelete } = useTransaction();

  useEffect(() => {
    const params = {
      page: 1,
      dataPerPage: 1000,
    };

    try {
      const fetchTransactions = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/transaction/list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params,
          }
        );
        setTransaction(response.data.data);
      };
      fetchTransactions();
    } catch (error) {
      console.log("Error get Transaction:", error);
    }
  }, []);

  const columns = [
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

  const transactions = transaction?.data || [];
  const record = [];

  transactions.map((v) => {
    if (v && v.id) {
      record.push({
        id: v.id,
        no_surat_jalan: v.deliveryOrderNumber || "No deliveryOrderNumber",
        nama_pengatur: v.organizerName || "No typorganizerNamee",
        nama_penyetuju: v.approvalName || "No approvalName",
        nama_pengirim: v.senderName || "No senderName",
        nama_penerima: v.recipientName || "No recipientName",
      });
    }
  });

  record.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });

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
