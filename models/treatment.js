const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// Schema
const treatmentSchema = new Schema({
    treatment: {
        type: String,
        required: true
    },

    treatmentDate: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Treatment', treatmentSchema);
