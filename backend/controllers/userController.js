

// controllers/userController.js
const User = require("../models/User");
const {
  getPlaceNameFromCoordinates,
  sendAlertToContacts,
} = require("../utils/accidentUtils");
const { getFormattedDateTime } = require("../utils/dateTimeUtils");

// Add Emergency Contacts
exports.addEmergencyContacts = async (req, res) => {
  const { primaryPhone, secondaryPhone } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.emergencyContacts = { primaryPhone, secondaryPhone };
    await user.save();

    res.status(200).json({
      message: "Emergency contacts updated successfully",
      contacts: user.emergencyContacts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Function to get location and send alert
exports.handleAccident = async (req, res) => {
  const { latitude, longitude, macAddress } = req.body;

  if (!macAddress || !latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "MAC address, latitude, and longitude are required" });
  }

  try {
    const user = await User.findOne({ macAddress });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const placeName = await getPlaceNameFromCoordinates(latitude, longitude);

    user.location = { latitude, longitude, placeName };
    await user.save();

    const emergencyContacts = user.emergencyContacts;

    if (emergencyContacts && emergencyContacts.primaryPhone) {
      const message = `Emergency Alert: ${user.name} got into an accident at ${getFormattedDateTime()} near ${placeName}. Please verify the safety of ${user.name} by calling ${user.phone}. Check the accident location here https://maps.google.com/?q=${latitude},${longitude} and report to the emergency service asap.`;
      const callMsg = `Emergency Alert: ${user.name} got into an accident at ${getFormattedDateTime()} near ${placeName}. Please verify ${user.name}'s safety by calling them. The accident location has been shared via WhatsApp. Kindly check and take necessary action.`;
      await sendAlertToContacts(
        emergencyContacts.primaryPhone,
        message,
        callMsg,
        user
      );
      if (emergencyContacts.secondaryPhone) {
        // await sendAlertToContacts(
        //   emergencyContacts.secondaryPhone,
        //   message,
        //   callMsg
        // );
      }
    }

    res.status(200).json({
      message: "Location updated and alert sent successfully",
      location: user.location,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Link the MAC address to the user
exports.linkUser = async (req, res) => {
  const { userId, macAddress } = req.body;

  // Validate input
  if (!userId || !macAddress) {
    return res
      .status(400)
      .json({ message: "User ID and MAC address are required" });
  }

  try {
    // Find the user in the database by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile with the MAC address
    user.macAddress = macAddress;
    await user.save();

    res
      .status(200)
      .json({ message: "MAC address linked with user successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
