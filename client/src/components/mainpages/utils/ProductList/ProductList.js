import React from 'react';
import BtnRender from './BtnRender'; 

const ProductList = ({ product, deleteProduct }) => {
  const getImageUrl = (imageData) => {
    if (!imageData) return '';
    if (typeof imageData === 'string') {
      return imageData.startsWith('http') ? imageData : `http://localhost:5000${imageData}`;
    }
    if (typeof imageData === 'object' && imageData.url) {
      return imageData.url.startsWith('http') ? imageData.url : `http://localhost:5000${imageData.url}`;
    }
    return '';
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

