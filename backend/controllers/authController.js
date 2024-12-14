const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup Handler
exports.signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Check if all required fields (name, email, password, phone) are provided
  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "Name, email, password, and phone number are required",
    });
  }

  try {
    // Check if user already exists by email or phone
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    if (existingUserByPhone) {
      return res
        .status(400)
        .json({ message: "User with this phone number already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    console.log(newUser);

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10d", // Token expires in 10 days
    });
    const { password, ...userWithoutPassword } = newUser;

    res
      .status(201)
      .json({ user: userWithoutPassword, token, message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Handler
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10d", // Token expires in 10 days
    });
    const { password, ...userWithoutPassword } = user;

    res
      .status(200)
      .json({ token, user: userWithoutPassword, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
};

// Google OAuth Callback Handler
exports.googleCallback = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.redirect(`http://your-client-url.com?token=${token}`);
  } catch (err) {
    res.status(500).json({ message: "Google login error", error: err.message });
  }
};
