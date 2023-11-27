// app.js
const express = require('express')
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/routes');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const flash = require('connect-flash');
require('dotenv').config();



// MIDDLEWARE

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}));
app.use(passport.initialize());
app.use(passport.session());



// GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
},
    async (accessToken, refreshToken, profile, done) => {
        const googleId = profile.id;
        const email = profile.emails[0].value; // Assuming you want to use the first email

        try {
            const user = await User.findOrCreate({ email, googleId });
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .exec()
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email', // Specify the field for the username
    passwordField: 'password', // Specify the field for the password
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(flash());
app.use('/', routes);

///connecting application with database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Mongo DB Connected');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// =================== Shut Down Database Connection =======================

// Handle graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('Mongo DB connection closed due to application termination');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error closing MongoDB connection:', err);
            process.exit(1);
        });
});


app.listen(3000, () => {
    console.log('Listening on port 3000')
})