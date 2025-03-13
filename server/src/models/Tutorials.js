const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const reviewSchema = new schema({
    userId:{
        type:objectId,
        required:true
    },
    review:{
        type:String,
        required:true
    }
});

const tutorialSchema = new schema({

    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    related_to:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    chef_id:{
        type:objectId,
        required:true
    },
    reviews:[reviewSchema]
    
});

module.exports = mongoose.model('Tutorial', tutorialSchema);