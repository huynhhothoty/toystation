const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please fill user'],
    },
    address: {
        type: String,
        required: [true, 'Please fill address'],
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
    listSnapshot: [
        {
            type: Object,
        },
    ],
    deliveryEstimate: {
        type: Date,
        default: new Date(Date.now() + 60 * 60 * 1000 * 24 * 3).toISOString(),
    },
});

// middlewares
orderSchema.pre('save', async function (next) {
    await this.populate([{ path: 'itemList' }, { path: 'dealList' }]);
    const orderItemList = this.itemList.length > 0 ? this.itemList : this.dealList;
    this.listSnapshot = orderItemList.map((ele) => ele.toObject());

    next();
});
//
const Order = model('Order', orderSchema);

module.exports = {
    Order,
};
