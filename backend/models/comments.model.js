/* Comments Mongoose Model */
const mongoose = require('mongoose')

const Comment = mongoose.model('comments', {
  name: String,
  email: String,
  user_id: mongoose.Schema.Types.ObjectId,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: Date
})
module.exports = { Comment }
