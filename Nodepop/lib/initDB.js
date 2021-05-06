'use strict';

const mongoose = require('mongoose');
const { Ad } = require('../models/Ad.js');

mongoose.connection.once('open', async () => {
    const data = [
        {
            name: 'Laptop',
            status: 0,
            price: 849.99,
            photo: 'laptop.jpg',
            tags: ['work']
        },
        {
            name: 'Car',
            status: 2,
            price: 10500,
            photo: 'car.jpg',
            tags: ['motor', 'lifestyle']
        },
        {
            name: 'Phone',
            status: 1,
            price: 150,
            photo: 'phone.jpg',
            tags: ['mobile', 'lifestyle']
        },
        {
            name: 'Motorbike',
            status: 2,
            price: 1249.99,
            photo: 'motorbike.jpg',
            tags: ['motor', 'lifestyle']
        },
        {
            name: 'Keyboard',
            status: 3,
            price: 78.5,
            photo: 'keyboard.jpg',
            tags: ['work']
        }
    ]

    try {
        await mongoose.connection.dropDatabase();
        await Ad.insertMany(data);
    } catch (error) {
        console.log(error)
    }    
});


mongoose.connection.on('error', err => {
    console.log('connection error', err);
});

mongoose.connect('mongodb://localhost/Nodepop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
