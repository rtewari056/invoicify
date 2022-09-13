const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator"); // Express validator
const User = require("../models/User"); // Importing User model

// ROUTE 2: Authenticate a user using: POST '/api/auth/login'. No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
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
      
      const { email, password } = req.body; // Destructuring from incoming request
      
      // Check if user exists
      const userExists = await User.findOne({ email }).exec();
      if (!userExists) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, userExists.password); // Returns True if the password entered by the user matches
      if (!passwordCompare) {
        success = false;
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Please try to login with correct credentials",
        });
      }

      // Create JWTs
      const accessToken = jwt.sign(
        { id: userExists.id, email: userExists.email },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY_TIME}m`,
        }
      );

      res.status(200).cookie("jwtAccessToken", accessToken, {
        maxAge: `${process.env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000}`,
        httpOnly: true,
      });

      // Sending accessToken if authentication is successful
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Logged in successfully",
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
