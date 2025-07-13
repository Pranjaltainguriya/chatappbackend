const express = require("express");
const {
  register,
  login,
  logout,
  getotheruser
} = require("../controllers/UserControler");

const isAuthenticated = require("../mideleware/isAunthaticated");
const {
  sendMessage,
  getMessages
} = require("../controllers/Massageconversation");

const router = express.Router();

// Route to send message
router.post("/send/:id", isAuthenticated, sendMessage);

// Optional: Route to get all messages with a user
router.get("/get/:id",isAuthenticated, getMessages);

module.exports = router;
