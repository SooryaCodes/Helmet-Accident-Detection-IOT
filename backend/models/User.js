const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    emergencyContacts: {
        primaryPhone: { type: String, required: true },
        secondaryPhone: { type: String, required: true },
    },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        placeName: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
