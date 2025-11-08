import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const state = useContext(GlobalState);
  const userAPI = state.userAPI;
  const [loadingItem, setLoadingItem] = useState(null);

  const [cart] = userAPI?.cart || [[]];

  const removeFromCart = async (id) => {
    if (!userAPI) return;
    setLoadingItem(id);
    await userAPI.removeFromCart(id);
    setLoadingItem(null);
  };

  const getImageUrl = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img.startsWith('http') ? img : `${process.env.REACT_APP_API_URL}${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `${process.env.REACT_APP_API_URL}${img.url}`;
    return '';
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item._id}>
            <img src={getImageUrl(item.images?.[0] || item.images)} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><b>Price:</b> ${item.price}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                disabled={loadingItem === item._id}
              >
                {loadingItem === item._id ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <Link to="/checkout" className="detail-cart-btn">
          Buy Now
        </Link>
      )}
    </div>
  );
};

export default Cart;
