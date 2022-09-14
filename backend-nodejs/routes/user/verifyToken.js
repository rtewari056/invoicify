const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateUser = require("../../middleware/authenticateUser");

// ROUTE 1: Renew access token using: GET '/api/auth/renewAccessToken'. Login required
router.get("/renewAccessToken", authenticateUser, async (req, res) => {
  try {
    // Sending accessToken if authentication is successful
    const accessToken = jwt.sign(
      { id: req.id, email: req.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY_TIME}m`,
      }
    );

    // Renew the cookie again
    res.status(200).cookie("jwtAccessToken", accessToken, {
      maxAge: `${process.env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000}`,
      httpOnly: true,
    });

    return res.json({
      success: true,
      statusCode: 200,
      message: "Access token renewed",
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
