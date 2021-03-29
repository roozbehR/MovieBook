/* Movies Mongoose Model */
const mongoose = require('mongoose')

const Movie = mongoose.model('movies', {
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
})
module.exports = { Movie }
