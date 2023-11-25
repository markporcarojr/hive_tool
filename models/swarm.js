const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const swarmSchema = new Schema({
    swarmNumber: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    swarmDate: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Swarm', swarmSchema);
