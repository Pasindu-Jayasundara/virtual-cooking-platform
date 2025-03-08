const express = require('express');
const router = express.Router();

router.post('/register',(req, res)=>{
    res.send('Register route');
});

router.post('/login',(req, res)=>{
    res.send('Login route');
});

module.exports = router;