const shortid = require("shortid");
const URL = require("../models/Url");

const handCreateShortUrl = async (req, res) => {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: 'Url required!' });

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitiHistory: [],
        createdBy: req.user._id
    });

    return res.render('home', {
        id: shortId
    });
}

const handGetAnalytics = async(req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitiHistory.length,
        analytics: result.visitiHistory
    });
}

module.exports = {
    handCreateShortUrl,
    handGetAnalytics
}