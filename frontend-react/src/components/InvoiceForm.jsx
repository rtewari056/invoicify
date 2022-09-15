import { useState, useContext } from "react";
import FormContext from "../Context/Form/FormContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import currentDate from "../Utility_Functions/currentDate";
import InvoiceTable from "./InvoiceTable";

const InvoiceForm = () => {
  const context = useContext(FormContext);
  const { sendFormData, showAlert } = context;
  let navigate = useNavigate();

  const buyerOptions = [
    {
      value: "TEST 1 INDUSTRIES PVT. LTD.",
      label: "TEST 1 INDUSTRIES PVT. LTD.",
      address: "Address 1",
      GSTIN: "GSTIN 1",
    },
    {
      value: "TEST 2 INDUSTRIES PVT. LTD.",
      label: "TEST 2 INDUSTRIES PVT. LTD.",
      address: "Address 2",
      GSTIN: "GSTIN 2",
    },
    {
      value: "TEST 3 INDUSTRIES PVT. LTD.",
      label: "TEST 3 INDUSTRIES PVT. LTD.",
      address: "Address 3",
      GSTIN: "GSTIN 3",
    },
  ];

  const [selectedValue, setSelectedValue] = useState(null);
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerGST_Number, setBuyerGST_Number] = useState("");

  const [formData, setFormData] = useState({
    dispatch_Details: "",
    GST_InvoiceNumber: "",
    todayDate: currentDate(),
    venderCode: "",
    E_WayBillNumber: "",
    workOrderNumber: "",
    date1: "",
    PO_RefferenceNumber: "",
    date2: "",
  });

  async function formSubmit(e) {
    e.preventDefault(); // Page will not reload

    // Adding dropdown properties in formData object
    formData.buyerName = selectedValue;
    formData.buyerAddress = buyerAddress;
    formData.buyerGST_Number = buyerGST_Number;

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

    // Clear input fields after submit
    setSelectedValue(null);
    setBuyerAddress("");
    setBuyerGST_Number("");
    setFormData({
      dispatch_Details: "",
      GST_InvoiceNumber: "",
      venderCode: "",
      E_WayBillNumber: "",
      workOrderNumber: "",
      date1: "",
      PO_RefferenceNumber: "",
      date2: "",
    });
  }

  //
  const handleDropdown = (selectedValue) => {
    if (selectedValue !== null) {
      setSelectedValue(selectedValue.value);
      setBuyerAddress(selectedValue.address);
      setBuyerGST_Number(selectedValue.GSTIN);
    } else {
      setSelectedValue("");
      setBuyerAddress("");
      setBuyerGST_Number("");
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="row g-3 my-5" onSubmit={formSubmit}>
      <h1 className="text-center fst-italic mb-3">GST INVOICE FORM</h1>

      <div className="col-md-3">
        <label htmlFor="buyerName" className="form-label">
          Buyer's Name
        </label>
        <Select
          placeholder="Select Buyer Name"
          defaultValue={selectedValue} // Defalut value will null
          value={selectedValue === null ? null : selectedValue.value}
          isClearable={true}
          isSearchable={true}
          options={buyerOptions} // Dropdown values
          id="buyerName"
          name="buyerName"
          onChange={handleDropdown}
        />
      </div>

      <div className="col-md-5">
        <label htmlFor="buyerAddress" className="form-label">
          Buyer's Address
        </label>
        <input
          type="text"
          className="form-control"
          id="buyerAddress"
          name="buyerAddress"
          disabled={true}
          value={buyerAddress}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="buyerGST_Number" className="form-label">
          Buyer's GST Number
        </label>
        <input
          type="text"
          className="form-control"
          id="buyerGST_Number"
          name="buyerGST_Number"
          disabled={true}
          value={buyerGST_Number}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="dispatch_Details" className="form-label">
          Dispatch Details
        </label>
        <input
          type="text"
          className="form-control"
          id="dispatch_Details"
          name="dispatch_Details"
          onChange={handleFormData}
          value={formData.dispatch_Details}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="GST_InvoiceNumber" className="form-label">
        GST Invoice No
        </label>
        <input
          type="text"
          className="form-control"
          id="GST_InvoiceNumber"
          name="GST_InvoiceNumber"
          onChange={handleFormData}
          value={formData.GST_InvoiceNumber}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="todayDate" className="form-label">
          Date
        </label>
        <input
          type="text"
          className="form-control"
          id="todayDate"
          name="todayDate"
          onChange={handleFormData}
          value={formData.todayDate}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="venderCode" className="form-label">
        Vender Code
        </label>
        <input
          type="text"
          className="form-control"
          id="venderCode"
          name="venderCode"
          onChange={handleFormData}
          value={formData.venderCode}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="E_WayBillNumber" className="form-label">
        E-Way Bill Number
        </label>
        <input
          type="text"
          className="form-control"
          id="E_WayBillNumber"
          name="E_WayBillNumber"
          onChange={handleFormData}
          value={formData.E_WayBillNumber}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="workOrderNumber" className="form-label">
        Work Order Number
        </label>
        <input
          type="text"
          className="form-control"
          id="workOrderNumber"
          name="workOrderNumber"
          onChange={handleFormData}
          value={formData.workOrderNumber}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="date1" className="form-label">
          Date 1
        </label>
        <input
          type="text"
          className="form-control"
          id="date1"
          name="date1"
          onChange={handleFormData}
          value={formData.date1}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="PO_RefferenceNumber" className="form-label">
        PO. Refference Number
        </label>
        <input
          type="text"
          className="form-control"
          id="PO_RefferenceNumber"
          name="PO_RefferenceNumber"
          onChange={handleFormData}
          value={formData.PO_RefferenceNumber}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="date2" className="form-label">
          Date 2
        </label>
        <input
          type="text"
          className="form-control"
          id="date2"
          name="date2"
          onChange={handleFormData}
          value={formData.date2}
        />
      </div>

      <InvoiceTable/>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
