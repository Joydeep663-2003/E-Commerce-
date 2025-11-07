import React, { useState, useEffect } from 'react';
import ProductList from '../utils/ProductList/ProductList';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin] = useState(false); // set true if needed

  const API_URL = process.env.REACT_APP_API_URL; // environment variable

  useEffect(() => {
    const fetchProducts = async () => {
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
      {products.map(product => product._id && (
        <ProductList
          key={product._id}
          product={{
            ...product,
            images: product.images.map(img => `${API_URL}${img}`)
          }}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default Products;
