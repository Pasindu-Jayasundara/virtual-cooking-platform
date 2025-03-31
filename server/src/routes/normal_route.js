const express = require('express');
const router = express.Router();

const Chef = require('../models/cheff');
const Trending = require('../models/Trending');
const Tutorial = require('../models/Tutorials');

require('dotenv').config();

router.get('/top-chefs', async (req, res) => {

    try {

        const result = await Chef.find({}).sort({ soldCount: -1 }).limit(3);
        if (!result) {
            return res.status(parseInt(process.env.FAILED_STATUS)).json({ message: "No chefs found" });
        }

        res.status(parseInt(process.env.SUCCESS_STATUS)).json(result);

    } catch (err) {
        console.error("Error fetching home data:", err);
        res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "Internal Server Error" });
    }

});

router.get('/trending', async (req, res) => {

    try {

        const result = await Trending.find().populate({
            path: 'tutorialId',
            model: Tutorial,
            populate:{
                path:'chefId',
                model:Chef
            }
        });
        if (!result) {
            return res.status(parseInt(process.env.FAILED_STATUS)).json({ message: "No trending tutorials found" });
        }

        res.status(parseInt(process.env.SUCCESS_STATUS)).json(result);

    } catch (err) {
        console.error("Error fetching trending tutorials:", err);
        res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "Internal Server Error" });
    }

});

router.get('/chefs', async (req, res) => {

    try {

        const result = await Chef.find({});
        if (!result) {
            return res.status(parseInt(process.env.FAILED_STATUS)).json({ message: "No chefs found" });
        }

        res.status(parseInt(process.env.SUCCESS_STATUS)).json(result);

    } catch (err) {
        console.error("Error fetching chefs:", err);
        res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "Internal Server Error" });
    }

});

module.exports = router;