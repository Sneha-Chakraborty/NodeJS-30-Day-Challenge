const express = require('express');
const errorHandler = require('./errorHandler'); // Assuming the error handler middleware is in a separate file

const app = express();

// Define your routes and other middleware here

// Simulate an error in middleware
app.use((req, res, next) => {
    // Simulate an error in middleware
    next(new Error('Middleware Error'));
});

// Add the error handling middleware as the last middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
