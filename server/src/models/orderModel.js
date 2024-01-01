const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        totalPrice: {
            type: Number,
        },
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
                _id: false,
                numbers: {
                    type: String,
                    default: 1,
                },
                item: {
                    type: Schema.ObjectId,
                    ref: 'Toy',
                },
            },
        ],
        dealList: [
            {
                _id: false,
                numbers: {
                    type: String,
                    default: 1,
                },
                item: {
                    type: Schema.ObjectId,
                    ref: 'Deal',
                },
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
    },
    { timestamps: true }
);

// middlewares
orderSchema.pre('save', async function (next) {
    await this.populate([{ path: 'itemList.item' }, { path: 'dealList.item' }]);
    const orderItemList = this.itemList.length > 0 ? this.itemList : this.dealList;
    this.listSnapshot = orderItemList.map((ele) => ele.toObject());
    this.totalPrice = this.listSnapshot.reduce(
        (acc, cur) => acc + cur.numbers * cur.item.price,
        0
    );

    next();
});
//
const Order = model('Order', orderSchema);

module.exports = {
    Order,
};
