const mongoose = require('mongoose');

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1/snc_db_nodejs', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to add a new user to the MongoDB database
async function addUserToDatabase(user) {
  try {
    // Create a new User object
    const newUser = new User(user);
    // Save the user to the database
    await newUser.save();
    console.log('User added successfully:', newUser);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Test the function
addUserToDatabase({ username: 'snehachakraborty', email: 'snc1237@gmail.com' });
