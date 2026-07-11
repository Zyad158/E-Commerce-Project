const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError')

const ok = (res, data, msg = "Success", statusCode = 200) =>
    res.status(statusCode).json({ status: "Success", message: msg, data });

//POST /api/orders
const createOrder = asyncHandler(async (req, res, next) => {
    const {shippingAddress} = req.body;
    const cart = await Cart.findOne().populate("items.product");
    if (!cart)
        return next(new AppError("Cart not found", 404));
    if (cart.items.length === 0)
        return next(new AppError("Cart is empty", 400));
    for (const item of cart.items) {
        if (item.quantity > item.product.stock)
            return next(new AppError("Not enough stock", 400))
    }
    const orderItems = cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
    }));
    const order = await Order.create({
        orderNumber: Date.now(),
        items: orderItems,
        totalPrice: cart.totalPrice,
        shippingAddress
    });
    for (const item of cart.items) {
        item.product.stock -= item.quantity;
        await item.product.save();
    }
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    ok(res, order, "Order created successfully", 201);
})

//GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    ok(res, orders, "Orders fetched successfully")
})

//GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order)
        return next(new AppError("Order not found"), 404);
    ok(res, order, "Order fetched successfully");
})

//PATCH /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const {status} = req.body;
    const allowedStatus = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled"
    ];
    if (!allowedStatus.includes(status)) {
        return next(
            new AppError(
                `Invalid status. Allowed values: ${allowedStatus.join(", ")}`,
                400
            )
        );
    }
    const order = await Order.findById(req.params.id);
    if (!order)
        return next(new AppError("Order not found", 404));
    order.status = status;
    await order.save();
    ok(res, order, "Status updated successfully");
})

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
}