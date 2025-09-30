const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true }, // e.g. 'hr', 'tech', 'design'
});

module.exports = mongoose.model('Resource', ResourceSchema);
