const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

// {
//     id: 1,
//     name: "Maria Sanchez",
//     town: "New York City, USA",
//     numberOfTutorials: 5,
//     experience: 15,
//     desc:"Award-winning chef specializing in Latin American cuisine, known for her vibrant flavors and innovative cooking techniques",
//     image: "../resources/chef/1.jpg",
// },


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