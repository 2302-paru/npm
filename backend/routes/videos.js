// routes/videos.js
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// GET videos by interests
// Example: /api/videos?interests=HR,Technical
router.get('/', async (req, res) => {
  try {
    const { interests } = req.query;

    let filter = {};
    if (interests) {
      const interestsArray = interests.split(',');
      filter = { interest: { $in: interestsArray } };
    }

    const videos = await Video.find(filter);
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
