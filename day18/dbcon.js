// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/scnodejs')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));


// Function to add a new user to the MongoDB database.
async function addUserToDatabase(users) {
    try {
      // Create a new User object
      const newUser = new User(users);
      // Save the user to the database
      await newUser.save();
      console.log('User added successfully:', newUser);
    } catch (error) {
      console.error('Error adding user:', error);
    }
}

// Test the function
addUserToDatabase({ username: 'hermionegranger', email: 'hermione007@gmail.com' });
addUserToDatabase({ username: 'alexranger', email: 'alexranger010@gmail.com' });


// Create Express app
const app = express();
const PORT = 3000;

// Express route to get all users from MongoDB
// Express route to get all users from MongoDB
async function getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
}


// Define Express route
app.get('/users', getAllUsers);

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
