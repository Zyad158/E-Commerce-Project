const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const ok = (res, data, msg = "Success", statusCode = 200) =>
    res.status(statusCode).json({status: "Success", message: msg, data});

//POST /api/cart/items
const addToCart = asyncHandler(async (req, res, next) => {
    const {product, sessionId} = req.body;
    const foundProduct = await Product.findById(product);
    if (!foundProduct)
        return next(new AppError("Product not found", 404));
    if (foundProduct.stock <= 0)
        return next(new AppError("Product is out of stock", 400));
    if (!sessionId)
        return next(new AppError("Session ID is required", 400));
    let cart = await Cart.findOne({ sessionId });
    if(!cart) {
        cart = await Cart.create({
            sessionId,
            items: [],
            totalPrice: 0
        })
    }
    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === product
    );
    if (itemIndex === -1) {
        cart.items.push({
            product: foundProduct._id,
            quantity: 1,
            price: foundProduct.price
        })
    }else{
        cart.items[itemIndex].quantity++
    }
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    await cart.save();
    ok(res, cart, "Product added to cart", 201)
})

//PATCH /api/cart/items/:productId
const updateCart = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { sessionId } = req.query;
    if (!sessionId)
        return next(new AppError("Session ID is required", 400));
    let cart = await Cart.findOne({ sessionId });
    if (!cart)
        return next(new AppError("Cart not found", 404));
    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    )
    if (itemIndex === -1)
        return next(new AppError("Product not found in cart", 404))
    if (quantity <= 0) {
        cart.items.splice(itemIndex, 1)
    }else{
        cart.items[itemIndex].quantity = quantity
    }
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    await cart.save();
    ok(res, cart, "Cart updated successfully")
})

//DELETE /api/cart/items/:productId
const deleteItem = asyncHandler(async (req, res, next) => {
    const {productId} = req.params;
    const { sessionId } = req.query;
    if (!sessionId)
        return next(new AppError("Session ID is required", 400));
    let cart = await Cart.findOne({ sessionId });
    if (!cart)
        return next(new AppError("Cart not found", 404))
    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    )
    if (itemIndex === -1)
        return next(new AppError("Product not found in cart", 404));
    cart.items.splice(itemIndex, 1);
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    await cart.save()
    ok(res, cart, "Product removed from cart");
})

//GET /api/cart
const getItems = asyncHandler(async (req, res, next) => {
    const { sessionId } = req.query;
    if (!sessionId)
        return next(new AppError("Session ID is required", 400));
    const cart = await Cart.findOne({ sessionId }).populate("items.product");
    if (!cart)
        return next(new AppError("Cart not found", 404));
    ok(res, cart, "Cart fetched successfully")
})

//DELETE api/cart
const deleteCart = asyncHandler(async (req, res, next) => {
    const { sessionId } = req.query;
    if (!sessionId)
        return next(new AppError("Session ID is required", 400));
    const cart = await Cart.findOne({ sessionId });
    if (!cart)
        return next(new AppError("Cart not found", 404));
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    ok(res, cart, "Cart cleared successfully");
})

module.exports = {
    addToCart,
    updateCart,
    deleteItem,
    getItems,
    deleteCart
}