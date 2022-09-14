const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToMongo = require("./dbConnection"); // Importing "connectToMongo()" for db connection
// 202.142.81.147
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true, // For receiving cookies,
    methods: "GET, POST, PUT, DELETE", // Only these requests will support
  })
);
app.use(cookieParser());
dotenv.config();
connectToMongo(); // Calling the function to connect with our database

const PORT = process.env.PORT || 8080;

// Auth routes
app.use("/api/auth", require("./routes/user/verifyToken"));
app.use("/api/auth", require("./routes/user/register"));
app.use("/api/auth", require("./routes/user/login"));
app.use("/api/auth", require("./routes/user/logout"));

// Seller CRUD operations routes
app.use("/api/seller", require("./routes/seller/getSellerData"));
app.use("/api/seller", require("./routes/seller/setSellerData"));

// Buyer CRUD operations routes
app.use("/api/buyer", require("./routes/buyer/getBuyerData"));
app.use("/api/buyer", require("./routes/buyer/setBuyerData"));

// Invoice CRUD operations routes
app.use("/api", require("./routes/setInvoiceFormData"));

// If any other route except above routes, return below responses
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
