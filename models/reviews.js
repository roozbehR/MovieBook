/* Reviews Mongoose Model */
const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
  rating: Number,
  user_id: mongoose.Schema.Types.ObjectId,
  movie_id: mongoose.Schema.Types.ObjectId,
  review: String,
  comments: [mongoose.Schema.Types.ObjectId]
});

const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { Review };
