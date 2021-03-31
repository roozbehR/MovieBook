/* Movies Mongoose Model */
const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  rated: String,
  cast: [String],
  poster: String,
  title: String,
  fullplot: String,
  countries: [],
  released: Date,
  directors: [],
  writers: [],
  awards: Object,
  year: Number,
  imdb: Object,
  tomatoes: Object,
  type: String,
  num_mflix_comments: Number
});

MovieSchema.statics.findByMovieId = async function (movie_id) {
  const Movie = this;
  const existingMovie = Movie.findOne({})
}

MovieSchema.statics.findOneRandom =  async function() {
  const Movie = this;
  return Movie.aggregate([{$sample: {size: 1}}]);
}

MovieSchema.statics.recentMovies = async function () {
  const Movie = this;
  return Movie.aggregate([{ $sort: { released: -1}}, { $limit: 6 }]);
}

MovieSchema.statics.topMovies = async function () {
  const Movie = this;
  return Movie.aggregate([{ $sort: { "tomatoes.viewer.rating": -1}}, { $limit: 5 }]);
}

const Movie = mongoose.model('movies', MovieSchema);
module.exports = { Movie }
