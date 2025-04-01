const ApiError = require('../utils/apiError');

const sendErrorForDevMode = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorForProdMode = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

const handleJwtInvalidSignature = () => new ApiError('Invalid token, please login again..', 401);
const handleJwtExpired = () => new ApiError('Expired token, please login again..', 401);

const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 505;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'Development') {
        sendErrorForDevMode(err, res);
    } else {
        if (err.name === 'JsonWebTokenError') {
            err = handleJwtInvalidSignature();
        }
        if (err.name === 'TokenExpiredError') {
            err = handleJwtExpired();
        }

        sendErrorForProdMode(err, res);
    }
};

module.exports = globalError;
