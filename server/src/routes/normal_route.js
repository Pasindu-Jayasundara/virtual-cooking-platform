const express = require('express');
const router = express.Router();

const Chef = require('../models/cheff');
const Trending = require('../models/Trending');
const { populate } = require('../models/User');

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

router.get('/trending',async (req,res)=>{

    try{

        const result = await Trending.find().populate({
            path: 'tutorialId',
            model: 'Tutorials',
            populate:{
                path:'chef_id',
                model:'Cheff'
            }
        });
        if (!result) {
            return res.status(404).json({ message: "No trending tutorials found" });
        }

        res.status(200).json(result);

    }catch(err){
        console.error("Error fetching trending tutorials:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

module.exports = router;