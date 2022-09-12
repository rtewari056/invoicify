import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormContext from "../Context/Form/FormContext";

const SignUp = () => {
  const context = useContext(FormContext);
  const { host, showAlert, loading, setLoading } = context;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true); // When button sign up button clicked

    const url = `${host}/api/auth/createuser`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    setLoading(false); // When the above process done

    if (json.success && json.statusCode === 200) {
      showAlert("Account created successfully", "success");
      navigate("/login");
    } else if (json.success === false && json.statusCode === 400) {
      showAlert(json.error, "danger");
      navigate("/signup");
    } else {
      showAlert(json.error, "danger");
      navigate("/serverError");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth__container">
      <div className="auth">
        <h1 className="text-center">Sign Up</h1>

        <form className="needs-validation auth__form" onSubmit={handleSignup}>
          <div className="form-group was-validated">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              type="name"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
            <div className="invalid-feedback">Please enter your name</div>
          </div>
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
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className={`form-control ${
                credentials.password.length === 0
                  ? "is-invalid"
                  : credentials.password.length < 8
                  ? "is-invalid"
                  : "is-valid"
              }`}
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <div className="invalid-feedback">
              Password must be atleast 8 characters
            </div>
          </div>
          <button
            type="submit"
            className={`btn btn-success w-100 mt-3 fs-5 ${
              loading ? "disabled" : ""
            }`}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE AN ACCOUNT"}{" "}
            <i className="fa fa-user-plus" />
          </button>

          <div className="form-group mt-3 text-center">
            <label className="form-label">
              <small>
                Already have an account?{" "}
                <Link to="/login" className="redirectLink">
                  Login now
                </Link>
              </small>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
