const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  email: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  checkedIn: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
