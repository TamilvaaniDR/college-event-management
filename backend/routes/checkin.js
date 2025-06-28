const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.post('/', async (req, res) => {
  const { email, event } = req.body;

  if (!email || !event) {
    return res.status(400).json({ message: "Email and event are required!" });
  }

  try {
    const user = await Registration.findOne({ email, event });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.checkedIn) {
      return res.status(200).json({ message: "User already checked in!" });
    }

    user.checkedIn = true;
    await user.save();

    res.status(200).json({ message: "Check-in successful!", user });
  } catch (err) {
    console.error("Error during check-in:", err);
    res.status(500).json({ message: "Server error during check-in" });
  }
});

module.exports = router;
