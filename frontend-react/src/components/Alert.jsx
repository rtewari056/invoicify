import { useContext } from "react";
import FormContext from "../Context/Form/FormContext";

export default function Alert() {
  const context = useContext(FormContext);
  const { alertMessage, dismissAlert, setDismissAlert } = context;

  return (
    <>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          className={`toast toast-primary d-${dismissAlert} align-items-center`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              <i
                className={`fas fa-${
                  alertMessage.type === "success" ? "check-circle" : "ban"
                }`}
              ></i>{" "}
              {alertMessage.message}
            </div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                setDismissAlert("none");
              }}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}
