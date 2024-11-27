import { Navigate } from "react-router-dom";
import Button from "../../components/Button";
import Image from "../../components/Image";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      await handleLogin(e);
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("/data/bg-login.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(15px)",
          zIndex: -1,
        }}
      ></div>

      <div
        className="card rounded-4 border-0 shadow"
        style={{ width: "40rem", zIndex: 1 }}
      >
        <div className="card-body pt-5 px-5 pb-5">
          <div className="text-center">
            <Image src={"/data/logo.jpeg"} width={"200px"} />
          </div>
          <div className="text-center fs-5 my-5">
            <span className="fw-medium">PT. SEMBILAN SAMUDRA PERKASA</span>
          </div>
          <form onSubmit={handleSubmit} className="px-5 mx-5">
            {errorMessage && (
              <div className="alert alert-danger mb-3">{errorMessage}</div>
            )}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nama User
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                autoComplete="current-password"
                required
                aria-label="Username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Kata Sandi
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                aria-label="Password"
              />
            </div>

            <div className="d-grid gap-2 pb-3 mt-4">
              <Button color={"primary"}>Masuk</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
