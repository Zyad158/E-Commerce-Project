require('dotenv').config()
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./db/connectDB');
const AppError = require('./utils/AppError')
const errorHandler = require('./middlewares/errorHandler');
const categoriesRoutes = require('./routes/Categories');
const productsRoutes = require('./routes/Products');
const cartRoutes = require('./routes/Cart');
const ordersRoutes = require('./routes/Orders')
const config = require('./config/config');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
    value: req.query,
    writable: true,
  });
  next();
})
app.use(mongoSanitize({
    replaceWith: '_'
}))

//Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes)


//404 Catch all
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

//Error handler
app.use(errorHandler);

//Run server
const start = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`)
    })
}

start();
