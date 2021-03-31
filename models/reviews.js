/* Reviews Mongoose Model */
const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
  rating: Number,
  user_id: mongoose.Schema.Types.ObjectId,
  movie_id: mongoose.Schema.Types.ObjectId,
  review: String,
  comments: [mongoose.Schema.Types.ObjectId]
});

ReviewsSchema.statics.findOneByMovieId = async function (movieId) {
  const Review = this;
  return Review.findOne({movie_id: movieId});
};

ReviewsSchema.statics.findAllByMovieId = async function (movieId) {
  const Review = this;
  return Review.find({movie_id: movieId});
};

ReviewsSchema.statics.findOneReview = async function (movieId) {
  const Review = this;
  return Review.findOne({movie_id: movieId});
}

const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { Review };
