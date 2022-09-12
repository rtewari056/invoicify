const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator"); // Importing "body" and "validationResult" Express validator
const User = require("../models/User"); // Importing User model

// ROUTE 1: Create a User using: POST '/api/createuser'. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), // Checks if the length of a string falls in a specified range
    body("email", "Enter a valid email").isEmail(), // Checks if the incoming string is a valid email address
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); // Extracts the validation errors from incoming request
      if (!errors.isEmpty()) {
        // If there are errors, return bad request and send the error details as JSON
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      const { name, email, password } = req.body; // Getting password from request body

      const userExists = await User.findOne({ email }).exec();
      if (userExists) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: "Sorry! User with this email already exists",
        });
      }

      //  Hashing the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Register and store the new user
      await User.create({
        name,
        email,
        password: hashedPassword, // Storing hashed password
        role: "visitor", // Storing defalut role
      });

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Account created successfully",
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
