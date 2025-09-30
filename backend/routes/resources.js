// routes/resources.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const resources = require('../data/resources');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey';

// Middleware to authenticate user
function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Get resources based on user interests
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    let videos = [];
    user.interests.forEach((interest) => {
      if (resources[interest]) {
        videos = [...videos, ...resources[interest]];
      }
    });

    res.json({ interests: user.interests, videos });
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

module.exports = router;
