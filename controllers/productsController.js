const mongoose = require('mongoose');
const Product = require('../models/product');


//GET


    const getAllProducts = async (req, res) => {
    try {
    const products = await Product.find();
    res.status(200).json({ products });
    } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};


//POST
const createProduct = async (req, res) => {
  const { title, price } = req.body;

  if (!title || price === undefined) {
    return res.status(400).json({ message: 'Title and price are required.' });
  }

  try {
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      title,
      price
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

// UPDATE


const updateProduct = async (req, res) => {
  const { id } = req.params; // this is a string like "64e7f4c0c28e3cbb78912345"
  const { title, price } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { title, price },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};


// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};