const express = require('express');
const router = express.Router();

const Chef = require('../models/cheff');

router.get('/home',(req,res)=>{
    res.send('Home route');
});

router.get('/about',(req,res)=>{
    res.send('About route');
});

router.get('/chefs',async (req,res)=>{
    
    try {
        const resultJson = await Chef.find({});
        res.json(resultJson);
    } catch (error) {
        console.error("Error fetching chefs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
});

module.exports = router;