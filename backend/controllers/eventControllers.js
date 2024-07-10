const Event = require("../models/eventModels");

exports.createEventController = async (req, res) => {
  const { title, description, date } = req.body;
  const userId = req.user.id; // Assuming userId is available in req.user after authentication

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      user: userId,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventsController = async (req, res) => {
  const userId = req.user.id; // Assuming userId is available in req.user after authentication

  try {
    const events = await Event.find({ user: userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEventController = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEventController = async (req, res) => {
  const { eventId } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
