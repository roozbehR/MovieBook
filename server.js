/* server.js for react-express-authentication */
"use strict";

const log = console.log;
const path = require('path')

const express = require("express");
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // enable for development only

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Comment } = require("./models/comments");
const { Movie } = require("./models/movies");
const { Review } = require("./models/reviews");
const { User } = require("./models/users");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)


// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}

// Middleware for user authentication
const authenticateAdmin = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user);
            if (user && user.isAdmin) {
                req.user = user;
                next();
            } else {
                res.status(401).send("Unauthorized");
            }
        } catch (error) {
            log(error);
            res.status(401).send("Unauthorized");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
}

// Middleware for user authentication
const authenticate = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user.id);
            if (!user) {
                res.status(401).send("Unauthorized")
            } else {
                req.user = user;
                next();
            }
        } catch (error) {
            res.status(401).send("Unauthorized")
        }
    } else {
        res.status(401).send("Unauthorized")
    }
}

// Middleware for have no users authenticated
const unauthenticate = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user.id);
            if (user)
                res.status(401).send("Unauthorized")
            else
                next();
        } catch (error) {
            res.status(401).send("Unauthorized")
        }
    } else {
        next();
    }
}

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://team02:fv5Num8l3vLB59m7@cluster0.pooiy.mongodb.net/MOVIEBOOK?retryWrites=true&w=majority'
        })
    })
);

// A route to login and create a session
app.post("/user/login", mongoChecker, unauthenticate, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findByUsernamePassword(username, password);
        const returnedUser = { id: user._id, username: user.username };
        req.session.user = returnedUser;
        res.send(returnedUser);
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request');
        }
    }
});

// A route to logout a user
app.get("/user/logout", mongoChecker, authenticate, (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(true)
        }
    });
});

// A route to register and create a session
app.post("/user/register", mongoChecker, unauthenticate, async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        fullName: null,
        picture: null,
        biography: null,
        isAdmin: false,
        likedMovies: [],
        followingUser: [],
        usersIfollow: []
    });

    try {
        const newUser = await User.createUser(user);
        if (newUser) {
            const returnedUser = { id: newUser._id, username: newUser.username };
            req.session.user = returnedUser;
            res.send(returnedUser);
        } else {
            res.send({ exists: true });
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request');
        }
    }
});

// A route to check if a user is logged in on the session
app.get("/user/check-session", (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/

// use mongoChecker everywhere that you have/require a database connection and use authenticate everywhere you need to authenticate a user

// Get user by username
app.get('/api/user/:username?', mongoChecker, authenticate, async (req, res) => {
    const username = req.params.username;
    try {
        const currentUserId = req.session.user.id;
        let user = null;
        if (username != "undefined") {
            user = await User.findByUsername(username);
        } else {
            user = await User.findOne({ _id: currentUserId });
        }

        if (user)
            res.send({
                username: user.username,
                fullName: user.fullName,
                biography: user.biography,
                picture: user.picture,
                isFollowing: user.followingUser.includes(currentUserId)
            });
        else
            res.status(404).send("User not found");
    } catch (error) {
        log(error)
        res.status(500).send("Internal Server Error");
    }
})

// Follow/Unfollow user by their id
app.put('/api/user/follow/:username', mongoChecker, authenticate, async (req, res) => {
    const username = req.params.username;

    try {
        const currentUserId = req.session.user.id;

        if (req.session.user.username == username) {
            res.status(406).send("Users cannot follow themselves");
            return;
        }

        const userToFollow = await User.findOne({ username: username });
        if (userToFollow.followingUser.includes(currentUserId)) {
            await User.findOneAndUpdate({ username: username }, { $pull: { followingUser: currentUserId } }, { new: true, useFindAndModify: false });
            await User.findOneAndUpdate({ _id: currentUserId }, { $pull: { usersIfollow: userToFollow._id } }, { new: true, useFindAndModify: false });
            res.send(false);
        } else {
            await User.findOneAndUpdate({ username: username }, { $push: { followingUser: currentUserId } }, { new: true, useFindAndModify: false });
            await User.findOneAndUpdate({ _id: currentUserId }, { $push: { usersIfollow: userToFollow._id } }, { new: true, useFindAndModify: false });
            res.send(true);
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');
        }
    }
});

app.patch('/api/admin/user/:id', mongoChecker, authenticateAdmin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    const fieldsToUpdate = {};
    req.body.map((change) => {
        const propertyToChange = change.path.substr(1);
        fieldsToUpdate[propertyToChange] = change.value;
    })

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { $set: fieldsToUpdate }, { new: true, useFindAndModify: false })
        if (!user) {
            res.status(404).send('Resource not found');
        } else {
            res.send(user);
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');
        }
    }
})

