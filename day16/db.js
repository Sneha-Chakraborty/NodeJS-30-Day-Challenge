const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using Mongoose
 */
async function connectToMongoDB() {
  try {
    // MongoDB connection string
    const connectionString = 'mongodb://127.0.0.1/mydatabase';

    // Connect to MongoDB
    await mongoose.connect(connectionString);

    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Call the function to establish the MongoDB connection
connectToMongoDB();
