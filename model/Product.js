const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({

    name: String, 
    price: Number, 
    description: String,
    image: String, 
    prices: []
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;