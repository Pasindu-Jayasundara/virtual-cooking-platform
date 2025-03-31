const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const trendingSchema = new schema({
    tutorialId:{
        type:objectId,
        required:true,
    }
});

module.exports = mongoose.model('Trending', trendingSchema);