import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

const BtnRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.isAdmin;
  const [isLogged] = state.isLogged;
  const { addToCart, user } = state;
  const [loading, setLoading] = useState(false);

  const userName = user?.name || '';

  const handleBuy = async () => {
    if (!isLogged) return alert('Please login first.');

    try {
      setLoading(true);
      await addToCart(product);
      setLoading(false);
      alert('Product added to cart!');
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <button onClick={() => deleteProduct(product._id)}>Delete</button>
          <Link to={`/edit_product/${product._id}`}>Edit</Link>
        </>
      ) : (
        <>
          <button onClick={handleBuy} disabled={!isLogged || loading}>
            {loading ? 'Adding...' : 'Buy'}
          </button>
          <Link to={`/detail/${product._id}`}>View</Link>
          {isLogged && <p>Hello, {userName}</p>}
        </>
      )}
    </div>
  );
};

export default BtnRender;
