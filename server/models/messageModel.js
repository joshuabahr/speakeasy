const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  event_id: {
    type: Number,
    unique: true,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;