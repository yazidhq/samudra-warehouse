import axios from "axios";
import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    setIsLoggedIn(false);
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data)
        .then((response) => {
          setIsLoggedIn(true);
          setCurrentUser({
            username: e.target.username.value,
            password: e.target.password.value,
          });
          localStorage.setItem("token", response.data.token);
        })
        .catch((response) => {
          Swal.fire("Failed!", response.message).then(() => {
            setIsLoggedIn(false);
          });
        });
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, currentUser, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
