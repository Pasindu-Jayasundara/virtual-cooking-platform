const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();


// middleware
app.use(express.json());
app.use(cors());
app.use(routes);

// server
app.listen(process.env.PORT,(req,res)=>{

    try {

        // mongo db connection
        mongoose
            .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error('MongoDB connection error:', err));
        
    } catch (error) {
        console.log(error);
    }

    console.log('Server is running on http://localhost:3000');

});
