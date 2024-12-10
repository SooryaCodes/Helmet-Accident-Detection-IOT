const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },
    macAddress: { type: String }, // Add this field for storing MAC address

    emergencyContacts: {
        primaryPhone: {
            type: String,
            required: false, // Not required during signup
        },
        secondaryPhone: {
            type: String,
            required: false, // Not required during signup
        },
    },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        placeName: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
