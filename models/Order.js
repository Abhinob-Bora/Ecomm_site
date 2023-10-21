const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add seller reference
  products: [{
    product: { type: String, required: true }, // Product name
    quantity: { type: Number, required: true },  // Quantity of the product
  }],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

