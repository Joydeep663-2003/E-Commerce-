import React, { useState, useEffect } from 'react';
import ProductList from '../utils/ProductList/ProductList';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin] = useState(false); // set true if needed

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://e-commerce-g3k8.onrender.com/api/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  if (!products.length) return <p>Loading products...</p>;

  return (
    <div className="products">
      {products.map(product => product._id && (
        <ProductList
          key={product._id}
          product={{
            ...product,
            images: product.images.map(img => `https://e-commerce-g3k8.onrender.com${img}`)
          }}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default Products;
