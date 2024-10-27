const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://127.0.0.1/db25feb').then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});


//Creates an index on the "name" field of the "Product" collection in MongoDB

async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({ name: 1 });
    console.log('Index on "name" field created successfully.');
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

// Call the function to create the index.
createProductNameIndex();
