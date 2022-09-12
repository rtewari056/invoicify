import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import FormContext from "../Context/Form/FormContext";

const NavigationBar = () => {
  const context = useContext(FormContext);
  const { host, showAlert, isLoggedIn, setIsLoggedIn } = context;

  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = `${host}/api/auth/logout`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const json = await response.json();

    if (json.success && json.statusCode === 200) {
      showAlert("Logged out successfully", "success");
      setIsLoggedIn(false); // Admin logged in successfully
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand h5" to="/">
          <i className="fa fa-print" /> Invoice Generator
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item h5">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item h5">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/printInvoice" ? "active" : ""
                    }`}
                    to="/printInvoice"
                  >
                    Print Invoice
                  </Link>
                </li>
                <li className="nav-item h5">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/updateInvoice" ? "active" : ""
                    }`}
                    to="/updateInvoice"
                  >
                    Update Invoice
                  </Link>
                </li>
                <li className="nav-item h5">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item h5">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            )}
          </ul>
          {isLoggedIn ? (
            <form className="d-flex">
              <button className="signup-logout-button" type="button" onClick={handleLogout}>
                  Logout
                </button>
            </form>
          ) : (
            <form className="d-flex">
              <Link className="me-2 text-decoration-none" to="/login">
                <button className="login-button" type="button">
                  Log In
                </button>
              </Link>
              <Link className="me-2 text-decoration-none" to="/signup">
                <button className="signup-logout-button" type="button">
                  Sign Up
                </button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
