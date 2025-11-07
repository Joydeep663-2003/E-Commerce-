import React from 'react';
import BtnRender from './BtnRender';

const ProductList = ({ product, deleteProduct }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const getImageUrl = (image) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `${API_URL}${image}`;
  };

  const imageUrl = Array.isArray(product.images)
    ? getImageUrl(product.images[0])
    : getImageUrl(product.images);

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
