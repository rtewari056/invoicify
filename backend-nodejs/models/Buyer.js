const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create model to fetch existing data
const buyerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // To reference the ObjectId of "User" model in this model
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  GSTIN: { type: String, required: true, unique: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Buyer", buyerSchema);
