const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/authenticateUser");
const Buyer = require("../../models/Buyer");

router.get("/getBuyerData", authenticateUser, async (req, res) => {
  try {
    // Search the data using id
    const buyerDataExists = await Buyer.find({ user: req.id }).exec();
    if (!buyerDataExists) {
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
      buyerData: buyerDataExists,
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
