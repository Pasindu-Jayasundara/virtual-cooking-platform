const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT,(req,res)=>{

    try {

        mongoose
            .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error('MongoDB connection error:', err));
        
    } catch (error) {
        console.log(error);
    }

    console.log('Server is running on http://localhost:3000');

});
