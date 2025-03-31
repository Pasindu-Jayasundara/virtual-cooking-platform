const express = require('express');
const router = express.Router();
require('dotenv').config();

const User = require('../models/User');

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ username: email });
        if (existingUser) {
            return res.status(process.env.FAILED_STATUS).json({ message: "User already exists" });
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
            image: "",
            cart: []
        });

        await newUser.save((err, user) => {
            if (err) {
                console.error("Error saving user:", err);
                return res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });
            }
            res.status(process.env.SUCCESS_STATUS).json({ message: "User registered successfully", user });
        });

    } catch (err) {

        console.error("Error in registration:", err);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });

    }

});

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ username: email, password });
        if (!userExists) {
            return res.status(process.env.FAILED_STATUS).json({ message: "User does not exist" });
        }

        res.status(process.env.SUCCESS_STATUS).json({ message: "User logged in successfully", user: userExists });

    } catch (err) {

        console.error("Error in login:", err);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });

    }

});

router.post('/users', async (req, res) => {

    try {

        const response = await User.find({});
        if (!response) {
            return res.status(404).json({ message: "No users found" });
        }

        // Filter out the password field from the response
        const filteredResponse = response.map(user => {
            const { password, ...userWithoutPassword } = user._doc; // Exclude the password field
            return userWithoutPassword;
        });

        res.status(process.env.SUCCESS_STATUS).json(filteredResponse);

    } catch (error) {

        console.error("Error fetching users:", error);
        res.status(process.env.SERVER_ERROR).json({ message: "Internal Server Error" });

    }

});

module.exports = router;