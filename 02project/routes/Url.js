const express = require('express');
const {handCreateShortUrl, handGetAnalytics} = require('../controllers/Url');

const router = express.Router();

router.post('/', handCreateShortUrl);
router.get('/analytics/:shortId', handGetAnalytics);

module.exports = router;