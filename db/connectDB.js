const mongoose = require('mongoose');
const config = require('../config/config')
const asyncHandler = require('../utils/asyncHandler')

const connectDB = asyncHandler(async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log(`MongoDB is connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection failed", err.message);
        process.exit(1)
    }
})

module.exports = connectDB;