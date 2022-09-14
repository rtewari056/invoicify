const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/authenticateUser");
const Seller = require("../../models/Seller");
const { body, validationResult } = require("express-validator"); // Express validator

router.post(
  "/setSellerData",
  authenticateUser,
  [
    body("seller.seller_name", "Enter Seller Name")
      .isLength({ min: 1 })
      .exists(),
    body("seller.GSTIN", "Invalid GSTIN Number").isLength({
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
      const { seller_name, type, address, email, mobile, GSTIN } =
        req.body.seller;
      const { bank_name, accountNumber, IFSC_Code, branch } = req.body.bank;

      // Check database using GSTIN if the data already exists
      const SellerDataExists = await Seller.findOne({
        "seller.GSTIN": GSTIN, // FindOne() syntax for nested objects
      }).exec();
      if (SellerDataExists) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: "Sorry! Seller with this GSTIN already exists",
        });
      }

      // Store the new seller data
      await SellerData.create({
        user: req.id, // To associate seller data with logged in user id
        seller: { seller_name, type, address, email, mobile, GSTIN },
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
