const mongoose = require('mongoose');

const nameSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true,'please add name'],
    },
});

module.exports = mongoose.model('Name', nameSchema);