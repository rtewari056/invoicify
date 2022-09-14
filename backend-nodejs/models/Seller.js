const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create model to fetch existing data
const sellerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // To reference the ObjectId of "User" model in this model
  },
  seller: {
    seller_name: { type: String, required: true },
    type: { type: String },
    address: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    GSTIN: { type: String, required: true, unique: true },
  },
  bank: {
    bank_name: { type: String },
    accountNumber: { type: Number },
    IFSC_Code: { type: String },
    branch: { type: String },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
