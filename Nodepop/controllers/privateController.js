'use strict';

class PrivateController {

    index(req, res, next) {
        res.render('hello');
    }
}

module.exports = new PrivateController();