const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// 🔐 REGISTER
exports.register = async (req, res) => {
  try {
    // ✅ validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // ✅ check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔒 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL;

    // 👤 create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user"
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      msg: "User registered successfully",
      token
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 👑 PROMOTE USER TO ADMIN (admin only)
exports.promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({ msg: `${user.email} promoted to admin` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔑 LOGIN
exports.login = async (req, res) => {
  try {
    // ✅ validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 🔍 find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // 🔐 check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};