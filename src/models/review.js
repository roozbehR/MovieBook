import { getRandomUser } from "./user";
import { getRandomMovie } from "./movie";

class Review {
  constructor(id, user, movie, rating, text) {
    this.id = id;
    this.user = user;
    this.movie = movie;
    this.rating = rating;
    this.text = text;
    this.comments = [];
  }
}

// Got movies from https://github.com/FEND16/movie-json-data/blob/master/json/movies-in-theaters.json
let Reviews = [
  new Review(
    1,
    getRandomUser(),
    getRandomMovie(),
    4.2,
    "This movie was amazing, the cast has impressive active skills!"
  ),
  new Review(
    2,
    getRandomUser(),
    getRandomMovie(),
    1.6,
    "I dislike the plot about x and y and z"
  ),
  new Review(
    3,
    getRandomUser(),
    getRandomMovie(),
    3.4,
    "Incredibly normal movie, I dont understand what the hype is for."
  ),
  new Review(
    4,
    getRandomUser(),
    getRandomMovie(),
    5.0,
    "Best movie I have ever watched! I would recommend it to anyone!"
  ),
  new Review(
    5,
    getRandomUser(),
    getRandomMovie(),
    3.8,
    "Lorem ipsum is a very interesting word that I still do not understand"
  ),
];

export function getRandomReview() {
  return Reviews[Math.floor(Math.random() * Reviews.length)];
}

export function getReview(id) {
  return Reviews.filter((m) => m.id == id);
}
