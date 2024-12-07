import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [unit, setUnit] = useState([]);
  const [unitSize, setUnitSize] = useState([]);
  const [type, setType] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { page: 1, dataPerPage: 1000 },
        }
      );
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUnit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dropdown/unit/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { page: 1, dataPerPage: 1000 },
        }
      );
      setUnit(response.data.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const fetchUnitSize = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dropdown/unit-size/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { page: 1, dataPerPage: 1000 },
        }
      );
      setUnitSize(response.data.data);
    } catch (error) {
      console.error("Error fetching unit sizes:", error);
    }
  };

  const fetchType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dropdown/type/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { page: 1, dataPerPage: 1000 },
        }
      );
      setType(response.data.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = {
      code: e.target.code.value,
      typeId: parseInt(e.target.typeId.value),
      name: e.target.name.value,
      unitId: parseInt(e.target.unitId.value),
      unitSizeId: parseInt(e.target.unitSizeId.value),
      quantity: parseInt(e.target.quantity.value),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire("Success!", "Product created successfully!", "success");
      await fetchProducts();
      navigate("/barang");
    } catch (error) {
      Swal.fire("Error", "Failed to create product.", "error");
    }
  };

  const handleUpdate = async (e, productId) => {
    e.preventDefault();
    const updatedData = {
      code: e.target.code.value,
      typeId: parseInt(e.target.typeId.value),
      name: e.target.name.value,
      unitId: parseInt(e.target.unitId.value),
      unitSizeId: parseInt(e.target.unitSizeId.value),
      quantity: parseInt(e.target.quantity.value),
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/product/update/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire("Success!", "Product updated successfully!", "success");
      await fetchProducts();
      navigate("/barang");
    } catch (error) {
      Swal.fire("Error", "Failed to update product.", "error");
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
          `${import.meta.env.VITE_BASE_URL}/product/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        await fetchProducts();
      } catch (error) {
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        unit,
        unitSize,
        type,
        fetchProducts,
        fetchUnit,
        fetchUnitSize,
        fetchType,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
