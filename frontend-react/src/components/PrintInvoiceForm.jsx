// import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print"; // Importing the library
import DummySignature from "../images/dummySignature.png";
import FormContext from "../Context/Form/FormContext";

const PrintInvoiceForm = () => {
  const context = useContext(FormContext);
  const { sellerData } = context;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "data",
    onAfterPrint: () => alert("Print success"),
    // pageStyle: `@page {
    //   size: 210mm 297mm;
    // }`,
  });

  const products = [
    {
      serialNumber: 1,
      description: "Wordpress Template",
      smDescription:
        "Reference site about Lorem Ipsum, giving information on its origins.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 2,
      description: "Maxwell Admin Template",
      smDescription: "As well as a random Lipsum generator.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 3,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 4,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 5,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 6,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 7,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 8,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 9,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
    {
      serialNumber: 10,
      description: "Unify Admin Template",
      smDescription: "Lorem ipsum has become the industry standard.",
      hsnCode: 7219,
      gstRate: 18,
      quantity: 1370,
      rate: 395,
      unit: "KGS",
      amount: 541150,
    },
  ];

  return (
    <div className="container my-3">
      <button type="button" className="print-button" onClick={handlePrint}>
        Download as PDF
        <i className="fa fa-file ms-2" style={{ color: "red" }} />
      </button>

      <div className="pdf-container my-3" ref={componentRef}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="invoice-container">
                  <div className="invoice-header ">
                    <div className="row text-center">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div
                          className="heading-container"
                          style={{
                            borderBottom: "2px solid green",
                            paddingBottom: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <p
                            className="fst-italic text-success display-4"
                            style={{
                              display: "inline-block",
                              borderBottom: "5px solid green",
                              width: "fit-content",
                            }}
                          >
                            {sellerData !== null ? sellerData.company.company_name : "NULL"}
                          </p>

                          <h6>{sellerData !== null ? sellerData.company.type : "NULL"}</h6>

                          <h6>{sellerData !== null ? sellerData.company.address : "NULL"}</h6>

                          <h6 className="text-primary">
                            E-mail: {sellerData !== null ? sellerData.company.email : "NULL"}, Mob:{" "}
                            {sellerData !== null ? sellerData.company.mobile : "NULL"}
                          </h6>

                          <h6>GSTIN: {sellerData !== null ? sellerData.company.GSTIN : "NULL"}</h6>
                        </div>
                      </div>
                    </div>

                    <p
                      className="mb-3 fw-semibold"
                      style={{
                        margin: "auto",
                        borderBottom: "3px double",
                        width: "fit-content",
                      }}
                    >
                      GST Invoice
                    </p>

                    <div className="row" style={{ fontSize: "0.7rem" }}>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <table className="table header-table m-0">
                          <tbody>
                            <tr>
                              <td>
                                <h6>
                                  <u>Buyer's Name & Address</u>
                                </h6>

                                <strong>TEST INDUSTRIES PVT. LTD.</strong>
                                <br />
                                <span>
                                  <strong>Works: </strong>
                                  <span>NULL</span>
                                </span>
                                <br />
                                <span>
                                  <strong>PS: </strong>
                                  <span>Domjur, Howrah, 711302</span>
                                </span>
                                <br />
                              </td>
                              <td>
                                <span>
                                  <strong>GST In No: </strong>
                                  <span>22/22-23</span>
                                </span>
                                <br />
                                <span>
                                  <strong>Vender Code: </strong>
                                  <span>......</span>
                                </span>
                                <br />
                                <span>
                                  <strong>E-Way Bill No: </strong>
                                  <span>Null</span>
                                </span>
                                <br />
                                <span>
                                  <strong>Date: </strong>
                                  <span>07-07-2022</span>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>
                                  <strong>Buyers GST No.: </strong>
                                  <span>NULL</span>
                                </span>
                              </td>
                              <td>
                                <span>
                                  <strong>Challan No.: </strong>
                                  <span>.......</span>
                                </span>
                                <br />
                                <span>
                                  <strong>Pur. Order No: </strong>
                                  <span>NULL</span>
                                </span>
                                <br />
                                <span>
                                  <strong>Date: </strong>
                                  <span>06-07-2022</span>
                                </span>
                                <br />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="invoice-body">
                    <div className="row gutters">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="table-responsive">
                          <table className="table custom-table m-0">
                            <thead>
                              <tr>
                                <th>SL No.</th>
                                <th>Description</th>
                                <th>HSN Code</th>
                                <th>GST Rate</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Unit</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map((element, index) => {
                                return (
                                  <tr
                                    key={`product-${index}`}
                                    style={{ border: "none" }}
                                  >
                                    <td>{element.serialNumber}</td>
                                    <td>
                                      {element.description}
                                      <p className="m-0 text-muted">
                                        {element.smDescription}
                                      </p>
                                    </td>
                                    <td>{element.hsnCode}</td>
                                    <td>{element.gstRate}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.rate}</td>
                                    <td>{element.unit}</td>
                                    <td>${element.amount}</td>
                                  </tr>
                                );
                              })}

                              <tr>
                                <td colSpan={4}>
                                  <span>
                                    <strong className="text-dark lead fw-semibold">
                                      RUPEES-
                                    </strong>{" "}
                                    <em className="text-success lead fw-normal">
                                      SIX LAKHS FOURTY FIVE THOUSAND SIX HUNDRED
                                      THIRTY SEVEN ONLY
                                    </em>
                                  </span>
                                </td>
                                <td colSpan={3}>
                                  <p>
                                    Subtotal
                                    <br />
                                    Transportation Charges
                                    <br />
                                    CGST @ 9%
                                    <br />
                                    SGST @ 9%
                                    <br />
                                    IGST
                                    <br />
                                    Round Add/Off
                                    <br />
                                  </p>

                                  <h6 className="text-success">
                                    <strong>Grand Total</strong>
                                  </h6>
                                </td>
                                <td>
                                  <p>
                                    $5000.00
                                    <br />
                                    $100.00
                                    <br />
                                    $100.00
                                    <br />
                                    $49.00
                                    <br />
                                    $49.00
                                    <br />
                                    -
                                    <br />
                                  </p>

                                  <h6 className="text-success">
                                    <strong>$5150.99</strong>
                                  </h6>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={4}>
                                  <h6>
                                    <u>Bank Details</u>
                                  </h6>
                                  <span>
                                    <strong>BANK NAME: </strong>
                                    <span>
                                      {sellerData !== null ? sellerData.bank.bank_name : "NULL"}
                                    </span>
                                  </span>
                                  <br />
                                  <span>
                                    <strong>Account No: </strong>
                                    <span>
                                      {sellerData !== null
                                        ? sellerData.bank.accountNumber
                                        : "NULL"}
                                    </span>
                                  </span>
                                  <br />
                                  <span>
                                    <strong>IFSC Code: </strong>
                                    <span>
                                      {sellerData !== null ? sellerData.bank.IFSC_Code : "NULL"}
                                    </span>
                                  </span>
                                  <br />
                                  <span>
                                    <strong>Branch: </strong>
                                    <span>
                                      {sellerData !== null ? sellerData.bank.branch : "NULL"}
                                    </span>
                                  </span>
                                  <br />
                                </td>
                                <td colSpan={4}>
                                  <h6 className="text-center">
                                    for{" "}
                                    <span className="fst-italic">
                                      {sellerData !== null
                                        ? sellerData.company.company_name
                                        : "NULL"}
                                    </span>
                                  </h6>
                                  <img
                                    src={DummySignature}
                                    style={{
                                      display: "block",
                                      margin: "auto",
                                      width: "200px",
                                    }}
                                    alt="Dummy Signature"
                                  />
                                  <p className="text-center mt-2">
                                    Authorised Signature
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-footer">
                    Thank you for your Business.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoiceForm;
