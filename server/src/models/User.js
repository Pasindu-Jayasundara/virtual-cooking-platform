const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const cartSchema = new schema({
    tutorialId:{
        type:objectId,
        required:true
    }
});

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isChef: {
        type: Boolean,
        required: true
    },
    purchasedTutorials: {
        type: Array,
        required: true
    },
    paymentHistory: {
        type: Array,
        required: true
    },
    recentlyAccessed: {
        type: Array,
        required: true
    },
    myTutorials: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cart:[cartSchema]
});

module.exports = mongoose.model('User', userSchema);