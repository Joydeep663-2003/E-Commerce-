const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: { type: Array, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    tag: { type: String, default: 'Home' }
  },
  paymentMethod: { type: String, required: true }, // UPI, Card, NetBanking, COD
  paymentStatus: { type: String, default: 'Paid' },
  totalAmount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Order Placed'
  },
  trackingId: { type: String, required: true },
  estimatedDelivery: { type: String, required: true },
  statusHistory: [{
    status: { type: String },
    date: { type: Date, default: Date.now },
    location: { type: String, default: 'Fulfillment Hub' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Orders', orderSchema);
