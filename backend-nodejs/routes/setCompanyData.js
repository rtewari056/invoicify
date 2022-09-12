const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const CompanyData = require("../models/CompanyData");
const { body, validationResult } = require("express-validator"); // Express validator

router.post(
  "/setCompanyData",
  authenticateUser,
  [
    body("company.company_name", "Enter Company Name")
      .isLength({ min: 1 })
      .exists(),
    body("company.GSTIN", "Invalid GSTIN Number").isLength({
      min: 15,
      max: 15,
    }),
  ],
  async (req, res) => {
    try {
      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      // Destructuring from incoming request
      const { company_name, type, address, email, mobile, GSTIN } =
        req.body.company;
      const { bank_name, accountNumber, IFSC_Code, branch } = req.body.bank;

      // Check database using company name, email and GSTIN if the data already exists
      const companyDataExists = await CompanyData.findOne({
        "company.GSTIN": GSTIN, // FindOne() syntax for nested objects
      }).exec();
      if (companyDataExists) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: "Sorry! Company with this GSTIN already exists",
        });
      }

      // Store the new company data
      await CompanyData.create({
        company: { company_name, type, address, email, mobile, GSTIN },
        bank: { bank_name, accountNumber, IFSC_Code, branch },
      });

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Data saved successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error",
        error,
      });
    }
  }
);

module.exports = router;
