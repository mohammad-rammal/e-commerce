const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path: 'config.env'});

const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddlewares');

// Connect to DB
dbConnection();

// express app
const app = express();

// Middlewares
// parsing (encoded string to js object)
app.use(express.json());

// Logger
if (process.env.NODE_ENV === 'Development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV} ⚙️`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subCategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);

// Not Found Route Error Handler Middleware
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Error Handler Middleware For Express
app.use(globalError);

// Port Connection
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...👍`);
});

// Events For Errors Outside Express (Async)
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down...💥`);
        process.exit(1);
    });
});
