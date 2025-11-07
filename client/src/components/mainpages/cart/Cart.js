// src/components/mainpages/cart/Cart.js
import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const removeFromCart = state.userAPI.removeFromCart;

  const getImageUrl = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img.startsWith('http') ? img : `http://localhost:5000${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `http://localhost:5000${img.url}`;
    return '';
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> :
        cart.map(item => (
          <div className="cart-item" key={item._id}>
            <img src={getImageUrl(item.images[0] || item.images)} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><b>Price:</b> ${item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))
      }
      {cart.length > 0 && <Link to="/checkout" className="detail-cart-btn">Buy Now</Link>}
    </div>
  );
};

export default Cart;
