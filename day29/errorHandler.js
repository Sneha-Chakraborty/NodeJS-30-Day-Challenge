function errorHandler(err, req, res, next) {
    console.error(err); // Log the error for debugging purposes

    // Set default status code and error message
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    // Check if the error is an instance of Error object
    if (err instanceof Error) {
        // Check if the error has a custom status code
        if (err.statusCode && typeof err.statusCode === 'number') {
            statusCode = err.statusCode;
        }
        // Check if the error has a custom message
        if (err.message && typeof err.message === 'string') {
            errorMessage = err.message;
        }
    }

    // Send the appropriate error response to the client
    res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
