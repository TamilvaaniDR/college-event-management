const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { role, name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ role, name, email, password });
    await newUser.save();
    res.status(201).json({ role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { role, email, password } = req.body;

  try {
    const user = await User.findOne({ role, email, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
