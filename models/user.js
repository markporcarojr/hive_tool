// user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    apiaryName: {
        type: String,
    },
    userName: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows null values and enforces unique constraint
    }

},
    {
        timestamps: true
    }


);

// Apply the passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

// Implement findOrCreate method
User.findOrCreate = async function (condition) {
    const { email, googleId } = condition;

    try {
        // Check if the user already exists by email
        let user = await User.findOne({ email }).exec();

        if (user) {
            // User already exists, return the existing user
            return user;
        } else {
            // User not found, create a new user with email and googleId
            user = await User.create({ email, googleId });
            return user;
        }
    } catch (error) {
        // Handle specific errors or rethrow for higher-level handling
        throw error;
    }
};


module.exports = User;
