const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: Number,
            unique: true,
            required: [true, "Order number is required"]
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Product is required"]
                },
                name: {
                    type: String,
                    required: [true, "Name is required"]
                },
                price: {
                    type: Number,
                    required: [true, "Price is required"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    min: 1,
                    default: 1
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: [true, "Total price is required"]
        },
        status: {
            type: String,
            enum: [                
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "canceled"
            ],
            default: "pending",
            required: [true, "Status is required"]
        },
        shippingAddress: {
            street: {
                type: String,
                required: [true, "Street is required"]
            },
            city: {
                type: String,
                required: [true, "City is required"]
            },
            country: {
                type: String,
                required: [true, "Country is required"]
            }
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Order", orderSchema);