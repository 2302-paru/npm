const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true }, // HR, Business, Technical, Safety
});

module.exports = mongoose.model('Resource', ResourceSchema);
