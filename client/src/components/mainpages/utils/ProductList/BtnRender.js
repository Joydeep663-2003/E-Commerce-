import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

const BtnRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI?.isAdmin || [false];
  const addCart = state.userAPI?.addCart || (() => {});

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <button
            type="button"
            id="btn_delete"
            onClick={() => deleteProduct(product._id, product.public_id)}
          >
            Delete
          </button>
          <Link id="btn_edit" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <button
            type="button"
            id="btn_buy"
            onClick={() => addCart(product)}
          >
            Buy
          </button>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
