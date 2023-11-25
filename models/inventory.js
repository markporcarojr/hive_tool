const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const inventorySchema = new Schema({

    inventoryType: {
        type: String,
        required: true
    },

    inventoryAmount: {
        type: Number,
        required: true
    },

    inventoryDate: {
        type: String,
        required: false
    }

});



module.exports = mongoose.model('Inventory', inventorySchema);
