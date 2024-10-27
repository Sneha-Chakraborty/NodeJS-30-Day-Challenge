// Step 1: Define Mongoose schema for product
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Step 2: Create Mongoose model based on schema
const Product = mongoose.model('Product', productSchema);

// Step 3: Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1/db24feb').then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});


// Step 4: Implement Express routes for CRUD operations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//This middleware is required to parse JSON request bodies. 
//Without it, Express won't be able to parse the JSON data sent in the request.
// app.use(express.json({extended: false}));
//app.use(bodyParser.json());

// app.use((req, res, next) => {
//     console.log('Request Body:', req.body);
//     next();
// });


// Parse application/json using body-parser.
app.use(bodyParser.json());

app.use(function(req, res, next){
    var data = "";
    req.on('data', function(chunk){ 
        data += chunk;
    });
    req.on('end', function(){
        req.rawBody = data;
        try {
            req.jsonBody = JSON.parse(data);
        } catch (error) {
            req.jsonBody = {}; // Set empty object if parsing fails
        }
        next();
    });
});


// Logging middleware.
app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    console.log('Raw Body:', req.rawBody);
    console.log('JSON Body:', req.jsonBody);
    next();
});


// Create a new product.
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.jsonBody);
        console.log(req.jsonBody);
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Retrieve all products.
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a product.
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete a product.
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = 3000;
// Start the server.
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
