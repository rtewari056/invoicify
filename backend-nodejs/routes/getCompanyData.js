const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const CompanyData = require("../models/CompanyData");
const { param, validationResult } = require("express-validator"); // Express validator

router.get(
  "/getCompanyData/:id",
  authenticateUser,
  [param("id", "Invalid ID").isLength({ min: 24, max: 24 })],
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

      // Destructuring from incoming parameter
      const { id } = req.params;

      // Search the data using id
      const companyDataExists = await CompanyData.findById(id).exec();
      if (!companyDataExists) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Invalid ID",
        });
      }

      return res.status(200).json({
        success: true,
        statusCode: 200,
        companyData: companyDataExists,
        message: "Data sent successfully!",
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
