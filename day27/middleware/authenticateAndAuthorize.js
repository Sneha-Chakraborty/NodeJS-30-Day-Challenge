const jwt = require('jsonwebtoken');

function authenticateAndAuthorize(roles) {
    return function(req, res, next) {
        // Get the token from request header
        const token = req.headers['authorization'];

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is required.' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, 'your_secret_key');

            // Check if user has the required role
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'You do not have permission to access this resource.' });
            }

            // If authentication and authorization are successful, set user information in request object
            req.user = decoded;

            // Call next middleware
            next();
        } catch (error) {
            // Token is invalid
            return res.status(401).json({ message: 'Invalid token.' });
        }
    };
}

module.exports = authenticateAndAuthorize;
