const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/authenticateUser");
const Buyer = require("../../models/Buyer");
const { body, validationResult } = require("express-validator"); // Express validator

router.post(
  "/setBuyerData",
  authenticateUser,
  [
    body("name", "Enter Buyer Name").isLength({ min: 1 }).exists(),
    body("address", "Enter Buyer Address").isLength({ min: 1 }).exists(),
    body("GSTIN", "Invalid GSTIN Number").isLength({
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
      const { name, address, GSTIN } = req.body;

      // Check database using and GSTIN if the data already exists
      const BuyerDataExists = await Buyer.findOne({ GSTIN }).exec();
      if (BuyerDataExists) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: "Sorry! Buyer with this GSTIN already exists",
        });
      }

      // Store the new company data
      await BuyerData.create({
        user: req.id, // To associate buyer data with logged in user id
        name,
        address,
        GSTIN,
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
