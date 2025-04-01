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

// express app
const app = express();

// Enable other domains to access the this app (API)
app.use(cors());
app.options('*', cors());

// Compress for all responses from req
app.use(compression());

// Checkout webhook
app.post('/webhook-checkout', express.raw({type: 'application/json'}), webhookCheckout);

// Middlewares
// Parsing (encoded string to js object)
// -Set request size limits (Security)
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

// -Helmet (Security)
app.use(helmet());

// -To remove input data injection and apply data sanitization as email login: {"$gt":""}  (Security)
app.use(mongoSanitize());

// -Sanitization for scripts as <div> </div> in inputs fields (Security)
app.use(xss());

// -Brute-Force (Security)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: ' Too many requests, please try again after an hour.',
});
// -Apply rate limiting for all routes start with /api requests
app.use('/api', limiter);

// -HPP to take last parameter, wishlist to remove hpp for them (Security)
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

// Port Connection
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...👍`);
});

const shutdownServer = () => {
    if (server) {
        console.log('Shutting down server...');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    }
};

// Handle graceful shutdown when the process is terminated (e.g., by hosting providers)
process.on('SIGTERM', shutdownServer);

// Handle graceful shutdown when manually stopping the server (Ctrl + C)
process.on('SIGINT', shutdownServer);

// Handles shutdown when hosting providers send termination signals
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down server...');
    server.close(() => {
        console.log('Server closed.');
    });
});
