const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  addEmergencyContacts,
  handleAccident,
  linkUser,
} = require("../controllers/userController");

const router = express.Router();
  
// Add Emergency Contacts
router.put("/add-emergency-contacts", authenticate, addEmergencyContacts);
// Route to get location and send alert
router.post("/handle-accident", handleAccident);

router.post("/link-user", authenticate, linkUser);


module.exports = router;
