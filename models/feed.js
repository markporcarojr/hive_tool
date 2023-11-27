const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const feedSchema = new Schema({
    feeding: {
        type: String,
        required: true
    },

    feedDate: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    }
});



module.exports = mongoose.model('Feed', feedSchema);
