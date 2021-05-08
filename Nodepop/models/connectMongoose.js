'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('connection error', err);
});

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = mongoose.connection;