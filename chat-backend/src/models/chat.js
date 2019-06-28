const mongoose = require('mongoose');

const { Schema } = mongoose;

const Chat = new Schema({
  title: String,
  user: String,
  userIds: [String],
  messages: [{
    message: String,
    order: Number,
    sender: String,
    date: Date,
  }]
  
});

module.exports = mongoose.model('Chat', Chat);