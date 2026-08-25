const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  description: { type: String, required: true },
  content: { type: String, default: '' },
  images: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 12 },
  inStock: { type: Boolean, default: true },
  checked: { type: Boolean, default: false },
  sold: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ title: 'text', description: 'text', category: 1 });

module.exports = mongoose.model('Products', productSchema);

