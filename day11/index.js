const express = require('express');
const authenticateToken = require('./authenticateToken.js');
const app = express();

app.get('/protected', authenticateToken, (req, res) => {
    // If the request reaches here, it means the token is valid
    // You can access the decoded user object using req.user
    res.send('Welcome to the protected route World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
