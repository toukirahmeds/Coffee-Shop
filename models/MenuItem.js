const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const menuItemSchema = new mongoose.Schema({
    name: {
        type: SchemaTypes.String,
        required: true
    },
    price: {
        type: SchemaTypes.Number,
        required: true,
        min: 0
    },
    taxRate: {
        type: SchemaTypes.Number,
        required: true,
        min: 0,
        max: 100
    },
    preparationTime: {
        type: SchemaTypes.Number,
        default: 0,
        min: 0
    },
    discountOffer: {
        orderedWithItemId: {
            type: SchemaTypes.ObjectId,
            required: false
        },
        discountPercentage: {
            type: SchemaTypes.Number,
            required: false
        }
    }
}, {
    timestamps: true
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;