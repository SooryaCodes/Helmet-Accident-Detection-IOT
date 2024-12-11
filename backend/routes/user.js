const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { addEmergencyContacts, getLocationAndSendAlert, registerDevice } = require('../controllers/userController');

const router = express.Router();

// Add Emergency Contacts
router.put('/add-emergency-contacts', authenticate, addEmergencyContacts);

// Register device
router.post("/register-device",registerDevice)

// Route to get location and send alert
router.post('/getLocation', getLocationAndSendAlert);

module.exports = router;
