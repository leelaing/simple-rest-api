
const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  subscribedToChannel: {
    type: String,
    required: false
  },
  subscribeDate: {
    type: Date,
    required: false,
    default: Date.now
  }
})

module.exports = mongoose.model('Sample', sampleSchema)