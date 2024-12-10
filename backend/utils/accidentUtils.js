// utils/locationUtils.js
const axios = require('axios');

// Helper function to get place name from coordinates using a reverse geocoding API
const getPlaceNameFromCoordinates = async (latitude, longitude) => {
    const apiKey = process.env.GEOCODING_API_KEY; // Get your API key for reverse geocoding
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;
        if (results.length > 0) {
            return results[0].formatted;  // Returning the place name (formatted address)
        }
        return 'Unknown location';
    } catch (error) {
        console.error('Geocoding error:', error.message);
        return 'Unknown location';
    }
};

// Helper function to send an alert (for example, using an SMS service or email)
const sendAlertToContacts = async (contact, message) => {
    // Integrate with your SMS service provider or email service here
    // Example: Sending SMS through Twilio or email through SendGrid
    console.log(`Sending alert to ${contact}: ${message}`);
    // Simulate sending alert
};

module.exports = { getPlaceNameFromCoordinates, sendAlertToContacts };
