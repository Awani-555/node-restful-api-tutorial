const express = require('express');
const morgan = require('morgan');
const app = express(); 
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

require('dotenv').config();  // Load .env variables
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);

// Protect product routes with JWT middleware
app.use('/products', authenticateToken, productsRoutes);

const mongoURI = process.env.MONGO_URI;;



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
