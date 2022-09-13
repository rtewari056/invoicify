const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const Invoice = require("../models/Invoice"); // Importing Invoice model

router.post("/setInvoiceFormData", authenticateUser, async (req, res) => {
  try {
    const { name, description } = req.body; // Getting data from request body

    await Invoice.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Successfully submitted! Thank you!",
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
