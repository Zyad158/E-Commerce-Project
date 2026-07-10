const Product = require('../models/product.model');
const Category = require('../models/category.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const ok = (res, data, msg = "Success", statusCode = 200) =>
    res.status(statusCode).json({ status: "Success", message: msg, data });

//GET /api/products
const getAllProducts = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
        if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice)
    }
    if (req.query.inStock)  filter.inStock = req.query.inStock === "true";
    if (req.query.search) {
        filter.$or = [
            {name: {$regex: req.query.search, $options: "i"}},
            {description: {$regex: req.query.search, $options: "i"}}
        ]
    }
    const sortBy = req.query.sort || "-createdAt";
    const products = await Product.find(filter).sort(sortBy);
    ok(res, products, "Products fetched successfully");
})

//GET /api/products/:id
const getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate("category", "name description");
    if (!product)
        return next(new AppError("Product not found", 400));
    ok(res, product, "Product fetched successfully");
})

//POST /api/products
const createProduct = asyncHandler(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    if (!name || !price || !stock || !category)
        return next(new AppError("Name, price, stock and category are required", 400));
    const productCategory = await Category.findById(category);
    if (!productCategory) {
        return next(new AppError("Category not found", 404));
    }
    const newProduct = await Product.create({
        name,
        price,
        stock,
        category: productCategory._id
    });
    ok(res, newProduct, "Product created successfully", 201);
})

//PATCH /api/products/:id
const updateProduct = asyncHandler(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, stock, category },
        { new: true, runValidators: true }
    )
    if (!product)
        return next(new AppError("Product not found", 400));
    ok(res, product, "Product updated successfully");
})

//DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
        return next(new AppError("Product not found", 400));
    ok(res, product, "Product deleted successfully")
})

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};