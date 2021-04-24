const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const orderItemSchema = new mongoose.Schema({
    itemId: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    quantity: {
        type: SchemaTypes.Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    customerName: {
        type: SchemaTypes.String,
        required: true
    },
    orderedItems: [orderItemSchema],
    totalBill: {
        type: SchemaTypes.Number,
        required: true,
        min: 0
    },
    deliveryTime: {
        type: SchemaTypes.Date,
        required: true
    },
    status: {
        type: SchemaTypes.String,
        enums: ["preparing", "ready", "delivered"],
        default: "preparing"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
