const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./setupWebSocketServer');

const app = express();
const server = http.createServer(app);

// Set up WebSocket server
setupWebSocketServer(server);

// Other Express middleware and routes...

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
