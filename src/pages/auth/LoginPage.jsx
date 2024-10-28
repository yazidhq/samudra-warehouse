import Button from "../../components/Button";
import Image from "../../components/Image";

const LoginPage = () => {
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
          backgroundImage: `url("./public/data/bg-login.png")`,
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
            <Image src={"./public/data/logo.jpeg"} width={"200px"} />
          </div>
          <div className="text-center fs-5 my-5">
            <span className="fw-medium">PT. SEMBILAN SAMUDRA PERKASA</span>
          </div>
          <form className="px-5 mx-5">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Nama User
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Kata Sandi
              </label>
              <input type="password" className="form-control" id="password" />
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
