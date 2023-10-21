const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const Catalog = require('./models/Catalog');
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const verifyToken = require('./Middlewares/jwtMiddleware.js');
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your models (User, Catalog, Product, Order) using Mongoose.

// Define routes for authentication, buyer, and seller operations.

// Import your models and required libraries

// Registration route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, type } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      type, // 'buyer' or 'seller'
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      if (typeof password !== 'string' || typeof user.password !== 'string') {
        return res.status(400).json({ error: 'Invalid data type for password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key');
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// API for buyers to get a list of all sellers
app.get('/api/buyer/list-of-sellers',verifyToken, async (req, res) => {
    try {
      // Query the database to retrieve a list of sellers
      const sellers = await User.find({ type: 'seller' });
  
      res.json(sellers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// API for buyers to create an order for a seller by seller_id
app.post('/api/buyer/create-order/:seller_id', verifyToken, async (req, res) => {
    const { seller_id } = req.params;
    const { items } = req.body;

    try {
        // Check if items is an array before iterating
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Items should be an array' });
        }

        // Validate the items and create an order
        const order = new Order({
            buyer: req.user._id, // Assuming you have authentication middleware to identify the buyer
            seller: seller_id, // Set the seller for the order from the URL parameter
            products: items, // Array of objects with product name and quantity
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// API for buyers to get the catalog of a seller by seller_id
app.get('/api/buyer/seller-catalog/:seller_id', verifyToken, async (req, res) => {
    const { seller_id } = req.params;
  
    try {
      // Log the received seller_id for debugging
      console.log('Received seller_id:', seller_id);
  
      // Query the database to retrieve the catalog of the specified seller
      const catalog = await Catalog.findOne({ seller: seller_id }).populate('products');
  
      // Log the retrieved catalog for debugging
      console.log('Retrieved catalog:', catalog);
  
      if (!catalog) {
        return res.status(404).json({ error: 'Seller not found or has no catalog' });
      }
  
      res.json(catalog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  
// API for sellers to create a catalog
app.post('/api/buyer/create-order/:seller_id', verifyToken, async (req, res) => {
    const { seller_id } = req.params;
    const { items } = req.body;

    try {
        // Check if items is an array before iterating
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Items should be an array' });
        }

        const orderItems = items.map(item => ({
            productName: item.productName, // Assuming you have productName in the request
            quantity: item.quantity, // Assuming you have quantity in the request
        }));

        // Validate the items and create an order
        const order = new Order({
            buyer: req.user._id, // Assuming you have authentication middleware to identify the buyer
            seller: seller_id, // Set the seller for the order from the URL parameter
            products: orderItems,
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  
  
app.get('/api/seller/orders', async (req, res) => {
    const { sellerId } = req.body;
  
    try {
      // Query the database to retrieve orders associated with the provided sellerId.
      const orders = await Order.find({ seller: sellerId });
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
  

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
