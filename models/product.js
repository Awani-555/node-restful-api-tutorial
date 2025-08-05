const mongoose =require ('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:String,
  price:Number
});



//const products = [
 // { id: 1, title: "Book 1", price: 250.5 },
 // { id: 2, title: "Book 2", price: 450.5 }
//];

module.exports = mongoose.model('Product', productSchema);