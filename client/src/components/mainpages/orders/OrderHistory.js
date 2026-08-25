import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLocalShipping, MdOutlineReceipt, MdOutlineSearch } from 'react-icons/md';
import { GlobalState } from '../../../GlobalState';
import './orders.css';

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [orders] = state.orders;

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const getImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
    
    let path = '';
    if (typeof img === 'string') {
      path = img;
    } else if (img.url) {
      path = img.url;
    } else {
      return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
    }

    if (path.startsWith('http') || path.startsWith('data:image')) {
      return path;
    }

    const API_URL = process.env.REACT_APP_API_URL || '';
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_URL}${normalizedPath}`;
  };

  return (
    <div className="orders-page-wrapper">
      <div className="filter-controls-bar">
        <h2><MdOutlineReceipt size={24} color="var(--accent-color)" /> My Orders & Shipment History</h2>
        <Link to="/tracking/sample" className="btn-secondary">
          <MdOutlineSearch size={18} /> Track Any Order ID
        </Link>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px' }}>
          <MdOutlineLocalShipping size={64} color="var(--text-muted)" />
          <h3>No Orders Found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>You haven't placed any orders yet.</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((ord) => (
            <div key={ord._id || ord.trackingId} className="order-history-card">
              <div className="order-card-header">
                <div>
                  <div className="order-id-text">Tracking ID: {ord.trackingId}</div>
                  <div className="order-date-text">Placed on: {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge badge-success">{ord.orderStatus || 'Order Placed'}</span>
                  <span style={{ fontSize: '18px', fontWeight: 800 }}>{formatINR(ord.totalAmount)}</span>
                </div>
              </div>

              <div className="order-items-preview">
                {ord.cart?.map((item, idx) => (
                  <img
                    key={idx}
                    src={Array.isArray(item.images) ? getImageUrl(item.images[0]) : getImageUrl(item.images)}
                    alt={item.title}
                    className="order-item-thumb"
                    title={item.title}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Delivery to: <b>{ord.shippingAddress?.city || 'India'}</b> ({ord.shippingAddress?.pincode})
                </span>

                <Link to={`/tracking/${ord.trackingId}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  <MdOutlineLocalShipping size={16} /> Track Status Live
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
