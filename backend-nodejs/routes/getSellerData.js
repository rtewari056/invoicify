const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const SellerData = require("../models/Seller");

router.get("/getSellerData", authenticateUser, async (req, res) => {
  try {
    // Search the data using id
    const SellerDataExists = await SellerData.find({ user: req.id }).exec();
    if (!SellerDataExists) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      SellerData: SellerDataExists,
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
