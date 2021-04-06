const mongoose = require('mongoose')
const { User } = require("./users");

const CommentSchema = new mongoose.Schema({
  user: Object,
  review_id: mongoose.Schema.Types.ObjectId,
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

CommentSchema.statics.findAllByMovieId = async function (movieId) {
  const Comment = this;
  return Comment.find({ movie_id: movieId });
};

CommentSchema.statics.findAllByUserId = async function (userId, showUser) {
  const Comment = this;
  const comments = await Comment.find({ user_id: userId });

  if (showUser) {
    const user = await User.findOne({ _id: userId });
    for (let i = 0; i < comments.length; i++) {
      comments[i].user = {
        username: user.username,
        fullName: user.fullName,
        picture: user.picture
      };
    }
  }

  return comments;
};

const Comment = mongoose.model('comment', CommentSchema);

module.exports = { Comment };
