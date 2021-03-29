/* User Mongoose Model */
const mongoose = require('mongoose')

const User = mongoose.model('Users', {
  id: Number,
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  fullName: String,
  picture: String,
  biography: String,
  isAdmin: Boolean,
  likedMovies: [],
  followingUser: []
})
module.exports = { User }
