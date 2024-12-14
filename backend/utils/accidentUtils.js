// utils/locationUtils.js
const axios = require("axios");
// Environment variables for Twilio credentials
require("dotenv").config();
const twilio = require("twilio");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Helper function to get place name from coordinates using a reverse geocoding API
const getPlaceNameFromCoordinates = async (latitude, longitude) => {
  const apiKey = process.env.GEOCODING_API_KEY; // Get your API key for reverse geocoding
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;
    if (results.length > 0) {
      return results[0].formatted; // Returning the place name (formatted address)
    }
    return "Unknown location";
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return "Unknown location";
  }
};

const sendAlertToContacts = async (contact, message, callMsg, user) => {
  // Send WhatsApp message
    client.messages
      .create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_NUMBER, // Twilio WhatsApp sandbox number
        to: `whatsapp:${contact}`, // Recipient's WhatsApp number (in E.164 format)
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error));
    client.messages
      .create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER, // Twilio WhatsApp sandbox number
        to: contact, // Recipient's WhatsApp number (in E.164 format)
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error));

    client.calls
      .create({
        to: contact,
        from: process.env.TWILIO_PHONE_NUMBER,
        twiml: `<Response><Say voice="alice">${callMsg}</Say></Response>`,
      })
      .then((call) => console.log(`Call initiated with SID: ${call.sid}`))
      .catch((error) => console.error("Error:", error));


  console.log(`Sending alert to ${contact}: ${message}`);
};

module.exports = { getPlaceNameFromCoordinates, sendAlertToContacts };
