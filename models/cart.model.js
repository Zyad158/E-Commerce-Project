const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Product is required"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    min: 1,
                    default: 1
                },
                price: {
                    type: Number,
                    required: [true, "Price is required"]
                }

            }

        ],
        totalPrice: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Cart", cartSchema);