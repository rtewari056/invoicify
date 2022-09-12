import { useContext } from "react";
import FormContext from "../Context/Form/FormContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const context = useContext(FormContext);
  const { isLoggedIn } = context;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
