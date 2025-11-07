import React from 'react';
import BtnRender from './BtnRender'; 

const ProductList = ({ product, deleteProduct }) => {
  const RENDER_URL = 'https://e-commerce-g3k8.onrender.com'; // your Render backend

  const getImageUrl = (imageData) => {
    if (!imageData) return '';
    if (typeof imageData === 'string') {
      return imageData.startsWith('http') ? imageData : `${RENDER_URL}${imageData}`;
    }
    if (typeof imageData === 'object' && imageData.url) {
      return imageData.url.startsWith('http') ? imageData.url : `${RENDER_URL}${imageData.url}`;
    }
    return '';
  };

  const imageUrl = Array.isArray(product.images)
    ? getImageUrl(product.images[0])
    : getImageUrl(product.images);

  return (
    <div className="product_card" style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      width: "220px"
    }}>
      <img
        src={imageUrl}
        alt={product.title || 'Product Image'}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div className="product_box" style={{ padding: '10px' }}>
        <h2 style={{ fontSize: '16px', margin: '5px 0' }}>{product.title}</h2>
        <span style={{ color: '#555', fontWeight: 'bold' }}>₹{product.price}</span>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          {product.description.length > 60
            ? product.description.substring(0, 60) + "..."
            : product.description}
        </p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
};

export default ProductList;
