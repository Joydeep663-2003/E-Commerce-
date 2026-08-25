import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MdOutlineCheckCircle,
  MdOutlineInventory2,
  MdOutlineLocalShipping,
  MdOutlineDirectionsBike,
  MdOutlineHome,
  MdOutlineSearch
} from 'react-icons/md';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './orders.css';

const stages = [
  { key: 'Order Placed', label: 'Order Placed', sub: 'Confirmed & Logged', icon: MdOutlineCheckCircle },
  { key: 'Processing', label: 'Processing', sub: 'Packed at Fulfillment Hub', icon: MdOutlineInventory2 },
  { key: 'Shipped', label: 'In Transit', sub: 'Dispatched via Express Courier', icon: MdOutlineLocalShipping },
  { key: 'Out for Delivery', label: 'Out for Delivery', sub: 'With Delivery Executive', icon: MdOutlineDirectionsBike },
  { key: 'Delivered', label: 'Delivered', sub: 'Handed over successfully', icon: MdOutlineHome }
];

const OrderTracking = () => {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [orders] = state.orders;

  const [searchId, setSearchId] = useState(id && id !== 'sample' ? id : '');
  const [activeOrder, setActiveOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || '';

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const getImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
    if (typeof img === 'string') return img;
    if (img.url) return img.url;
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
  };

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      const queryId = searchId || id;

      // First look up in global state orders
      let match = orders.find(o => o.trackingId === queryId || o._id === queryId);

      if (!match && queryId && API_URL) {
        try {
          const res = await axios.get(`${API_URL}/api/orders/${queryId}`);
          match = res.data;
        } catch (err) {
          console.log('Tracking lookup note:', err.message);
        }
      }

      // Default sample fallback order if none matched
      if (!match) {
        match = {
          trackingId: queryId || 'IND-84920194',
          orderStatus: 'Shipped',
          estimatedDelivery: 'Tomorrow by 6:00 PM',
          paymentMethod: 'UPI (GPay)',
          totalAmount: 2499,
          shippingAddress: {
            fullName: 'Joydeep Customer',
            phone: '9876543210',
            street: 'Plot 42, Cyber Hub Road',
            city: 'Kolkata',
            state: 'West Bengal',
            pincode: '700001'
          },
          cart: [
            {
              title: 'Pro Cushion Running Shoes',
              price: 2499,
              quantity: 1,
              images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80']
            }
          ],
          statusHistory: [
            { status: 'Order Placed', date: new Date(Date.now() - 86400000).toLocaleString('en-IN'), location: 'Order Confirmed - Mumbai Hub' },
            { status: 'Processing', date: new Date(Date.now() - 43200000).toLocaleString('en-IN'), location: 'Quality Check & Packed' },
            { status: 'Shipped', date: new Date(Date.now() - 14400000).toLocaleString('en-IN'), location: 'In Transit - BlueDart Express' }
          ]
        };
      }

      setActiveOrder(match);
      setLoading(false);
    };

    fetchTracking();
  }, [id, searchId, orders, API_URL]);

  // Determine active stage index (0 to 4)
  const currentStageName = activeOrder?.orderStatus || 'Order Placed';
  let activeStageIdx = stages.findIndex(s => s.key.toLowerCase() === currentStageName.toLowerCase());
  if (activeStageIdx === -1) activeStageIdx = 2; // Default to Shipped in-transit for demo

  const progressPercentage = (activeStageIdx / (stages.length - 1)) * 100;

  return (
    <div className="orders-page-wrapper">
      {/* Search Input Bar */}
      <div className="filter-controls-bar">
        <h2><MdOutlineLocalShipping size={24} color="var(--accent-color)" /> Live Shipment Tracker</h2>

        <div className="nav-search-form" style={{ maxWidth: '320px' }}>
          <MdOutlineSearch size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Enter Tracking ID (e.g. IND-84920194)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>Fetching Live Tracking Information...</h3>
        </div>
      ) : activeOrder && (
        <div className="tracking-stepper-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tracking Number:</div>
              <h2 style={{ color: 'var(--accent-color)' }}>{activeOrder.trackingId}</h2>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Carrier: <b>Express BlueDart Logistics</b>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Estimated Delivery:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success-color)' }}>
                {activeOrder.estimatedDelivery || 'In 2-3 Days'}
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="stepper-timeline">
            <div className="stepper-progress-line">
              <div className="stepper-progress-fill" style={{ width: `${progressPercentage}%` }} />
            </div>

            {stages.map((stg, idx) => {
              const IconComp = stg.icon;
              const isCompleted = idx < activeStageIdx;
              const isActive = idx === activeStageIdx;

              return (
                <div
                  key={stg.key}
                  className={`stepper-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="node-icon-circle">
                    <IconComp size={22} />
                  </div>
                  <div className="node-label">{stg.label}</div>
                  <div className="node-subtext">{stg.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Shipment History Timeline Logs */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '16px' }}>Shipment Updates Timeline</h4>
            <div className="timeline-logs-list">
              {activeOrder.statusHistory?.map((log, idx) => (
                <div key={idx} className="timeline-log-item">
                  <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{log.status}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{log.location} &bull; {log.date ? new Date(log.date).toLocaleString('en-IN') : 'Just Now'}</div>
                </div>
              )) || (
                <div className="timeline-log-item">
                  <div style={{ fontWeight: 800 }}>In Transit</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Regional Hub &bull; Package scanned and en route</div>
                </div>
              )}
            </div>
          </div>

          {/* Itemized Breakdown & Delivery Address */}
          <div className="form-grid-2" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <h4>Shipping Address</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
                <b>{activeOrder.shippingAddress?.fullName}</b> ({activeOrder.shippingAddress?.phone})<br />
                {activeOrder.shippingAddress?.street}<br />
                {activeOrder.shippingAddress?.city}, {activeOrder.shippingAddress?.state} - {activeOrder.shippingAddress?.pincode}
              </p>
            </div>

            <div>
              <h4>Package Items ({activeOrder.cart?.length || 1})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                {activeOrder.cart?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={Array.isArray(item.images) ? getImageUrl(item.images[0]) : getImageUrl(item.images)} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.title} &times; {item.quantity || 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
