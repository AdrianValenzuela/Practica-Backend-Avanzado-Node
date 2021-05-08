'use strict';

const jwt = require('jsonwebtoken');
const { User } = require('../models');

class LoginController {

    /**
     * POST /authenticate
     */
    async jwt(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await user.comparePassword(password))) {
                const error = new Error('Invalid credentials');
                error.status = 401;
                next(error);
            }

            jwt.sign({ _id: user._id }, process.env.JWT_SECRET, 
                { expiresIn: '2h' }, (err, jwtToken) => {
                    if (err) {
                        next(err);
                        return;
                    }

                    res.json({ token: jwtToken});
                });
                
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new LoginController();
