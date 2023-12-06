// user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows null values and enforces unique constraint
    },
    apiaryName: {
        type: String,
    },
    userName: {
        type: String,
    }


});

// Apply the passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

// Implement findOrCreate method
User.findOrCreate = async function (condition) {
    const { email, googleId } = condition;

    try {
        let user = await User.findOne({ email }).exec();

        if (user) {
            return user;
        } else {
            // If user not found, create a new one with email and googleId
            user = await User.create({ email, googleId });
            return user;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = User;
