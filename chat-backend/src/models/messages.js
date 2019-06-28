const mongoose = require('mongoose');

const { Schema } = mongoose;

const Messages = new Schema({
  messages: [{
    message: String,
    order: Number,
    sender: String,
    date: Date,
  }]
});

module.exports = mongoose.model('Messages', Messages);
