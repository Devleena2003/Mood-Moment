const express = require("express");
const {
  createEventController,
  getEventsController,
  updateEventController,
  deleteEventController,
} = require("../controllers/eventControllers");
const { requireSignIn } = require("../controllers/userControllers");
const router = express.Router();

router.post("/events", requireSignIn, createEventController);
router.get("/events", requireSignIn, getEventsController);
router.put("/events/:eventId", requireSignIn, updateEventController);
router.delete("/events/:eventId", requireSignIn, deleteEventController);

module.exports = router;
