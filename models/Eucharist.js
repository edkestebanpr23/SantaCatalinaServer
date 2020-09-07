const mongoose = require('mongoose');

const EucharistSchema = mongoose.Schema({
    spaceav: {
        type: Number,
        require: true
    },
    people: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        require: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    finalized: {
        type: Boolean,
        require: true
    },
    register: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: String,
        require: true
    },
    description: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Eucharist', EucharistSchema);