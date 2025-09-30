const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey';

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token invalid' });
  }
}

// Get resources based on user interests
router.get('/my-resources', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const resources = await Resource.find({
      category: { $in: user.interests },
    });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// Add a new resource (admin/mentor use)
router.post('/add', async (req, res) => {
  try {
    const { title, url, category } = req.body;
    const resource = new Resource({ title, url, category });
    await resource.save();
    res.json({ msg: 'Resource added', resource });
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

module.exports = router;
