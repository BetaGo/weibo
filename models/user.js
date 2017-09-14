const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
  uid: String,
  access_token: String,
  expires_in: Number,
  remind_in: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
