// passport-config


// function initialize(passport) {







    // Configure GoogleStrategy
    // passport.use(
    //     new GoogleStrategy(
    //         {
    //             clientID: process.env['GOOGLE_CLIENT_ID'],
    //             clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    //             callbackURL: 'http://localhost:3000/auth/google/callback',
    //         },
    //         async (accessToken, refreshToken, profile, done) => {
    //             console.log('Google Profile:', profile); // Add this line to log the profile
    //             try {
    //                 const user = await User.findOne({ googleId: profile.id });

    //                 if (user) {
    //                     return done(null, user);
    //                 } else {
    //                     const newUser = await User.create({
    //                         googleId: profile.id,
    //                         email: profile.emails ? profile.emails[0].value : '',
    //                         username: profile.name.givenName,
    //                         // Add other user properties if needed
    //                     });
    //                     return done(null, newUser);
    //                 }
    //             } catch (error) {
    //                 console.error('Error during Google authentication:', error);
    //                 return done(error);
    //             }
    //         }
    //     )
    // );



}

// module.exports = initialize;
