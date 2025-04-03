const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');

dotenv.config({path: 'config.env'});

const dbConnection = require('./config/database');
const mountRoutes = require('./routes');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddlewares');
const {webhookCheckout} = require('./controllers/OrderController');

// Connect to DB
dbConnection();

// Express app
const app = express();

// Enable other domains to access this app (API)
app.use(cors());
app.options('*', cors());

// Compress for all responses from req
app.use(compression());

// Checkout webhook
app.post('/webhook-checkout', express.raw({type: 'application/json'}), webhookCheckout);

// Middlewares
// Parsing (encoded string to JS object)
// - Set request size limits (Security)
app.use(
    express.json({
        limit: '20kb',
    }),
);

// Serve images
app.use(express.static(path.join(__dirname, 'uploads')));

// Logger
if (process.env.NODE_ENV === 'Development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV} ⚙️`);
}

// - Helmet (Security)
app.use(helmet());

// - Remove input data injection and apply data sanitization (Security)
app.use(mongoSanitize());

// - Sanitization for scripts like <div> </div> in input fields (Security)
app.use(xss());

// - Brute-force protection (Security)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests, please try again after an hour.',
});
// - Apply rate limiting for all routes starting with /api
app.use('/api', limiter);

// - HPP to take the last parameter; `whitelist` removes HPP for these fields (Security)
app.use(
    hpp({
        whitelist: ['price', 'sold', 'quantity', 'ratingsAverage', 'ratingsQuantity'],
    }),
);

// Mount Routes
mountRoutes(app);

// Not Found Route Error Handler Middleware
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Error Handler Middleware For Express
app.use(globalError);

// Export the Express app
module.exports = app;
