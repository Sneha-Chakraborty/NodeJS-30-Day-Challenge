const express = require('express');
const app = express();

// Define the rate limit and the time window (in milliseconds)
const rateLimit = 5; // Maximum number of requests
const timeWindow = 60000; // Time window in milliseconds (1 minute)

// Create a map to store IP addresses and their request counts
const requestCountMap = new Map();

// Rate limiting middleware function
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip; // Get the IP address of the client

  // Get the current timestamp
  const currentTime = new Date().getTime();

  // Check if the IP address exists in the requestCountMap
  if (requestCountMap.has(ip)) {
    const requestData = requestCountMap.get(ip);
    const { count, lastRequestTime } = requestData;

    // Check if the time window has passed since the last request
    if (currentTime - lastRequestTime > timeWindow) {
      // Reset the count if the time window has passed
      requestCountMap.set(ip, { count: 1, lastRequestTime: currentTime });
      next();
    } else {
      // Check if the request count exceeds the rate limit
      if (count < rateLimit) {
        // Increment the request count and update the last request time
        requestCountMap.set(ip, { count: count + 1, lastRequestTime: currentTime });
        next();
      } else {
        // Return a 429 Too Many Requests status
        res.status(429).send('Too Many Requests!');
      }
    }
  } else {
    // If the IP address is not in the map, add it with an initial count of 1
    requestCountMap.set(ip, { count: 1, lastRequestTime: currentTime });
    next();
  }
}

// Apply the rate-limiting middleware to all routes
app.use(rateLimitMiddleware);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
