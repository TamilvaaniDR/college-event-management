const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// ✅ Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a new event
router.post("/events", async (req, res) => {
  const { title, date, description, limit } = req.body;
  try {
    const newEvent = new Event({
      title,
      date,
      description,
      max: limit,
      participants: []
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to add event" });
  }
});

// ✅ Update event max limit
router.post("/events/:id/update-limit", async (req, res) => {
  const { limit } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (limit < event.participants.length) {
      return res.status(400).json({ error: "Limit cannot be less than registered participants" });
    }

    event.max = limit;
    await event.save();
    res.json({ message: "Limit updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete an event
router.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Optionally delete related registrations
    await Registration.deleteMany({ event: event._id });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Register a user to an event
router.post('/register', async (req, res) => {
  try {
    const { name, rollno, email, event } = req.body;

    const registration = new Registration({
      name,
      rollno,
      email,
      event
    });

    await registration.save();

    // Add participant to the Event's participants array
    const selectedEvent = await Event.findById(event);
    if (!selectedEvent) return res.status(404).json({ error: "Event not found" });

    if (selectedEvent.participants.length >= selectedEvent.max) {
      return res.status(400).json({ error: "Event is full" });
    }

    selectedEvent.participants.push(email); // or rollno, based on what you track
    await selectedEvent.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
