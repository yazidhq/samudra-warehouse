import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const params = {
      page: 1,
      dataPerPage: 1000,
    };

    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const token = localStorage.getItem("token");

    try {
      if (token) {
        const fetchProducts = async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/product/list`,
            {
              headers: header,
              params,
            }
          );
          setProduct(response.data.data);
        };
        fetchProducts();

        const fetchUnit = async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/dropdown/unit/list`,
            {
              headers: header,
              params,
            }
          );
          setUnit(response.data.data);
        };
        fetchUnit();

        const fetchUnitSize = async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/dropdown/unit-size/list`,
            {
              headers: header,
              params,
            }
          );
          setUnitSize(response.data.data);
        };
        fetchUnitSize();

        const fetchType = async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/dropdown/type/list`,
            {
              headers: header,
              params,
            }
          );
          setType(response.data.data);
        };
        fetchType();
      }
    } catch (error) {
      console.log("Error get product:", error);
    }
  }, [localStorage.getItem("token")]);

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
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProduct((prevProducts) => {
        if (Array.isArray(prevProducts)) {
          return [...prevProducts, response.data.data];
        }
        return [response.data.data];
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product created successfully!",
      }).then(() => {
        navigate("/barang");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create product.",
      }).then(() => {
        navigate("/barang");
      });
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
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/product/update/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProduct((prevProducts) => {
        if (prevProducts?.data) {
          const updatedProducts = prevProducts.data.map((product) =>
            product.id === parseInt(productId) ? response.data.data : product
          );
          return { ...prevProducts, data: updatedProducts };
        }
        return prevProducts;
      });

      navigate("/barang");
    } catch (error) {
      navigate("/barang");
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

        setProduct((prevProducts) => {
          if (Array.isArray(prevProducts)) {
            return prevProducts.filter((item) => item.id !== id);
          }
          return [];
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The product has been deleted.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete product.",
        });
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        setProduct,
        product,
        unit,
        unitSize,
        type,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
