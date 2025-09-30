const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Dummy roadmap generator
const generateRoadmap = (interests, answers) => {
  const roadmap = [];
  interests.forEach((interest) => {
    if (interest === 'Technical') {
      roadmap.push('Explore open source projects');
      if (answers.skillLevel === 'beginner')
        roadmap.push('Start with JavaScript basics');
      if (answers.goal === 'career') roadmap.push('Build a portfolio site');
    }
    if (interest === 'Business')
      roadmap.push('Read unconventional business case studies');
    if (interest === 'HR') roadmap.push('Study unconventional HR strategies');
    if (interest === 'Safety')
      roadmap.push('Learn unconventional safety protocols');
  });

  if (answers.personality === 'creative')
    roadmap.push('Try cross-disciplinary projects');
  if (answers.personality === 'analytical')
    roadmap.push('Learn data-driven decision making');

  return roadmap;
};

router.post('/', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    if (!userId || !answers)
      return res.status(400).json({ msg: 'UserId and answers required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const roadmap = generateRoadmap(user.interests, answers);
    res.json({ roadmap });
  } catch (err) {
    console.error('Roadmap error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
