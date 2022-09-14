const express = require("express");
const router = express.Router();

router.get("/logout", async (req, res) => {
  try {
    // const cookies = req.headers.cookie.split("=");
    // const cookieName = cookies[0];
    // const accessToken = cookies[1];
    const accessToken = req.cookies.jwtAccessToken;

    // If we don't have "accessToken" property
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        error: "User not authenticated",
      });
    }

    res.clearCookie("jwtAccessToken");

    // Sending accessToken (containing email) if authentication is successful
    return res.status(200).json({ success: true, statusCode: 200, message: "Cookie cleared" });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
