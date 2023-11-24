const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// Schema
const Inspection = new Schema({
    hiveNumber: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: false
    },
    hiveStrength: {
        type: Number,
        required: true
    },
    hiveDate: {
        type: String,
        required: false
    }
});



module.exports = mongoose.model('Inspection', Inspection);
