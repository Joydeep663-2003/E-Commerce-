import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

const BtnRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.isAdmin;
  const [isLogged] = state.isLogged;
  const userAPI = state.userAPI;
  const [loading, setLoading] = useState(false);

  const userName = userAPI?.user[0]?.name || '';

  const handleBuy = async () => {
    if (!isLogged) return alert('Please login first.');
    if (!userAPI) return alert('User data is loading, please wait.');

    setLoading(true);
    const success = await userAPI.addCart(product);
    setLoading(false);

    if (success) alert('Product added to cart!');
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
          <button onClick={handleBuy} disabled={!isLogged || !userAPI || loading}>
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
