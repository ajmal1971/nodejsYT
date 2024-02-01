const express = require('express');
const URL = require('../models/Url');

const router = express.Router();

router.get('/', async (req, res) => {
    const urls = await URL.find({});
    return res.render('home', {
        urls: urls
    });
});

module.exports = router;