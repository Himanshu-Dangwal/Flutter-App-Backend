const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const dataSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
  },
  description: {
    type: String,
    required: true,
    min: 3,
  },
  tag: {
    type: [String],
    default: ['General'], // Default value as an array with one element
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // User who created the data
    ref: 'User',
  },
  username : String,
},{ timestamps: true });

module.exports = mongoose.model('Data', dataSchema);

