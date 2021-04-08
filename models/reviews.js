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

// Find review by its own id
ReviewsSchema.statics.findOneById = async function (id, showUser, showMovie) {
  const Review = this;
  const review = await Review.findOne({ _id: id });

  if (showUser) {
    const user = await User.findOne({ _id: review.user_id });
    review.user = {
      username: user.username,
      fullName: user.fullName,
      picture: user.picture
    };
  }

  if (showMovie) {
    const movie = await Movie.findByMovieId(review.movie_id);
    review.movie = {
      id: movie.id,
      poster: movie.poster,
      title: movie.title
    };
  }

  return review;
}

ReviewsSchema.statics.findOneByMovieId = async function (movieId) {
  const Review = this;
  return Review.findOne({ movie_id: movieId });
};

ReviewsSchema.statics.findAllByMovieId = async function (movieId) {
  const Review = this;
  const reviews =  await Review.find({ movie_id: movieId });
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
      });
  }
  return reviews
};

ReviewsSchema.statics.findOneReview = async function (movieId) {
  const Review = this;
  return Review.findOne({ movie_id: movieId });
}

ReviewsSchema.statics.findAllByUserId = async function (userId, showComments) {
  return this.findAllByManyUserIds([userId], showComments);
}

ReviewsSchema.statics.findAllByManyUserIds = async function (userIds, showComments = true) {
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

    if (showComments) {
      const comments = await Comment.findAllByIds(reviews[i].comments);
      reviews[i].comments_data = comments.map(c => {
        return {
          user: c.user,
          text: c.text,
          date: c.date
        }
      });
    }
  }
  return reviews;
}

// finds all reviews that have a comment by user id and only displayed the comments from the user
ReviewsSchema.statics.findAllWithCommentsFromUserId = async function (userId) {
  const Review = this;
  const comments = await Comment.findAllByUserId(userId, true)
  const reviews = [];

  for (let i = 0; i < comments.length; i++) {
    const existingReview = reviews.filter(r => r._id.equals(comments[i].review_id));
    if (existingReview.length > 0) {
      existingReview[0].comments_data.push(comments[i]);
    } else {
      const review = await Review.findOneById(comments[i].review_id, true, true);
      review.comments_data = [comments[i]];
      reviews.push(review);
    }
  }
  return reviews;
}

// finds all reviews with rating greater than or equal to RATING and user_id
ReviewsSchema.statics.findAllWithGreaterRatingByUserId = async function (user_id, rating) {
  const Review = this;
  const reviews = await Review.find({ user_id: user_id, rating: { $gte: rating } });
  return reviews;
}

const Review = mongoose.model('Review', ReviewsSchema);

module.exports = { Review };
