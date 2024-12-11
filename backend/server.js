require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
require('./config/passport'); // Import Passport configuration

const app = express();


app.use(cors())
// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
