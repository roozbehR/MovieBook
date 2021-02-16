import { getMovie } from "./movie";

class User {
  constructor(id, username, password, fullName, picture, biography, isAdmin) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.picture = picture;
    this.biography = biography;
    this.isAdmin = isAdmin;
    this.likedMovies = [];
    this.followingUsers = [];
  }

  likeMovie(movieId) {
    const movie = getMovie(movieId);
    this.likedMovies.push(movie);
  }

  followUser(userId) {
    const user = getUser(userId);
    this.followingUsers.push(user);
  }
}

// Got movies from https://github.com/FEND16/movie-json-data/blob/master/json/movies-in-theaters.json
let Users = [
  new User(
    1,
    "basselashi",
    "test123",
    "Bassel Ashi",
    "https://randomuser.me/api/portraits/men/27.jpg",
    "A movie enthusiast by nature, I love horror movies!",
    false
  ),
  new User(
    2,
    "mamrkhan",
    "test123",
    "Mohammad Amr Khan",
    "https://randomuser.me/api/portraits/men/28.jpg",
    "Lorem ipsum whatever",
    true
  ),
  new User(
    3,
    "roozbehy",
    "test123",
    "Roozbeh Yadollahi",
    "https://randomuser.me/api/portraits/men/29.jpg",
    "Another lorem ipsum about my bio",
    true
  ),
  new User(
    4,
    "shisein",
    "test123",
    "Shisei Naka",
    "https://randomuser.me/api/portraits/men/30.jpg",
    "Welcome to my profile xyz",
    true
  ),
  new User(
    5,
    "jdoe",
    "test123",
    "Jane Doe",
    "https://randomuser.me/api/portraits/women/57.jpg",
    "I dont know but sure why not",
    false
  ),
];

export function getRandomUser() {
  return Users[Math.floor(Math.random() * Users.length)];
}

export function getUser(id) {
  return Users.filter((m) => m.id == id);
}
