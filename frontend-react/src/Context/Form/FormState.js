import { useState } from "react";
import FormContext from "./FormContext";

const host = "http://localhost:5000";

const FormState = (props) => {
  // Form alerts
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  const [dismissAlert, setDismissAlert] = useState("none");
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlertMessage({
      message: message,
      type: type,
    });
    setDismissAlert("block");

    // To dismiss the alert after 5 seconds
    setTimeout(() => {
      setAlertMessage({ message: "", type: "" });
      setDismissAlert("none");
    }, 5000);
  };

  // Login and Logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Seller data
  const [sellerData, setSellerData] = useState(null);

  // Get seller data
  const getSellerData = async () => {
    const url = `${host}/api/getCompanyData/${process.env.REACT_APP_SELLER_DATA_ID}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    setSellerData(json.companyData);
  };

  // CRUD operations

  // Send form data to database
  const setData = async (name, description) => {
    const url = `${host}/api/setData`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    const json = await response.json();

    return json;
  };

  return (
    <FormContext.Provider
      value={{
        host,
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        alertMessage,
        dismissAlert,
        setAlertMessage,
        setDismissAlert,
        showAlert,
        sellerData,
        setSellerData,
        getSellerData,
        setData,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormState;
