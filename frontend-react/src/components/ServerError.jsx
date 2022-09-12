const ServerError = () => {
  return (
    <div className="text-wrapper d-flex flex-column align-items-center my-5 p-5">
      <div className="access-denied-logo mb-4">
        <i className="fa fa-server fa-5x" />
      </div>
      <div className="title fs-1 font-monospace">
        500 - INTERNAL SERVER ERROR
      </div>
      <div className="subtitle fs-4 font-monospace">
        Sorry, something went wrong on our end. We are currently trying to fix
        the problem.
      </div>

      <div className="mt-3 mb-2 fs-2">In the meantime, you can:</div>
      <div className="fs-5 mb-1">
        <i className="fa fa-sync" /> Refresh the page
      </div>
      <div className="fs-5">
        <i className="far fa-clock" /> Wait a few minutes
      </div>
    </div>
  );
};

export default ServerError;
