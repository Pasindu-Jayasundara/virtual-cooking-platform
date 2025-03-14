const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/register',(req, res)=>{
    res.send('Register route');
});

router.post('/login',(req, res)=>{
    res.send('Login route');
});

router.post('/users',async (req, res)=>{
    
    try {

        const response = await User.find({});
        res.send(response);
        
    } catch (error) {

        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
    
});

module.exports = router;