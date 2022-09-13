import { useState, useContext } from "react";
import FormContext from "../Context/Form/FormContext";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const context = useContext(FormContext);
  const { sendFormData, showAlert } = context;
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    buyerName: "",
    buyerAddress: "",
    buyerGST_Number: "",
  });

  async function formSubmit(e) {
    e.preventDefault(); // Page will not reload

    const json = await sendFormData(formData); // addData returns a json data

    if (json.success === true && json.statusCode === 200) {
      showAlert(json.message, "success");
    } else if (json.success === false && json.statusCode === 401) {
      showAlert(json.message, "danger");
      navigate("/login");
    } else {
      showAlert(json.message, "danger");
      navigate("/serverError");
    }

    setFormData({ buyerName: "", buyerAddress: "", buyerGST_Number: "" }); // Clear input fields after submit
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <form className="row g-3 my-5" onSubmit={formSubmit}>
        <h1 className="text-center fst-italic mb-3">GST INVOICE FORM</h1>

        <div className="col-md-5">
          <label for="buyerName" className="form-label">
            Buyer's Name
          </label>
          <input
            type="email"
            className="form-control"
            id="buyerName"
            name="buyerName"
            onChange={handleChange}
            value={formData.buyerName}
          />
        </div>

        <div className="col-md-5">
          <label for="buyerAddress" className="form-label">
            Buyer's Address
          </label>
          <input
            type="text"
            className="form-control"
            id="buyerAddress"
            name="buyerAddress"
            onChange={handleChange}
            value={formData.buyerAddress}
          />
        </div>

        <div className="col-md-2">
          <label for="buyerGST_Number" className="form-label">
            Buyer's GST Number
          </label>
          <input
            type="text"
            className="form-control"
            id="buyerGST_Number"
            name="buyerGST_Number"
            onChange={handleChange}
            value={formData.buyerGST_Number}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
  );
};

export default InvoiceForm;
