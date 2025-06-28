const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const authRoutes = require("./routes/auth");
const registerRoutes = require("./routes/register");
const checkinRoutes = require("./routes/checkin");


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ MongoDB connected"));

// Routes
app.use("/auth", authRoutes);       // handles /auth/signup and /auth/login
app.use("/register", registerRoutes); // handles event registration
app.use("/api/checkin", checkinRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




