const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// Schema
const harvestSchema = new Schema({
    harvestType: {
        type: String,
        required: true
    },

    harvestAmount: {
        type: Number,
        required: true
    },

    harvestDate: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Harvest', harvestSchema);
