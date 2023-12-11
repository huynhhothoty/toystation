const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    fromToy: {
        type: Schema.ObjectId,
        ref: 'Toy',
    },
    fromDeal: {
        type: Schema.ObjectId,
        ref: 'Deal',
    },
    content: {
        type: String,
        required: [true, 'Please fill content of review'],
    },
    starRating: {
        type: String,
        required: [true, 'Please fill star rating'],
    },
});

// middlewares

//
const Review = model('Review', reviewSchema);
module.exports = {
    Review,
};
