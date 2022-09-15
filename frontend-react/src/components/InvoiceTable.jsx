import React, { useState } from "react";
// import Select from "react-select";

// const productOptions = [
//   {
//     value: "Product 1",
//     label: "Product 1",
//     HSN_Code: 1534,
//   },
//   {
//     value: "Product 2",
//     label: "Product 2",
//     HSN_Code: 3214,
//   },
//   {
//     value: "Product 3",
//     label: "Product 3",
//     HSN_Code: 9856,
//   },
// ];

const InvoiceTable = () => {
  const [rowData, setRowData] = useState([
    {
      description: "",
      hsnCode: "",
      gstRate: "",
      quantity: "",
      rate: "",
      unit: "", // Dropdown fix needed
      amount: "",
    },
  ]);

  const columnsArray = [
    "Description",
    "HSN Code",
    "GST Rate",
    "Quantity",
    "Rate",
    "Unit",
    "Amount",
  ]; // pass columns here dynamically

  const handleAddTableRow = () => {
    setRowData([
      ...rowData,
      {
        description: "",
        hsnCode: "",
        gstRate: "",
        quantity: "",
        rate: "",
        unit: "",
        amount: "",
      },
    ]);
  };

  const postResults = () => {
    console.log(rowData); // there you go, do as you please
  };

  const handleRemoveSpecificRow = (index) => {
    const values = [...rowData]; // to avoid  direct state mutation
    console.log(index);
    values.splice(index, 1);
    setRowData(values);
  };

  const updateTableData = (index, e) => {
    const values = [...rowData];
    values[index][e.target.name] = e.target.value;
    setRowData(values);
  };

  return (
    <div className="col-md-12 column">
      <table className="table table-bordered table-hover" id="tab_logic">
        <thead>
          <tr>
            <th className="text-center"> # </th>
            {columnsArray.map((column, index) => (
              <th className="text-center" key={index}>
                {column}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {rowData.map((element, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={element.description}
                  // index={idx}
                  onChange={(e) => updateTableData(index, e)}
                />
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  id="hsnCode"
                  name="hsnCode"
                  value={element.hsnCode}
                  // index={idx}
                  onChange={(e) => updateTableData(index, e)}
                />
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  id="gstRate"
                  name="gstRate"
                  value={element.gstRate}
                  // index={idx}
                  onChange={(e) => updateTableData(index, e)}
                />
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={element.quantity}
                  // index={idx}
                  onChange={(e) => updateTableData(index, e)}
                />
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  id="rate"
                  name="rate"
                  value={element.rate}
                  // index={idx}
                  onChange={(e) => updateTableData(index, e)}
                />
              </td>

              <td>
                <select
                  id="unit"
                  name="unit"
                  className="form-select"
                  onChange={(e) => updateTableData(index, e)}
                >
                  <option defaultValue={"Default"}>Default</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={element.amount}
                  // index={idx}
                  onChange={(e) => updateTableData(index, e)}
                />
              </td>

              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveSpecificRow(index)}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    Remove <i className="fas fa-trash-alt ms-1" />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary btn-sm me-2"
          onClick={handleAddTableRow}
        >
          Add Row
        </button>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={postResults}
        >
          Save Results
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
