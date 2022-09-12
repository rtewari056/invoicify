import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-wrapper d-flex flex-column align-items-center my-5 p-5">
      <div className="access-denied-logo mb-4">
        <i className="fa fa-exclamation-triangle fa-5x text-danger"/>
      </div>
      <div className="title fs-1 font-monospace">403 - ACCESS DENIED</div>
      <div className="subtitle fs-4 font-monospace">
        Please check with the site admin if you believe this is a mistake.
      </div>

      <Link className="mt-5" to="/login">
        <button type="button" className="btn btn-outline-danger btn-lg mt-3">
          GO TO HOMEPAGE
        </button>
      </Link>
    </div>
  );
};

export default Unauthorized;
