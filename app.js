const express = require('express');
const app = express(); 
app.use(express.json());

const productsRoutes = require('./routes/products');

// Mount the products routes
app.use('/products', productsRoutes);


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


module.exports = app;