const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { addEmergencyContacts, addLocation } = require('../controllers/userController');
const client = redis.createClient(); // Redis connection

const router = express.Router();

// Add Emergency Contacts
router.put('/add-emergency-contacts', authenticate, addEmergencyContacts);

// Add Location
router.put('/add-location', authenticate, addLocation);

// Route to get location and send alert
router.post('/getLocation', getLocationAndSendAlert);

module.exports = router;
