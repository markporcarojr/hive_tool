const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const hiveSchema = new Schema({
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
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    }
});



module.exports = mongoose.model('Hive', hiveSchema);
