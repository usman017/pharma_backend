const mongoose = require('mongoose')
const { Schema } = mongoose

const userModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
  
})

User = mongoose.model('User', userModel)
module.exports = User

