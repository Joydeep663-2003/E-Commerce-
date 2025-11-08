import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import './detailProduct.css';

const getImageUrl = (img) => {
  if (!img) return '';
  if (typeof img === 'string') return img.startsWith('http') ? img : `${process.env.REACT_APP_API_URL}${img}`;
  if (img.url) return img.url.startsWith('http') ? img.url : `${process.env.REACT_APP_API_URL}${img.url}`;
  return '';
};

const DetailProduct = () => {
  const { id } = useParams();
  const state = useContext(GlobalState);

  // Get products array from GlobalState
  const [products] = state.productAPI.products || [[], () => {}];

  // Get logged-in state and cart function
  const [isLogged] = state.isLogged || [false];
  const addCart = state.userAPI?.addCart || (() => {});

  const [detailProduct, setDetailProduct] = useState(null);

  // Find the product with the matching ID
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

  // Handle Buy button click
  const handleBuy = () => {
    if (!isLogged) return alert('Please login to add items to cart.');
    addCart(detailProduct);
  };

  return (
    <div className="detail-product">
      <img src={imageUrl} alt={detailProduct.title} className="detail-img" />
      <div className="detail-box">
        <h2>{detailProduct.title}</h2>
        <span>${detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <Link to="/cart" onClick={handleBuy}>
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default DetailProduct;
