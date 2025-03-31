const express = require('express');
const router = express.Router();

const Chef = require('../models/cheff');
const Trending = require('../models/Trending');

require('dotenv').config();

router.get('/home', async (req, res) => {

    try {

        const result = await Chef.find({}).sort({ soldCount: -1 }).limit(3);
        if (!result) {
            return res.status(process.env.FAILED_STATUS).json({ message: "No chefs found" });
        }

        res.status(parseInt(process.env.SUCCESS_STATUS)).json(result);

    } catch (err) {
        console.error("Error fetching home data:", err);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });
    }

});

router.get('/top-chefs', async (req, res) => {

    try {
        const resultJson = await Chef.find().sort({ soldCount: -1 }).limit(3);
        if (!resultJson) {
            return res.status(process.env.FAILED_STATUS).json({ message: "No chefs found" });
        }

        res.status(process.env.SUCCESS_STATUS).json(resultJson);

    } catch (error) {
        console.error("Error fetching chefs:", error);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });
    }

});

router.get('/trending', async (req, res) => {

    try {

        const result = await Trending.find().populate({
            path: 'tutorialId',
            model: 'Tutorials',
            populate: {
                path: 'chef_id',
                model: 'Cheff'
            }
        });
        if (!result) {
            return res.status(process.env.FAILED_STATUS).json({ message: "No trending tutorials found" });
        }

        res.status(process.env.SUCCESS_STATUS).json(result);

    } catch (err) {
        console.error("Error fetching trending tutorials:", err);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });
    }

});

router.get('/cheffs', async (req, res) => {

    try {

        const result = await Chef.find({});
        if (!result) {
            return res.status(process.env.FAILED_STATUS).json({ message: "No chefs found" });
        }

        res.status(process.env.SUCCESS_STATUS).json(result);

    } catch (err) {
        console.error("Error fetching chefs:", err);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });
    }

});

module.exports = router;