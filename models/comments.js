/* Comments Mongoose Model */
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  name: String,
  email: String,
  user_id: mongoose.Schema.Types.ObjectId,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: Date
});

CommentSchema.statics.findAllByReviewId = async function (movieId) {
  const Review = this;
  return Review.find({movie_id: movieId});
};

const Comment = mongoose.model('comment', CommentSchema);

module.exports = { Comment };
