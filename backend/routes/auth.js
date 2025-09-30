// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, interests } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      interests: role === 'mentee' ? interests : [], // only mentees need interests
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {
      expiresIn: '1d',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Signup failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    if (role !== user.role) {
      return res.status(400).json({ msg: 'Role mismatch' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {
      expiresIn: '1d',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
});

module.exports = router;
