'use strict';

const mongoose = require('mongoose');

// schema
const adSchema = mongoose.Schema({
    name: { type: String, index: true },
    status: { type: Number, index: true },
    price: { type: Number, index: true },
    photo: String,
    tags: { type: Array, index: true }
});

// Enum for status
const statusEnum = {
    0: "On_Sale",
    1: "Wanted",
    2: "Reserved",
    3: "Sold"
}

// get ads by filters
adSchema.statics.fillByFilters = function (name, status, price, tag, skip, limit, sort) {
    const filtro = {};

    if (name) {
        const regex = name
        filtro.name = { $regex: regex, $options: 'i' }
    }


    if (status) {
        filtro.status = status
    }


    if (price) {
        if (!price.toString().includes('-')) {
            filtro.price = price
        }
        else {
            const position = price.indexOf('-');
            const split = price.split('-');
            if (split[0] == '') {
                const filterPrice = split[1];
                filtro.price = { $lte: parseFloat(filterPrice) }
            }
            else if (split[1] == '') {
                const filterPrice = split[0];
                filtro.price = { $gte: parseFloat(filterPrice) }
            }
            else {
                const minPrice = split[0];
                const maxPrice = split[1];
                filtro.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
            }
        }
    }

    if (tag) {
        filtro.tags = tag
    }

    const query = Ad.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    return query.exec();
}

// build schema
const Ad = mongoose.model('Ad', adSchema);

// exports
module.exports = { Ad, statusEnum };