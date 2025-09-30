// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // YouTube embed URL
  interest: { type: String, required: true }, // e.g., "HR", "Technical"
});

module.exports = mongoose.model('Video', videoSchema);
