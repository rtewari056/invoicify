import { useState, useContext } from "react";
import FormContext from "../Context/Form/FormContext";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const context = useContext(FormContext);
  const { setData, showAlert } = context;
  let navigate = useNavigate();

  async function formSubmit(e) {
    e.preventDefault(); // Page will not reload

    const json = await setData(formData.name, formData.description); // addData returns a json data

    if (json.success === true && json.statusCode === 200) {
      showAlert(json.message, "success");
    } else if(json.success === false && json.statusCode === 401) {
      showAlert(json.message, "danger");
      navigate("/login");
    } else {
      showAlert(json.message, "danger");
      navigate("/serverError");
    }

    setFormData({ name: "", description: "" }); // Clear input fields after submit
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={formSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          onChange={onChange}
          value={formData.name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          onChange={onChange}
          value={formData.description}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default InvoiceForm;
