// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  max: { type: Number, required: true },
  participants: { type: [String], default: [] } // array of participant IDs/emails/etc
});

module.exports = mongoose.model('Event', EventSchema);



