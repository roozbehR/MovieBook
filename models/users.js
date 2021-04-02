'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    id: Number,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        minlength: 6
    },
    email: {
        type: String,
        unique: true,
    },
    fullName: String,
    picture: String,
    biography: String,
    isAdmin: Boolean,
    likedMovies: [],
    followingUser: []
});

/********************************* User Middleware Below ************************************/
// Hash password before saving it
UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
})

/********************************* User Statics Below ************************************/
// Find user given username and password
UserSchema.statics.findByUsernamePassword = async function (username, password) {
    const User = this;

    const user = await User.findOne({ username: username });
    if (!user)
        return Promise.reject(false);

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                resolve(user);
            } else {
                reject();
            }
        });
    })
}

// Find user given username
UserSchema.statics.findByUsername = async function (username) {
    const User = this;
    const existingUser = User.findOne({ username: username });
    return existingUser
}

// Create user given username and password
UserSchema.statics.createUser = async function (user) {
    const User = this;
    try {
        const existingUser = await User.findByUsername(user.username);
        if (existingUser)
            return Promise.resolve(false);
        return user.save();
    } catch (error) {
        return Promise.reject(error);
    }
}

UserSchema.statics.search = async function (user_name) {
    const User = this;
    return User.find({ fullName: { $regex: user_name, $options: 'i' }});
  }

const User = mongoose.model('User', UserSchema)
module.exports = { User };
