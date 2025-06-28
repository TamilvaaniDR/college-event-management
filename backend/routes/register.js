const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const Registration = require("../models/Registration");

// POST /register
router.post("/", async (req, res) => {
  const { name, rollno, email, event } = req.body;

  // Validation
  if (!name || !rollno || !email || !event) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Save to DB
    const newReg = new Registration({ name, rollno, email, event });
    await newReg.save();

    // Create QR data and image
    const qrData = JSON.stringify({ name, rollno, email, event });
    const qrImage = await QRCode.toDataURL(qrData); // Base64 QR code

    // Send response with QR and user info
    res.status(200).json({
      message: "User registered successfully",
      data: { name, rollno, email, event },
      qrCode: qrImage,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
});

module.exports = router;
