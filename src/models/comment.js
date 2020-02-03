const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const prod = Schema({
  post_id: {type: ObjectId },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  timestamp: { type: Date, default: Date.now() }
  
});

module.exports = mongoose.model('Comment', prod);