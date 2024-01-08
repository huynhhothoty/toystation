const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill name'],
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: [true, 'Please fill price'],
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    starRating: {
        type: String,
        default: 5,
    },
    age: {
        type: Number,
    },
    branch: {
        type: String,
    },
    origin: {
        type: String,
    },
    moreAttribute: [
        {
            type: Object,
        },
    ],
    detail: [
        {
            type: String,
        },
    ],
});

// middleware

// create model and export
const Toy = mongoose.model('Toy', toySchema);

module.exports = {
    Toy,
};
