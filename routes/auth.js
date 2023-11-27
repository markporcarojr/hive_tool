// auth.js

const passport = require('passport');

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Middleware to check if the user is authenticated with Google
// const ensureGoogleAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated() && req.user.googleId) {
//         return next();
//     }
//     res.redirect('/login'); // Redirect to the login page if not authenticated
// };




module.exports = ensureAuthenticated;


