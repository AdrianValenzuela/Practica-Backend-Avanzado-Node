const express = require('express');
const router = express.Router();
var multer  = require('multer');
var path = require('path');
const { Ad, statusEnum } = require('../../models/Ad.js');
const jwtAuth = require('../../lib/jwtAuth');
const publishTask = require('../../models/publisher');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public', 'images'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });


// GET /
// get all ads
router.get('/', jwtAuth, async (req, res, next) => {
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
router.get('/tags', jwtAuth, async (req, res, next) => {
    try {
        const result = await Ad.distinct("tags");
        res.render('tags', { result }); // { result: result } => { result }
    } catch (error) {
        next(error);
    }
});

// POST /
// create an ad
router.post('/', upload.single('photo'), async (req, res, next) => {
    try {        
        const data = req.body;
        const file = req.file;
        if (data.status > 3) {
           return res.json({ error : 'The status must be a number between 0 and 3' });
        }

        const ad = new Ad(data);
        ad.photo = file.filename;

        const newAd = await ad.save();
        publishTask('resize-photo', file.originalname);
        res.status(201).json({ result: newAd });
    } catch (error) {
        next(error);
    }
});

module.exports = router;