const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    register: {
        type: Date,
        default: Date.now()
    },
    telephone: {
        type: String,
        require: true,
        trim: true,
    },
    age: {
        type: Number,
        require: true,
    },
    document: {
        type: String,
        unique: true,
        require: true
    },
    nui: {
        type: String,
        unique: true,
        require: true
    },
});

module.exports = mongoose.model('Client', ClientSchema);