const mongoose = require('mongoose');

const orderSchema = new mongoose.OrderSchema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Order must be belong to user!'],
        },
        cartItems: [{}],
    },
    {timestamps: true},
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
