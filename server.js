/* server.js for react-express-authentication */
"use strict";

const log = console.log;
const path = require('path')

const express = require("express");
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
// app.use(cors()) enable for production only

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
            const user = await User.findById(req.session.user);
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
            const user = await User.findById(req.session.user);
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
        req.session.user = user._id;
        res.send({ username: user.username });
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
            res.send()
        }
    });
});

// A route to register and create a session
app.post("/user/register", mongoChecker, unauthenticate, async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const newUser = await User.createUser(user);
        if (newUser) {
            req.session.user = newUser._id;
            res.send({ username: newUser.username });
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

/*********************************************************/

/*** API Routes below ************************************/

// use mongoChecker everywhere that you have/require a database connection and use authenticate everywhere you need to authenticate a user

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

// Add routes below

app.delete('api/admin/user/:id', mongoChecker, authenticateAdmin, (req, res) => {
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
