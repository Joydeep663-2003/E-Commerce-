import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
import axios from 'axios';

const Products = () => {
  const state = useContext(GlobalState);

  // Products state from GlobalState
  const [products, setProducts] = state?.productAPI?.products || [[], () => {}];
  const [isAdmin] = state?.userAPI?.isAdmin || [false];

  // Toggle product check (admin)
  const handleCheck = (id) => {
    const newProducts = products.map(product =>
      product._id === id ? { ...product, checked: !product.checked } : product
    );
    setProducts(newProducts);
  };

  // Delete product (admin)
  const deleteProduct = async (id, public_id) => {
    try {
      // Call Render backend with full URL
      await axios.post('https://e-commerce-g3k8.onrender.com/api/destroy', { public_id });
      await axios.delete(`https://e-commerce-g3k8.onrender.com/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error deleting product');
    }
  };

  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="products" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {products.map(product => product._id && (
        <ProductList
          key={product._id}
          product={{
            ...product,
            // Prepend Render URL to images for production
            images: product.images.map(img => `https://e-commerce-g3k8.onrender.com${img}`)
          }}
          isAdmin={isAdmin}
          handleCheck={handleCheck}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
};

export default Products;
