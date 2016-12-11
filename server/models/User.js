'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var userSchema = mongoose.Schema({
  name: String,
  lastActive: { type: Date, default: Date.now },
  chats : [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
});

module.exports = mongoose.model('User', userSchema);
