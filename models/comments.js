const mongoose = require('mongoose')
const { User } = require("./users");

const CommentSchema = new mongoose.Schema({
  user: Object,
  user_id: mongoose.Schema.Types.ObjectId,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: Date
});

CommentSchema.statics.findAllByIds = async function (ids) {
  const Comment = this;
  const comments = await Comment.find({ _id: { $in: ids } });

  for (let i = 0; i < comments.length; i++) {
    const commentUser = await User.findOne({ _id: comments[i].user_id })
    comments[i].user = {
      username: commentUser.username,
      fullName: commentUser.fullName,
      picture: commentUser.picture
    };
  }

  return comments;
};

CommentSchema.statics.findAllByReviewId = async function (movieId) {
  const Review = this;
  return Review.find({ movie_id: movieId });
};

const Comment = mongoose.model('comment', CommentSchema);

module.exports = { Comment };
