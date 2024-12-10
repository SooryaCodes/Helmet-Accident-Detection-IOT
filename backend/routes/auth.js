const express = require('express');
const passport = require('passport');
const { signup, googleCallback, login } = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Google OAuth Login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleCallback);

module.exports = router;
