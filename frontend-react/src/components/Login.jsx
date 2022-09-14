import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormContext from "../Context/Form/FormContext";

const Login = () => {
  const context = useContext(FormContext);
  const { host, showAlert, loading, setLoading, setIsLoggedIn, getSellerData, getBuyerData } = context;

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  async function renewAccessToken() {
    const url = `${host}/api/auth/renewAccessToken`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const json = await response.json();

    if (json.success && json.statusCode === 200) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    }
  }

  // Check access token on first load
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      renewAccessToken();
      getSellerData(); // To get seller data
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // When log in button clicked

    const url = `${host}/api/auth/login`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    setLoading(false); // When the above process done

    if (json.success === true && json.statusCode === 200) {
      // Save the auth token in our react app
      showAlert("Logged in successfully", "success");
      getSellerData(); // To get seller data
      getBuyerData(); // To get buyer data
      setIsLoggedIn(true); // Admin logged in successfully
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else if (json.success === false && json.statusCode === 400) {
      showAlert(json.message, "danger");
      navigate("/login");
    } else {
      showAlert(json.message, "danger");
      navigate("/serverError");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth__container">
      <div className="auth">
        <h1 className="text-center">Hello Again!</h1>

        <form className="needs-validation auth__form" onSubmit={handleLogin}>
          <div className="form-group was-validated">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
            <div className="invalid-feedback">
              Please enter your email address
            </div>
          </div>
          <div className="form-group was-validated">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
            <div className="invalid-feedback">Please enter your password</div>
          </div>
          <button
            type="submit"
            className={`btn btn-success w-100 mt-3 fs-5 ${
              loading ? "disabled" : ""
            }`}
          >
            {loading ? "LOGGING IN..." : "LOG IN"}{" "}
            <i className="fa fa-sign-in" />
          </button>

          <div className="form-group mt-3 text-center">
            <label className="form-label">
              <small>
                Don't have an account?{" "}
                <Link to="/signup" className="redirectLink">
                  Sign up now
                </Link>
              </small>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
