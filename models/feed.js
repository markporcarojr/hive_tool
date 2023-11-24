const mongoose = require('mongoose');
const moment = require('moment');
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
    }
});



module.exports = mongoose.model('Feed', feedSchema);
