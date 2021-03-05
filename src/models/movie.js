class Movie {
  constructor(id, title, year, description, trailerLink, rating, image) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.description = description;
    this.trailerLink = trailerLink;
    this.rating = rating;
    this.image = image;
  }
}

// Got movies from https://github.com/FEND16/movie-json-data/blob/master/json/movies-in-theaters.json
let Movies = [
  new Movie(
    1,
    "Black Panther",
    2018,
    "After the events of Captain America: Civil War, King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war.",
    "https://www.youtube.com/watch?v=xjDjIWPwcPU",
    4.5,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg"
  ),
  new Movie(
    2,
    "Aiyaary",
    2018,
    "Two officers with patriotic hearts suddenly have a fallout. The mentor, Colonel Abhay Singh has complete faith in the country's system while prot\u00e9g\u00e9 Major Jai Bakshi thinks differently due to a recent stint in surveillance.",
    "https://www.youtube.com/watch?v=KcWXKmnZZVo",
    3.9,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1NTk0NTc1OV5BMl5BanBnXkFtZTgwNTMwMTE4NDM@._V1_SY500_CR0,0,281,500_AL_.jpg"
  ),
  new Movie(
    3,
    "The Post",
    2017,
    "When American military analyst, Daniel Ellsberg, realizes to his disgust the depths of the US government's deceptions about the futility of the Vietnam War, he takes action by copying top-secret documents that would become the Pentagon Papers. Later, Washington Post owner, Kay Graham, is still adjusting to taking over her late husband's business when editor Ben Bradlee discovers the New York Times has scooped them with an explosive expose on those papers. Determined to compete, Post reporters find Ellsberg himself and a complete copy of those papers. However, the Post's plans to publish their findings are put in jeopardy with a Federal restraining order that could get them all indicted for Contempt. Now, Kay Graham must decide whether to back down for the safety of her paper or publish and fight for the Freedom of the Press. In doing so, Graham and her staff join a fight that would have America's democratic ideals in the balance.",
    "https://www.youtube.com/watch?v=KcWXKmnZZVo",
    4.0,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyMjEwOTIwNV5BMl5BanBnXkFtZTgwOTkzNTMxNDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
  ),
  new Movie(
    4,
    "Winchester - House of Ghosts",
    2018,
    "Inspired by true events. On an isolated stretch of land 50 miles outside of San Francisco sits the most haunted house in the world. Built by Sarah Winchester, (Academy Award\u00ae-winner Helen Mirren) heiress to the Winchester fortune, it is a house that knows no end. Constructed in an incessant twenty-four hour a day, seven day a week mania for decades, it stands seven stories tall and contains hundreds of rooms. To the outsider it looks like a monstrous monument to a disturbed woman's madness. But Sarah is not building for herself, for her niece (Sarah Snook) or for the brilliant Doctor Eric Price (Jason Clarke) whom she has summoned to the house. She is building a prison, an asylum for hundreds of vengeful ghosts, and the most terrifying among them have a score to settle with the Winchesters.",
    "https://www.youtube.com/watch?v=0Juc2cL26mg&ab_channel=CBSFilms",
    4.5,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMjI2OWE5OGItMTE4Yi00ZmIzLThjZDctNTU1OTMxMTc3Yjg4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SY500_CR0,0,315,500_AL_.jpg"
  ),
  new Movie(
    5,
    "Maze Runner: The Death Cure",
    2018,
    "In the epic finale to The Maze Runner Saga, Thomas leads his group of escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary last city, a WCKD controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get the answers to the questions the Gladers have been asking since they first arrived in the maze. Will Thomas and the crew make it out alive? Or will Ava Paige get her way?",
    "https://www.youtube.com/watch?v=4-BTxXm8KSg&ab_channel=20thCenturyStudios",
    2.1,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYyNzk3MDc2NF5BMl5BanBnXkFtZTgwMDk3OTM1NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
  ),
  new Movie(
    6,
    "Jumanji: Welcome to the Jungle",
    2017,
    "In a brand new Jumanji adventure, four high school kids discover an old video game console and are drawn into the game's jungle setting, literally becoming the adult avatars they chose. What they discover is that you don't just play Jumanji - you must survive it. To beat the game and return to the real world, they'll have to go on the most dangerous adventure of their lives, discover what Alan Parrish left 20 years ago, and change the way they think about themselves - or they'll be stuck in the game forever, to be played by others without break.",
    "https://www.youtube.com/watch?v=2QKg5SZ_35I",
    4.8,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkyNDQ1MDc5OV5BMl5BanBnXkFtZTgwOTcyNzI2MzI@._V1_SY400_SX270_AL_.jpg"
  ),
  new Movie(
    7,
    "Pelle Kanin",
    2018,
    "Feature adaptation of Beatrix Potter's classic tale of a rebellious rabbit trying to sneak into a farmer's vegetable garden.",
    "https://www.youtube.com/watch?v=KcWXKmnZZVo",
    1.2,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk5NzI0ODUwN15BMl5BanBnXkFtZTgwOTIxNjA0NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
  ),
  new Movie(
    8,
    "Western",
    2017,
    "A group of German construction workers start a tough job at a remote site in the Bulgarian countryside. The foreign land awakens the men's sense of adventure, but they are also confronted with their own prejudice and mistrust due to the language barrier and cultural differences. The stage is quickly set for a showdown when men begin to compete for recognition and favor from the local villagers.",
    "https://www.youtube.com/watch?v=p8f8zHDwv_c",
    3.1,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BZDRkZGUxZmEtZDdiZC00NGJmLWFiODAtN2RiMzY3ODhjNTNmXkEyXkFqcGdeQXVyMTg5MDEyNw@@._V1_SY500_CR0,0,341,500_AL_.jpg"
  ),
  new Movie(
    9,
    "Mind Game",
    2004,
    "The film follows Nishi, a loser who has a crush on his childhood girlfriend. After an encounter with the Japanese mafia, the film follows Nishi as he journeys to heaven and back, and ends up trapped in an even more unlikely place. Nishi (and some friends) attempt to break out of their trap, and discover what it truly means to be alive along the way. This is a mind-bending trip that uses some of the most innovative animation ever created.",
    "https://www.youtube.com/watch?v=2fmmCsyK1dY",
    3.0,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BNzFlMDI1ZjctMzgzYy00YmVkLTlmMTMtNDZmZmVmMzk3MzNhXkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SY500_CR0,0,381,500_AL_.jpg"
  ),
  new Movie(
    10,
    "Oh Lucy!",
    2017,
    "The drama-comedy tells the story of Setsuko Kawashima (Terajima), a lonely, chain-smoking office lady in Tokyo who is past her prime. After deciding to take an English class, she discovers a new identity in her American alter ego, 'Lucy,' and falls for her instructor, John (Hartnett). When John suddenly disappears, Setsuko earnestly sets out on a quest to find him, eventually leading her to the outskirts of Southern California.",
    "https://www.youtube.com/watch?v=U_fuaIMeJTI",
    4.6,
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUzMjcwMDExOV5BMl5BanBnXkFtZTgwMjU4Njk2NDM@._V1_SY377_CR0,0,254,377_AL_.jpg"
  ),
];

export function getRandomMovie() {
  return Movies[Math.floor(Math.random() * Movies.length)];
}

export function getMovie(id) {
  return Movies.filter((m) => m.id == id);
}

export function getAllMovies() {
  return Movies;
}
