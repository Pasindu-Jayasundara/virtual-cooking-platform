const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const CheffSchema = new Schema({ 
    // id: {
    //     type: ObjectId,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },  
    town: {
        type: String,
        required: true
    },
    numberOfTutorials: {
        type: Number,
        required: true
    }, 
    experience: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Chefs', CheffSchema);