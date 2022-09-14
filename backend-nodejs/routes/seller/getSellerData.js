const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/authenticateUser");
const { findOne } = require("../../models/Buyer");
const Seller = require("../../models/Seller");

router.get("/getSellerData", authenticateUser, async (req, res) => {
  try {
    // Search the data using id
    const sellerDataExists = await Seller.findOne({ user: req.id }).exec(); // Only find one collection
    if (!sellerDataExists) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        sellerData: null,
        message: "No Data Found",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      sellerData: sellerDataExists,
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
});

module.exports = router;
