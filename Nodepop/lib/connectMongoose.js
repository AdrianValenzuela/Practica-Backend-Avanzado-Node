'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('connection error', err);
});

mongoose.connect('mongodb://localhost/Nodepop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;