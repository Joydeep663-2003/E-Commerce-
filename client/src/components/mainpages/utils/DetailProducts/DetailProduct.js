import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import './detailProduct.css';

const getImageUrl = (img) => {
  if (!img) return '';
  if (typeof img === 'string') {
    return img.startsWith('http') ? img : `http://localhost:5000${img}`;
  }
  if (img.url) {
    return img.url.startsWith('http') ? img.url : `http://localhost:5000${img.url}`;
  }
  return '';
};

const DetailProduct = () => {
  const { id } = useParams();
  const state = useContext(GlobalState);

  const [products] = state.productAPI.products || [[], () => {}];
  const addCart = state.userAPI?.addCart || (() => {});
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find(product => product._id === id);
      setDetailProduct(found || null);
    }
  }, [id, products]);

  if (products.length > 0 && !detailProduct) return <p>Product not found.</p>;
  if (!detailProduct) return <p>Loading product details...</p>;

  const imageUrl = Array.isArray(detailProduct.images)
    ? getImageUrl(detailProduct.images[0])
    : getImageUrl(detailProduct.images);

  return (
    <div className="detail-product">
      <img src={imageUrl} alt={detailProduct.title} className="detail-img" />
      <div className="detail-box">
        <h2>{detailProduct.title}</h2>
        <span>${detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <Link to="/cart" onClick={() => addCart(detailProduct)}>
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default DetailProduct;
