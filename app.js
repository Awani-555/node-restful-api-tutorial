const express = require('express');
const app = express(); 
app.use(express.json());
require('dotenv').config();  // Load .env variables
const mongoose = require('mongoose');


const mongoURI = process.env.MONGO_URI;;

const productsRoutes = require('./routes/products');

mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Mount the products routes
app.use('/products', productsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
