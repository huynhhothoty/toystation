const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: [true, 'Please fill content'],
    },
    type: {
        type: String,
        enum: {
            values: ['notice', 'order'],
            message: `status are only 'notice', 'order'`,
        },
        required: [true, 'Please fill type of message'],
    },
});

// middlewares

// create model
const Message = model('Message', messageSchema);

module.exports = {
    Message,
};
