const User = require('../models/User');

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

// Add Location
exports.addLocation = async (req, res) => {
    const { latitude, longitude, placeName } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.location = { latitude, longitude, placeName };
        await user.save();

        res.status(200).json({ message: 'Location updated successfully', location: user.location });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
