const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 505;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'Development') {
        sendErrorForDevMode(err, res);
    } else {
        sendErrorForProdMode(err, res);
    }
};

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

module.exports = globalError;
