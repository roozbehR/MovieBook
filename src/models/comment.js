import { getRandomReview } from "./review";
import { getRandomUser } from "./user";

class Comment {
  constructor(id, review, user, text) {
    this.id = id;
    this.review = review;
    this.user = user;
    this.text = text;
  }
}

// Got movies from https://github.com/FEND16/movie-json-data/blob/master/json/movies-in-theaters.json
let Comments = [
  new Comment(
    1,
    getRandomReview(),
    getRandomUser(),
    "Blah blah a b c okay blah!"
  ),
  new Comment(2, getRandomReview(), getRandomUser(), "Totally agree!"),
  new Comment(
    3,
    getRandomReview(),
    getRandomUser(),
    "Lorem ipsum never ends, keep it up!"
  ),
  new Comment(
    4,
    getRandomReview(),
    getRandomUser(),
    "The plot twist blew my mind, I totally agree!"
  ),
  new Comment(
    5,
    getRandomReview(),
    getRandomUser(),
    "Hey, I am a big fan of this movie. I dont think its that bad!"
  ),
];

export function getRandomComment() {
  return Comments[Math.floor(Math.random() * Comments.length)];
}

export function getComment(id) {
  return Comments.filter((m) => m.id == id);
}
