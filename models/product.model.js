const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Product Price is required"],
            min: [0, "Price must be greater than 0"]
        },
        stock: {
            type: Number,
            default: 0,
            min: [0, "Stock must be greater than 0"]
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Product category is required"]
        },
        images: [{
            type: String
        }],
        inStock: {
            type: Boolean,
            default: true
        }
    },
    {timestaps: true}
)

module.exports = mongoose.model("Product", productSchema)