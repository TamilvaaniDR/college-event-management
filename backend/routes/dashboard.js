const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.get('/dashboard', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.render('dashboard', { registrations }); // Assuming EJS or other view engine
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
