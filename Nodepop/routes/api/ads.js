const express = require('express');
const router = express.Router();
const { Ad, statusEnum } = require('../../models/Ad.js');

// GET /
// get all ads
router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const status = parseInt(req.query.status);
        const price = req.query.price;
        const tag = req.query.tag;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;

        const results = await Ad.fillByFilters(name, status, price, tag, skip, limit, sort);
        res.render('index', { results, statusEnum }); // { results: results,  statusEnum: statusEnum} => { result, statusEnum }
    } catch (error) {
        next(error);
    }
});

// GET /tags
// get all tags of ads
router.get('/tags', async (req, res, next) => {
    try {
        const result = await Ad.distinct("tags");
        res.render('tags', { result }); // { result: result } => { result }
    } catch (error) {
        next(error);
    }
});

// PUT /
// create an ad
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        if (data.status > 3) {
           return res.json({ error : 'The status must be a number between 0 and 3' });
        }


        const ad = new Ad(data);

        const newAd = await ad.save();
        res.status(201).json({ result: newAd });
    } catch (error) {
        next(error);
    }
});

module.exports = router;