import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.cart;
  const { removeFromCart, addToCart } = state;
  const [loadingItem, setLoadingItem] = useState(null);

  const getImageUrl = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img.startsWith('http') ? img : `${process.env.REACT_APP_API_URL}${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `${process.env.REACT_APP_API_URL}${img.url}`;
    return '';
  };

  const incrementQuantity = async (id) => {
    const item = cart.find(i => i._id === id);
    await addToCart({ ...item });
  };

  const decrementQuantity = async (id) => {
    const item = cart.find(i => i._id === id);
    if (item.quantity === 1) return removeFromCart(id);

    const newCart = cart.map(i =>
      i._id === id ? { ...i, quantity: i.quantity - 1 } : i
    );
    setCart(newCart);

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/user/addcart`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token[0]}` },
        body: JSON.stringify({ cart: newCart }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={getImageUrl(item.images?.[0] || item.images)} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><b>Price:</b> ${item.price}</p>
                <p><b>Quantity:</b> {item.quantity}</p>
                <div className="cart-btns">
                  <button onClick={() => decrementQuantity(item._id)}>-</button>
                  <button onClick={() => incrementQuantity(item._id)}>+</button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    disabled={loadingItem === item._id}
                  >
                    {loadingItem === item._id ? 'Removing...' : 'Remove'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout" className="detail-cart-btn">Buy Now</Link>
        </>
      )}
    </div>
  );
};

export default Cart;
