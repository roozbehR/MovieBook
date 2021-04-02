const { User } = require("./users");
const { Movie } = require("./movies");
const { Comment } = require("./comments");

/* Reviews Mongoose Model */
const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
  rating: Number,
  user_id: mongoose.Schema.Types.ObjectId,
  user: Object,
  movie_id: mongoose.Schema.Types.ObjectId,
  movie: Object,
  review: String,
  comments: [mongoose.Schema.Types.ObjectId],
  comments_data: [Object],
  date: Date
});

ReviewsSchema.statics.findOneByMovieId = async function (movieId) {
  const Review = this;
  return Review.findOne({ movie_id: movieId });
};

ReviewsSchema.statics.findAllByMovieId = async function (movieId) {
  const Review = this;
  return Review.find({ movie_id: movieId });
};

ReviewsSchema.statics.findOneReview = async function (movieId) {
  const Review = this;
  return Review.findOne({ movie_id: movieId });
}

ReviewsSchema.statics.findAllByManyUserIds = async function (userIds) {
  const Review = this;
  const reviews = await Review.find({ user_id: { $in: userIds } });

  for (let i = 0; i < reviews.length; i++) {
    const user = await User.findOne({ _id: reviews[i].user_id });
    reviews[i].user = {
      username: user.username,
      fullName: user.fullName,
      picture: user.picture
    };

    const movie = await Movie.findByMovieId(reviews[i].movie_id);
    reviews[i].movie = {
      id: movie.id,
      poster: movie.poster,
      title: movie.title
    };

    const comments = await Comment.findAllByIds(reviews[i].comments);
    reviews[i].comments_data = comments.map(c => {
      return {
        user: c.user,
        text: c.text,
        date: c.date
      }
    });;
  }
  return reviews;
}

const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { Review };
