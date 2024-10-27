const express = require('express');
const authenticateAndAuthorize = require('./middleware/authenticateAndAuthorize');

const app = express();

// Define your routes
app.get('/admin', authenticateAndAuthorize(['admin']), (req, res) => {
    res.send('Admin Dashboard');
});

app.get('/user', authenticateAndAuthorize(['user']), (req, res) => {
    res.send('User Dashboard');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
