const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isChef: {
        type: Boolean,
        required: true
    },
    purchased_tutorials: {
        type: Array,
        required: true
    },
    payment_history: {
        type: Array,
        required: true
    },
    recently_accessed: {
        type: Array,
        required: true
    },
    my_tutorials: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);