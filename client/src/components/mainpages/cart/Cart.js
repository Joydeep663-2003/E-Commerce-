import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdOutlineDelete,
  MdOutlineShoppingBag,
  MdOutlinePinDrop,
  MdOutlinePayment,
  MdOutlineCheckCircle,
  MdOutlineQrCode2,
  MdOutlineCreditCard,
  MdOutlineAccountBalance,
  MdOutlineLocalShipping
} from 'react-icons/md';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './cart.css';

const Cart = () => {
  const state = useContext(GlobalState);
  const navigate = useNavigate();

  const [cart, setCart] = state.cart;
  const [token] = state.token;
  const [isLogged] = state.isLogged;
  const [user] = state.user;
  const { showToast } = state;

  const [activeStep, setActiveStep] = useState(1); // 1 = Cart, 2 = Address, 3 = Payment, 4 = Confirmation

  // Shipping Address State
  const [address, setAddress] = useState({
    fullName: user?.name || 'Joydeep Customer',
    phone: '9876543210',
    street: 'Plot 42, Sector 18, Cyber Hub Road',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700001',
    tag: 'Home'
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Card, NetBanking, COD
  const [upiId, setUpiId] = useState('joydeep@paytm');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 8910 2341 9081',
    expiry: '08/29',
    cvv: '891',
    name: user?.name || 'Joydeep Customer'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const getImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
    
    let path = '';
    if (typeof img === 'string') {
      path = img;
    } else if (img.url) {
      path = img.url;
    } else {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
    }

    if (path.startsWith('http') || path.startsWith('data:image')) {
      return path;
    }

    const API_URL = process.env.REACT_APP_API_URL || '';
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_URL}${normalizedPath}`;
  };

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item._id === id || item.product_id === id) {
        const newQty = (item.quantity || 1) + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem('guestCart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id && item.product_id !== id);
    setCart(updated);
    localStorage.setItem('guestCart', JSON.stringify(updated));
    showToast('Item removed from cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const gstTax = Math.round(subtotal * 0.18);
  const totalAmount = subtotal > 0 ? subtotal + gstTax : 0;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.street || !address.city || !address.pincode) {
      return alert('Please fill in all shipping address fields.');
    }
    setActiveStep(3);
  };

  const handlePlaceOrder = async () => {
    if (!isLogged) {
      alert('Please Sign In to place your order.');
      return navigate('/login');
    }

    setIsProcessing(true);
    const trackingId = 'IND-' + Math.floor(10000000 + Math.random() * 90000000);

    const newOrderObj = {
      user: user?._id || 'user_demo_123',
      name: address.fullName,
      email: user?.email || 'customer@example.com',
      cart,
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'Paid via ' + paymentMethod,
      totalAmount,
      trackingId,
      estimatedDelivery: 'In 3 to 4 Days (Express Delivery)',
      orderStatus: 'Order Placed',
      createdAt: new Date().toISOString()
    };

    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      if (API_URL && token) {
        await axios.post(`${API_URL}/api/orders`, newOrderObj, {
          headers: { Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}` },
          withCredentials: true
        });
      }
    } catch (err) {
      console.log('Order sync note:', err.message);
    } finally {
      // Save order in local orders array
      setPlacedOrder(newOrderObj);
      setCart([]);
      localStorage.removeItem('guestCart');
      setIsProcessing(false);
      setActiveStep(4);
      showToast('🎉 Order placed successfully!');
    }
  };

  if (activeStep === 4 && placedOrder) {
    return (
      <div className="cart-checkout-page">
        <div className="address-form-box" style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
          <MdOutlineCheckCircle size={64} color="var(--success-color)" />
          <h2>Order Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Thank you for shopping with IndiaMart.</p>
          
          <div className="specs-list" style={{ textAlign: 'left', marginTop: '20px' }}>
            <div><b>Tracking ID:</b> <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>{placedOrder.trackingId}</span></div>
            <div><b>Delivery Address:</b> {placedOrder.shippingAddress.street}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.pincode}</div>
            <div><b>Payment Method:</b> {placedOrder.paymentMethod}</div>
            <div><b>Total Amount Paid:</b> {formatINR(placedOrder.totalAmount)}</div>
            <div><b>Status:</b> <span className="badge badge-success">Order Placed - Processing</span></div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
            <Link to={`/tracking/${placedOrder.trackingId}`} className="btn-primary">
              <MdOutlineLocalShipping size={20} /> Track Your Order Live
            </Link>
            <Link to="/" className="btn-secondary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-checkout-page">
      {/* Checkout Stepper Bar */}
      <div className="checkout-stepper">
        <div className={`step-item ${activeStep >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span>Shopping Cart</span>
        </div>
        <div className="step-divider" />
        <div className={`step-item ${activeStep >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span>Shipping Address</span>
        </div>
        <div className="step-divider" />
        <div className={`step-item ${activeStep >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span>Payment System</span>
        </div>
      </div>

      {cart.length === 0 && activeStep === 1 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <MdOutlineShoppingBag size={64} color="var(--text-muted)" />
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Explore over 100 top quality products across multiple categories!</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>Explore Shop</Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Main Step Content */}
          <div className="cart-main-content">
            {/* Step 1: Cart Items */}
            {activeStep === 1 && (
              <div className="cart-items-section">
                {cart.map((item) => {
                  const itemImg = Array.isArray(item.images) ? getImageUrl(item.images[0]) : getImageUrl(item.images);
                  return (
                    <div key={item._id || item.product_id} className="cart-card">
                      <img src={itemImg} alt={item.title} />
                      <div className="cart-card-info">
                        <h3>{item.title}</h3>
                        <span className="cart-price-text">{formatINR(item.price)}</span>

                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateQuantity(item._id || item.product_id, -1)}>-</button>
                          <span className="qty-count">{item.quantity || 1}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item._id || item.product_id, 1)}>+</button>
                        </div>
                      </div>
                      <MdOutlineDelete
                        size={22}
                        className="remove-item-btn"
                        onClick={() => removeItem(item._id || item.product_id)}
                        title="Remove Item"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 2: Shipping Address Form */}
            {activeStep === 2 && (
              <form className="address-form-box" onSubmit={handleAddressSubmit}>
                <h3><MdOutlinePinDrop size={22} color="var(--accent-color)" /> Shipping Address</h3>

                <div className="form-grid-2">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="input-wrapper"
                      style={{ padding: '10px 14px' }}
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label>Mobile Phone Number</label>
                    <input
                      type="text"
                      className="input-wrapper"
                      style={{ padding: '10px 14px' }}
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>House No. / Street Address / Area</label>
                  <input
                    type="text"
                    className="input-wrapper"
                    style={{ padding: '10px 14px' }}
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="input-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="input-wrapper"
                      style={{ padding: '10px 14px' }}
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="input-wrapper"
                      style={{ padding: '10px 14px' }}
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="input-group">
                    <label>Pincode / Postal Code</label>
                    <input
                      type="text"
                      className="input-wrapper"
                      style={{ padding: '10px 14px' }}
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label>Address Tag</label>
                    <select
                      className="sort-select"
                      style={{ height: '42px' }}
                      value={address.tag}
                      onChange={(e) => setAddress({ ...address, tag: e.target.value })}
                    >
                      <option value="Home">Home (All-Day Delivery)</option>
                      <option value="Work">Work / Office (9 AM - 6 PM)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setActiveStep(1)}>Back to Cart</button>
                  <button type="submit" className="btn-primary">Proceed to Payment &rarr;</button>
                </div>
              </form>
            )}

            {/* Step 3: Payment Options */}
            {activeStep === 3 && (
              <div className="payment-methods-box">
                <h3><MdOutlinePayment size={22} color="var(--accent-color)" /> Choose Payment Method</h3>

                {/* Payment Option: UPI */}
                <div
                  className={`payment-option-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('UPI')}
                >
                  <MdOutlineQrCode2 size={28} color="var(--accent-color)" />
                  <div>
                    <div style={{ fontWeight: 800 }}>UPI (GPay / PhonePe / Paytm / BHIM)</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scan QR or enter Virtual Payment Address</div>
                  </div>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="upi-qr-box">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=indiamart@upi&pn=IndiaMart%20Store&am=1499"
                      alt="UPI Payment QR Code"
                    />
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Scan QR using any UPI App to Pay</div>
                    <div className="input-group" style={{ width: '100%', maxWidth: '300px' }}>
                      <input
                        type="text"
                        className="input-wrapper"
                        placeholder="Enter UPI ID (e.g. mobile@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        style={{ padding: '8px 12px', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                )}

                {/* Payment Option: Card */}
                <div
                  className={`payment-option-card ${paymentMethod === 'Card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('Card')}
                >
                  <MdOutlineCreditCard size={28} color="var(--success-color)" />
                  <div>
                    <div style={{ fontWeight: 800 }}>Credit / Debit Card</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Visa, MasterCard, RuPay, Maestro accepted</div>
                  </div>
                </div>

                {paymentMethod === 'Card' && (
                  <div className="address-form-box" style={{ border: 'none', padding: '10px 0' }}>
                    <div className="input-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        className="input-wrapper"
                        style={{ padding: '8px 12px' }}
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      />
                    </div>
                    <div className="input-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        className="input-wrapper"
                        style={{ padding: '8px 12px' }}
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="form-grid-2">
                      <div className="input-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          className="input-wrapper"
                          style={{ padding: '8px 12px' }}
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        />
                      </div>
                      <div className="input-group">
                        <label>CVV</label>
                        <input
                          type="password"
                          className="input-wrapper"
                          style={{ padding: '8px 12px' }}
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Option: Net Banking */}
                <div
                  className={`payment-option-card ${paymentMethod === 'NetBanking' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('NetBanking')}
                >
                  <MdOutlineAccountBalance size={28} color="var(--warning-color)" />
                  <div>
                    <div style={{ fontWeight: 800 }}>Net Banking</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>HDFC, SBI, ICICI, Axis, Kotak</div>
                  </div>
                </div>

                {/* Payment Option: COD */}
                <div
                  className={`payment-option-card ${paymentMethod === 'COD' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <MdOutlineLocalShipping size={28} color="var(--text-main)" />
                  <div>
                    <div style={{ fontWeight: 800 }}>Cash on Delivery (COD)</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pay cash or UPI upon delivery</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setActiveStep(2)}>Back to Address</button>
                  <button type="button" className="btn-primary" onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? 'Processing Order...' : `Pay ${formatINR(totalAmount)} & Confirm`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items Total ({cart.reduce((sum, i) => sum + (i.quantity || 1), 0)})</span>
              <span>{formatINR(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>GST Tax (18%)</span>
              <span>{formatINR(gstTax)}</span>
            </div>

            <div className="summary-row">
              <span>Express Delivery</span>
              <span style={{ color: 'var(--success-color)', fontWeight: 700 }}>FREE</span>
            </div>

            <div className="summary-row total">
              <span>Total Payable</span>
              <span>{formatINR(totalAmount)}</span>
            </div>

            {activeStep === 1 && (
              <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setActiveStep(2)}>
                Proceed to Shipping Address &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
