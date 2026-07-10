require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/connectDB')
const config = require('./config/config');
const Order = require('./models/order.model')
const Category = require('./models/category.model');
const Product = require('./models/product.model');

const seed = async () => {
    await connectDB();
    console.log("Connected to MongoDB");

    await Order.deleteMany()
    await Product.deleteMany();
    await Category.deleteMany();
    console.log("Cleared existing data");

    const electronics = await Category.create({ name: 'Electronics', description: 'Gadgets and devices', slug: 'electronics' });
    const clothing = await Category.create({ name: 'Clothing', description: 'Apparel and fashion', slug: 'clothing' });
    const books = await Category.create({ name: 'Books', description: 'All kinds of books and novels', slug: 'books' });


   const products = [
            { name: 'iPhone 15 Pro', description: 'Latest Apple smartphone', price: 999, stock: 15, images: ['image1.jpg'], inStock: true, category: electronics._id },
            { name: 'MacBook Air M3', description: 'Apple laptop 13 inch', price: 1199, stock: 10, images: ['image2.jpg'], inStock: true, category: electronics._id },
            { name: 'Sony WH-1000XM5', description: 'Wireless noise canceling headphones', price: 350, stock: 25, images: ['image3.jpg'], inStock: true, category: electronics._id },
            { name: 'Samsung 4K TV', description: '55 inch Smart LED TV', price: 450, stock: 8, images: ['image4.jpg'], inStock: true, category: electronics._id },
            { name: 'iPad Air', description: 'Apple tablet with M2 chip', price: 599, stock: 12, images: ['image5.jpg'], inStock: true, category: electronics._id },
            { name: 'PlayStation 5', description: 'Sony gaming console', price: 499, stock: 5, images: ['image6.jpg'], inStock: true, category: electronics._id },

            { name: 'Oversized Hoodie', description: 'Comfortable cotton hoodie', price: 45, stock: 50, images: ['image7.jpg'], inStock: true, category: clothing._id },
            { name: 'Denim Jacket', description: 'Classic blue jean jacket', price: 65, stock: 30, images: ['image8.jpg'], inStock: true, category: clothing._id },
            { name: 'Cargo Pants', description: 'Stylish streetwear cargo pants', price: 40, stock: 40, images: ['image9.jpg'], inStock: true, category: clothing._id },
            { name: 'Leather Boots', description: 'Waterproof winter boots', price: 120, stock: 15, images: ['image10.jpg'], inStock: true, category: clothing._id },
            { name: 'Running Shoes', description: 'Lightweight sports sneakers', price: 85, stock: 22, images: ['image11.jpg'], inStock: true, category: clothing._id },
            { name: 'Formal Suit', description: 'Slim fit 3-piece suit', price: 200, stock: 10, images: ['image12.jpg'], inStock: true, category: clothing._id },

            { name: 'Atomic Habits', description: 'Self-improvement book by James Clear', price: 15, stock: 100, images: ['image13.jpg'], inStock: true, category: books._id },
            { name: 'The Alchemist', description: 'Novel by Paulo Coelho', price: 12, stock: 80, images: ['image14.jpg'], inStock: true, category: books._id },
            { name: 'Deep Work', description: 'Rules for focused success by Cal Newport', price: 18, stock: 45, images: ['image15.jpg'], inStock: true, category: books._id },
            { name: 'Sapiens', description: 'A brief history of humankind', price: 22, stock: 35, images: ['image16.jpg'], inStock: true, category: books._id },
            { name: 'Thinking, Fast and Slow', description: 'Book on psychology and decision making', price: 20, stock: 50, images: ['image17.jpg'], inStock: true, category: books._id },
            { name: 'The Hobbit', description: 'Fantasy novel by J.R.R. Tolkien', price: 14, stock: 60, images: ['image18.jpg'], inStock: true, category: books._id }
        ];


    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    await mongoose.disconnect();
    console.log("Done - check MongoDB Compass to verify");
};

seed().catch((err) => {
    console.log("Seed failed:", err.message);
    process.exit(1);
});


/*const mongoose = require('mongoose');
const connectDB = require('./db/connectDB')
const config = require('./config/config');
const Category = require('./models/category.model');
const Product = require('./models/product.model');

const seed = async () => {
    await connectDB();
    console.log("Connected to MongoDB");

    await Category.deleteMany();
    await Product.deleteMany();
    console.log("Cleared existing data");

    const electronicsCategory = await Category.create({ name: "electronics" });
    const products = [
    {id: '1', name: 'laptop', price: 8000, stock: 10, category: electronicsCategory._id},
    {id: '2', name: 'phone', price: 2000, stock: 20, category: electronicsCategory._id},
    {id: '3', name: 'tablet', price: 4000, stock: 15, category: electronicsCategory._id},
    {id: '4', name: 'headphones', price: 300, stock: 20, category: electronicsCategory._id}
]

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    await mongoose.disconnect();
    console.log("Done - check MongoDB Compass to verify");
};

seed().catch((err) => {
    console.log("Seed failed:", err.message);
    process.exit(1);
});*/