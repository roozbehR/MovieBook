/* Comments Mongoose Model */
const mongoose = require('mongoose')

const CommentSchema = new mongooseSchema({
  name: String,
  email: String,
  user_id: mongoose.Schema.Types.ObjectId,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: Date
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = { Comment };
