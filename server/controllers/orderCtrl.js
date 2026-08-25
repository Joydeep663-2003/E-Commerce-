const Orders = require('../models/orderModel');
const Users = require('../models/userModel');

const orderCtrl = {
  getOrders: async (req, res) => {
    try {
      const orders = await Orders.find({ user: req.user.id }).sort('-createdAt');
      res.json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      let order = await Orders.findById(req.params.id);
      if (!order) {
        order = await Orders.findOne({ trackingId: req.params.id });
      }
      if (!order) return res.status(404).json({ msg: 'Order not found' });
      res.json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('name email');
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      const { cart, shippingAddress, paymentMethod, totalAmount } = req.body;
      if (!cart || cart.length === 0) {
        return res.status(400).json({ msg: 'Cart is empty.' });
      }

      if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
        return res.status(400).json({ msg: 'Please provide a valid shipping address.' });
      }

      // Generate realistic Indian logistics tracking number (e.g. IN-84920194)
      const trackingId = 'IND-' + Math.floor(10000000 + Math.random() * 90000000);

      // Estimated delivery 4-5 days from today
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', options);

      const newOrder = new Orders({
        user: req.user.id,
        name: user.name,
        email: user.email,
        cart,
        shippingAddress,
        paymentMethod: paymentMethod || 'UPI',
        paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'Paid',
        totalAmount,
        trackingId,
        estimatedDelivery,
        statusHistory: [
          { status: 'Order Placed', date: new Date(), location: 'Order Confirmed - Mumbai Hub' }
        ]
      });

      await newOrder.save();

      // Clear user cart after placing order
      await Users.findOneAndUpdate({ _id: req.user.id }, { cart: [] });

      res.json({ msg: 'Order Placed Successfully!', order: newOrder });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { orderStatus, location } = req.body;
      const order = await Orders.findById(req.params.id);
      if (!order) return res.status(404).json({ msg: 'Order not found' });

      order.orderStatus = orderStatus;
      order.statusHistory.push({
        status: orderStatus,
        date: new Date(),
        location: location || 'Regional Transit Center'
      });

      await order.save();
      res.json({ msg: 'Order status updated', order });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = orderCtrl;
