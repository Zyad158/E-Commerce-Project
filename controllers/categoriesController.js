const Category = require('../models/category.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const ok = (res, data, msg = "Success", statusCode = 200) =>
    res.status(statusCode).json({ status: "Success", message: msg, data });

//GET /api/categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    ok(res, categories, "Categories fetched successfully");
})

//GET /api/categories/:id
const getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    ok(res, category, "Category fetched successfully");
})

//POST /api/categories
const createCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new AppError("Name is required", 400));
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        return next(new AppError("Category with this name already exists", 409));
    }
    const newCategory = await Category.create({ name });
    ok(res, newCategory, "Category created successfully", 201);
})

//PATCH /api/categories/:id
const updateCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new AppError("Name is required", 400));
    }
    const category = await Category.findByIdAndUpdate(req.params.id,
        { name },
        { new: true, runValidators: true })
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    ok(res, category, "Category updated successfully")
})

//DELETE /api/categories/:id
const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    ok(res, category, "Category deleted successfully")
})

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }