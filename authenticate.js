const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/user")
require('dotenv').config();


passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // Register User Here

        // Use profile.id for googleId
        User.findOrCreate({ email: profile.email, googleId: profile.id })
            .then(user => {
                // User created or retrieved successfully
                return cb(null, user);
            })
            .catch(error => {
                if (error.code === 11000) { // Check for duplicate key error code
                    console.error("Duplicate user with Google ID:", profile.id);
                    // Handle duplicate user scenario (e.g., redirect to login page)
                    return cb(new Error("Duplicate user detected"), null);
                } else {
                    console.error("Error creating user:", error);
                    // Handle other errors (e.g., database connection issues)
                    return cb(error, null);
                }
            }));

module.exports = passport;