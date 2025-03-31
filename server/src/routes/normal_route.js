const express = require('express');
const router = express.Router();

const Chef = require('../models/cheff');

router.get('/home',async(req,res)=>{
    
    await Chef.find
    
});

router.get('/about',(req,res)=>{
    res.send('About route');
});

router.get('/top-chefs',async (req,res)=>{
    
    try {
        const resultJson = await Chef.find().sort({soldCount:-1}).limit(3);
        if (!resultJson) {
            return res.status(404).json({ message: "No chefs found" });
        }

        res.status(200).json(resultJson);
        
    } catch (error) {
        console.error("Error fetching chefs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
});

module.exports = router;