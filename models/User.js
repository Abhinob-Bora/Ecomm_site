const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Make sure 'select' is set to 'false'
  type: { type: String, required: true },
  // Other fields...
});

const User = mongoose.model('User', userSchema);

module.exports = User;
