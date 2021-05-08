'use strict';

require('dotenv').config();

const { Ad, User, connectMongoose, mongoose } = require('../models');

main().catch(err => console.error(err));

async function main() {

    await initUsers();
    //await initAdverts();
    mongoose.connection.close();
}

async function initUsers() {
    const data = [
        {
            email: 'usuario@example.com',
            password: await User.hashPassword('1234')
        },
        {
            email: 'admin@admin.com',
            password: await User.hashPassword('secure-password')
        }
    ];
    
    await User.deleteMany();
    await User.insertMany(data);
}

async function initAdverts() {
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

    await Ad.deleteMany();
    await Ad.insertMany(data);
}
