const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    // Store connected clients
    const clients = new Set();

    wss.on('connection', (ws) => {
        // Add new client to the set
        clients.add(ws);

        // Handle incoming messages from clients
        ws.on('message', (message) => {
            // Broadcast the received message to all connected clients
            broadcastMessage(message);
        });

        // Handle client disconnection
        ws.on('close', () => {
            // Remove the client from the set
            clients.delete(ws);
        });
    });

    // Function to broadcast message to all connected clients
    function broadcastMessage(message) {
        clients.forEach(client => {
            // Send message to each client
            client.send(message);
        });
    }
}

module.exports = setupWebSocketServer;
