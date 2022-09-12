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
    origin: ["http://localhost:3000", "http://192.168.1.10:3000"],
    credentials: true, // For receiving cookies,
    methods: "GET, POST, PUT, DELETE", // Only these requests will support
    preflightContinue: true, // Delete this
  })
);
app.use(cookieParser());
dotenv.config();
connectToMongo(); // Calling the function to connect with our database

const PORT = process.env.PORT || 8080;

// Auth routes
app.use("/api/auth", require("./routes/verifyToken"));
app.use("/api/auth", require("./routes/register"));
app.use("/api/auth", require("./routes/login"));
app.use("/api/auth", require("./routes/logout"));

// CRUD operations routes
app.use("/api", require("./routes/setData"));
app.use("/api", require("./routes/getCompanyData"));
app.use("/api", require("./routes/setCompanyData"));

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
