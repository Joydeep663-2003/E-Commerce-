import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import axios from 'axios';
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
  const API_URL = process.env.REACT_APP_API_URL;

  const [products] = state.productAPI.products || [[], () => {}];
  const [isLogged] = state.isLogged || [false];
  const addCart = state.userAPI?.addCart || (() => {});

  const [detailProduct, setDetailProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try to find in global products first
        let product = products.find(p => p._id === id);
        if (!product) {
          // If not found, fetch from backend
          const res = await axios.get(`${API_URL}/api/products/${id}`);
          product = res.data;
        }
        setDetailProduct(product);
      } catch (err) {
        console.error('Error fetching product:', err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, products, API_URL]);

  if (loading) return <p>Loading product details...</p>;
  if (!detailProduct) return <p>Product not found.</p>;

  const imageUrl = Array.isArray(detailProduct.images)
    ? getImageUrl(detailProduct.images[0])
    : getImageUrl(detailProduct.images);

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
        <button onClick={handleBuy}>Buy Now</button>
      </div>
    </div>
  );
};

export default DetailProduct;
