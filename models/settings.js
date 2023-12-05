const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const settingsSchema = new Schema({

    apiaryName: {
        type: String,
    },

    userName: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    }

});

module.exports = mongoose.model('Settings', settingsSchema);
