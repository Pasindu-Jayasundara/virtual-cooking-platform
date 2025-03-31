const express = require('express');
const router = express.Router();
require('dotenv').config();

const User = require('../models/User');
const Tutorial = require('../models/Tutorials');

router.post('/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ username: email });
        if (existingUser) {
            return res.status(parseInt(process.env.FAILED_STATUS)).json({ message: "User already exists" });
        }

        const newUser = new User({
            name,
            username: email,
            password,
            isChef: false,
            purchasedTutorials: [],
            paymentHistory: [],
            recentlyAccessed: [],
            myTutorials: [],
            image: ".",
            cart: []
        });

        try {
            const savedUser  = await newUser .save();
            console.log('User  saved successfully:', savedUser );

            res.status(parseInt(process.env.SUCCESS_STATUS)).json({ message: "User registered successfully", user: savedUser });
        
        } catch (err) {
            console.error('Error saving user:', err);
            res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "User registered failed" });
        }

    } catch (err) {

        console.error("Error in registration:", err);
        res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "Internal Server Error" });

    }

});

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ username: email, password });
        if (!userExists) {
            return res.status(parseInt(process.env.FAILED_STATUS)).json({ message: "User does not exist" });
        }

        res.status(parseInt(process.env.SUCCESS_STATUS)).json({ message: "User logged in successfully", user: userExists });

    } catch (err) {

        console.error("Error in login:", err);
        res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "Internal Server Error" });

    }

});

router.post('/users', async (req, res) => {

    try {

        const response = await User.find({}).select('-password').populate({
            path: 'cart.tutorialId',
            model: Tutorial,
        })
        if (!response) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(parseInt(process.env.SUCCESS_STATUS)).json(response);

    } catch (error) {

        console.error("Error fetching users:", error);
        res.status(parseInt(process.env.SERVER_ERROR)).json({ message: "Internal Server Error" });

    }

});

module.exports = router;