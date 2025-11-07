import React from 'react';
import BtnRender from './BtnRender';

const RENDER_URL = 'https://e-commerce-g3k8.onrender.com'; // Render backend URL

const ProductList = ({ product, deleteProduct }) => {
  // Make sure images array exists
  const imageUrl = Array.isArray(product.images) && product.images.length > 0
    ? (product.images[0].startsWith('http') ? product.images[0] : `${RENDER_URL}${product.images[0]}`)
    : '';

  return (
    <div className="product_card">
      <img src={imageUrl} alt={product.title || 'Product Image'} />
      <div className="product_box">
        <h2>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
};

export default ProductList;
