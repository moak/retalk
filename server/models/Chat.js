'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var chatSchema = mongoose.Schema({
  _user1 : { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
  _user2 : { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages : [{
    _author : { type:mongoose.Schema.Types.ObjectId },
    content: String,
    timeSent: { type: Date, default: Date.now },
  }]
});

module.exports = mongoose.model('Message', chatSchema);
