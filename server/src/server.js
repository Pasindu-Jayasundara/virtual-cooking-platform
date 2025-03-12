const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const auth_routes = require('./routes/auth_route');
const normal_routes = require('./routes/normal_route');


dotenv.config();
const app = express();


// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", auth_routes);
app.use("/api", normal_routes);

// server
app.listen(process.env.PORT, (req, res) => {

    // mongo db connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));


    console.log('Server is running on http://localhost:3000');

});
