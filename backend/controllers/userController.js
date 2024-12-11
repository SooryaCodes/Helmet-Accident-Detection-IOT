// controllers/userController.js
const redis = require('redis');
const User = require('../models/User');
const { getPlaceNameFromCoordinates, sendAlertToContacts } = require('../utils/accidentUtils');

const client = redis.createClient({
    url: process.env.REDIS_URL, 
  });
client.on('error', (err) => {
    console.error('Redis error:', err);
});



// Add Emergency Contacts
exports.addEmergencyContacts = async (req, res) => {
    const { primaryPhone, secondaryPhone } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.emergencyContacts = { primaryPhone, secondaryPhone };
        await user.save();

        res.status(200).json({ message: 'Emergency contacts updated successfully', contacts: user.emergencyContacts });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};




// Register device with MAC address (no email)
exports.registerDevice = async (req, res) => {
    const { macAddress } = req.body;

    if (!macAddress) {
        return res.status(400).json({ message: 'MAC address is required' });
    }

    try {
        // Store MAC address temporarily in Redis with an expiry time of 10 minutes
        const redisKey = `mac_${macAddress}`;
        client.setex(redisKey, 600, 'pending'); // Mark it as pending with a temporary value

        res.status(200).json({ message: 'MAC address temporarily stored' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Function to get location and send alert
exports.getLocationAndSendAlert = async (req, res) => {
    const { latitude, longitude, macAddress } = req.body;

    if (!macAddress || !latitude || !longitude) {
        return res.status(400).json({ message: 'MAC address, latitude, and longitude are required' });
    }

    try {
        const user = await User.findOne({ macAddress });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const placeName = await getPlaceNameFromCoordinates(latitude, longitude);

        user.location = { latitude, longitude, placeName };
        await user.save();

        const emergencyContacts = user.emergencyContacts;

        if (emergencyContacts && emergencyContacts.primaryPhone) {
            const message = `Accident alert! A user has encountered an accident at ${placeName}. Check the location: https://maps.google.com/?q=${latitude},${longitude}`;
            await sendAlertToContacts(emergencyContacts.primaryPhone, message);
            if (emergencyContacts.secondaryPhone) {
                await sendAlertToContacts(emergencyContacts.secondaryPhone, message);
            }
        }

        res.status(200).json({ message: 'Location updated and alert sent successfully', location: user.location });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Link the MAC address to the user
exports.linkUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Retrieve the MAC address from Redis
        client.keys('mac_*', async (err, keys) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching MAC address from Redis' });
            }

            if (keys.length === 0) {
                return res.status(404).json({ message: 'No pending MAC addresses found' });
            }

            // Loop through keys to find the MAC address
            for (const key of keys) {
                const macAddress = key.split('_')[1]; // Extract MAC address from key

                // Check if the MAC address is still pending in Redis
                client.get(key, async (err, status) => {
                    if (status === 'pending') {
                        // Find the user in the database by userId
                        const user = await User.findById(userId);
                        if (!user) {
                            return res.status(404).json({ message: 'User not found' });
                        }

                        // Update the user profile with the MAC address
                        user.macAddress = macAddress;
                        await user.save();

                        // Remove the MAC address from Redis after successful link
                        client.del(key);

                        res.status(200).json({ message: 'MAC address linked with user successfully' });
                        return;
                    }
                });
            }

            // If no valid MAC address found
            return res.status(404).json({ message: 'No valid pending MAC address found to link' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};