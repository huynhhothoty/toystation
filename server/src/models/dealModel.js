const { Schema, model } = require('mongoose');

const dealSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill name of deal'],
    },
    discount: {
        type: Number,
        required: [true, 'Please fill discount'],
    },
    starRating: {
        type: String,
        default: 5,
    },
    itemList: [
        {
            type: Schema.ObjectId,
            ref: 'Toy',
            required: [true, 'Please fill toy list'],
        },
    ],
    bonusItem: {
        type: Schema.ObjectId,
        ref: 'Toy',
    },
});

// middlewares

//
const Deal = model('Deal', dealSchema);
module.exports = {
    Deal,
};
