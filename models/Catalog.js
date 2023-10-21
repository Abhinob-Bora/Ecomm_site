const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // Other product properties
});

const catalogSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  products: [productSchema],
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;