//helper function for fetching comments corresponding to review id
const fetchCommentsByReviewId = async comment_ids => {
    let review_comments = [];

    await Promise.all(comment_ids.map(async (comment_id) => {
        const comment_info = await Comment.findById(comment_id);
        review_comments.push(comment_info);
    }));

    return review_comments;
}

app.get('/api/movie/:id', mongoChecker, async (req, res) => {
    const movie_id = req.params.id;

    if (!ObjectID.isValid(movie_id)) {
        res.status(404).send("the requested id is not valid");
        return;
    }

    try {
        const movie = await Movie.findById(movie_id);
        const reviews = await Review.findAllByMovieId(movie_id);

        let review_comments_dict = {};

        await Promise.all(reviews.map(async (review_info) => {
            review_comments_dict[review_info] = fetchCommentsByReviewId(review_info._id);
        }))

        res.send({ movie: movie, reviews: reviews, comments: review_comments_dict });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

//get 1 random movie and fetch 1 corresponding random review
app.get('/api/movie/random/movie', mongoChecker, async (req, res) => {
    try {
        const fetched_movie_data = await Movie.findOneRandom();
        const movie_id = fetched_movie_data[0]._id;
        const fetched_single_review = await Review.findOneReview(movie_id);

        res.send({ movie: fetched_movie_data, review: fetched_single_review });
    } catch (error) {
        log(error);
        res.status(500).send(error);
    }
});

// get 1 random review by movie ID
app.get('/api/movie/:id/review/random', mongoChecker, async (req, res) => {
    const movie_id = req.params.id;

    if (!ObjectID.isValid(movie_id)) {
        res.status(404).send("the requested movie id is invalid");
        return;
    }

    try {
        const fetched_review_data = await Review.findOneByMovieId(movie_id);
        res.send({ movie: movie_id, review: fetched_review_data });
    } catch (error) {
        log(error);
        res.status(500).send(error);
    }
});

app.get('/api/movie/new/movies', mongoChecker, async (req, res) => {

    try {
        const movies = await Movie.recentMovies();
        res.send(movies);
    } catch (error) {
        res.status(500).send("Internal Server Error Has Occured");
    }
})

app.get('/api/movie/top/movies', mongoChecker, async (req, res) => {

    try {
        const movies = await Movie.topMovies();
        res.send(movies);
    } catch (error) {
        log(error);
    }
})

/// Route for adding review to a particular movie.
/*
Request body expects:
{
    "rating" Number <rating of the movie>
    "user_id" ObjectId <unique user id>
    "review": string <review text>
}
*/
app.post('/api/movie/:id/review', mongoChecker, async (req, res) => {
    const movie_id = req.params.id;

    if (!ObjectID.isValid(movie_id)) {
        res.status(404).send("the requested movie id is invalid");
        return;
    }

    log(req.body);

    const requested_review = new Review({
        rating: req.body.rating,
        user_id: req.body.user_id,
        movie_id: movie_id,
        review: req.body.review,
        comments: [],
    });

    try {
        const output = await requested_review.save();
        res.send(output);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// get comments based on review id
app.get('/api/review/:id/comments', mongoChecker, async (req, res) => {
    const review_id = req.params.id;

    if (!ObjectID.isValid(review_id)) {
        res.status(404).send("the requested review id is invalid");
        return;
    }

    try {
        const review_info = await Review.findById(review_id);
        const comment_ids = review_info.comments;
        const review_comments = await fetchCommentsByReviewId(comment_ids);
        res.send({ review: review_id, comment_ids: review_comments });
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

// get reviews based on following users
app.get('/api/feed', mongoChecker, authenticate, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.session.user.id });
        const reviews = await Review.findAllByManyUserIds(currentUser.usersIfollow);
        res.send(reviews);
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/api/admin/user/:id', mongoChecker, authenticateAdmin, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    User.findByIdAndRemove(id).then((user) => {
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user);
        }
    })
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')
        })

})


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/dashboard"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
