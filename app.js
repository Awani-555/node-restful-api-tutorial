const express = require('express');
const app = express();
app.use(express.json());

 const products = [
        { id:1,title:"Book 1",price: 250.50},
        { id:2,title:"Book 2",price: 450.50}
    ]
//GET
app.get('/products', (req,res) => {
   
    res.status(200).json({products});
});

//POST
app.post('/products',(req,res) => {
 // 1. Get the data from the request body
  const { title, price } = req.body;

 // 2. Validate data
  if (!title || !price === undefined) {

 // 3. If missing, send back a 400 Bad Request response with a message
    return res.status(400).json({ message: 'Title and price are required.' });
  }
 // 4. Create a new product object
  const newProduct = {
    id: products.length + 1, // assign a simple incremental id
    title,
    price
  };
  
  // 5. Add the new product to the products array
  products.push(newProduct);

 
  // 6. Respond with 201 Created status and the new product
  res.status(201).json(newProduct);
})


//PUT
app.put('/products/:id', (req,res) => {
    const id =parseInt(req.params.id); // Get the ID from URL and convert to number
    const { title,price } = req.body;// Get new data from body

    //Find index of product to update
    const index = products.findIndex(p => p.id === id);

     if (index === -1) {
    // No product found with that ID
    return res.status(404).json({ message: 'Product not found' });
  }

   // Update the product fields, only if provided
  if (title !== undefined) products[index].title = title;
  if (price !== undefined) products[index].price = price;

  // Respond with updated product
  res.status(200).json(products[index]);
})

//DELETE

app.delete('/products/:id',(req,res) => {
  const id= parseInt(req.params.id);

  const index=products.findIndex(p =>p.id === id);
  if(index === -1){
    return res.status(404).json({message: "Product not found "});
  }

  
  // Remove product from array
  products.splice(index, 1);

  // 204 means "No Content" — success with no response body
  res.status(204).send();

})





app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


module.exports = app;