const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please fill user'],
    },
    status: {
        type: String,
        enum: {
            values: ['unconfirmed', 'on-going', 'completed', 'failed'],
            message: `status are only 'unconfirmed', 'on-going', 'completed', 'failed'`,
        },
        default: 'unconfirmed',
    },
    itemList: [
        {
            type: Schema.ObjectId,
            ref: 'Toy',
        },
    ],
    dealList: [
        {
            type: Schema.ObjectId,
            ref: 'Deal',
        },
    ],
    deliveryEstimate: {
        type: Date,
        default: new Date(Date.now() + 60 * 60 * 1000 * 24 * 3).toISOString(),
    },
});

// middlewares

//
const Order = model('Order', orderSchema);

module.exports = {
    Order,
};
