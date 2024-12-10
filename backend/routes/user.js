const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { addEmergencyContacts, addLocation } = require('../controllers/userController');

const router = express.Router();

// Add Emergency Contacts
router.put('/add-emergency-contacts', authenticate, addEmergencyContacts);

// Add Location
router.put('/add-location', authenticate, addLocation);

module.exports = router;
