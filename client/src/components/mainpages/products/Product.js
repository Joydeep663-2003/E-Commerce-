import React, { useState, useEffect } from 'react';
import ProductList from '../utils/ProductList/ProductList';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL; // Must be set in Vercel

  useEffect(() => {
    const fetchProducts = async () => {
      if (!API_URL) return console.error("API_URL is undefined!");
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [API_URL]);

  if (!products.length) return <p>Loading products...</p>;

  return (
    <div className="products">
      {products.map(product => (
        <ProductList
          key={product._id}
          product={{
            ...product,
            images: Array.isArray(product.images)
              ? product.images.map(img =>
                  img.startsWith('http') ? img : `${API_URL}${img}`
                )
              : [product.images?.startsWith('http') ? product.images : `${API_URL}${product.images}`]
          }}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default Products;
