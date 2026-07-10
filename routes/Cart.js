const express = require('express');
const router = express.Router();
const {
    addToCart,
    updateCart,
    deleteItem,
    getItems,
    deleteCart
} = require('../controllers/cartController');

router.get("/", getItems);
router.post("/items", addToCart);
router.patch("/items/:productId", updateCart);
router.delete("/items/:productId", deleteItem);
router.delete("/", deleteCart);

module.exports = router;