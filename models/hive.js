const mongoose = require('mongoose');
const moment = require('moment');

// Schema
const Hive = new mongoose.Schema({
    hiveNumber: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: false
    },
    hiveStrength: {
        type: String,
        required: true
    },
    hiveDate: {
        type: Date,
        required: false
    }
});

Hive.virtual('formattedDate').get(function () {
    // Format the date as MM/DD/YYYY using moment
    return moment(this.hiveDate).format('MM/DD/YYYY');
});


module.exports = mongoose.model('Hive', Hive);
