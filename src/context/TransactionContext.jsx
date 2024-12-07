import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    const params = {
      page: 1,
      dataPerPage: 1000,
    };

    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/list`,
        {
          headers: header,
          params,
        }
      );
      setTransaction(response.data.data);
    } catch (error) {
      console.log("Error get Transaction:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchTransactions();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      deliveryOrderNumber: e.target.deliveryOrderNumber.value,
      organizerName: e.target.organizerName.value,
      approvalName: e.target.approvalName.value,
      senderName: e.target.senderName.value,
      recipientName: e.target.recipientName.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transaction/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTransaction((prevTransactions) => {
        if (Array.isArray(prevTransactions)) {
          return [...prevTransactions, response.data.data];
        }
        return [response.data.data];
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transaction created successfully!",
      }).then(() => {
        navigate(`/transaksi/${response.data.data.id}/item_transaksi`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create Transaction.",
      }).then(() => {
        navigate("/transaksi");
      });
    }
  };

  const handleUpdate = async (e, TransactionId) => {
    e.preventDefault();

    const updatedData = {
      deliveryOrderNumber: e.target.deliveryOrderNumber.value,
      organizerName: e.target.organizerName.value,
      approvalName: e.target.approvalName.value,
      senderName: e.target.senderName.value,
      recipientName: e.target.recipientName.value,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/transaction/update/${TransactionId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTransaction((prevTransactions) => {
        if (prevTransactions?.data) {
          const updatedTransactions = prevTransactions.data.map((Transaction) =>
            Transaction.id === parseInt(TransactionId)
              ? response.data.data
              : Transaction
          );
          return { ...prevTransactions, data: updatedTransactions };
        }
        return prevTransactions;
      });

      navigate("/transaksi");
    } catch (error) {
      navigate("/transaksi");
    }
  };

  const handleDelete = async (id) => {
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
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/transaction/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The Transaction has been deleted.",
        });

        fetchTransactions();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete Transaction.",
        });
      }
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        setTransaction,
        transaction,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
