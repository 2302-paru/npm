const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },
  interests: { type: [String], default: [] }, // only for mentees
});

module.exports = mongoose.model('User', UserSchema);
