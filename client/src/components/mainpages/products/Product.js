import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
import axios from 'axios';

const Products = () => {
  const state = useContext(GlobalState);

  const [products, setProducts] = state?.productAPI?.products || [[], () => {}];
  const [isAdmin] = state?.userAPI?.isAdmin || [false];

  const handleCheck = (id) => {
    const newProducts = products.map(product =>
      product._id === id ? { ...product, checked: !product.checked } : product
    );
    setProducts(newProducts);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      await axios.post('/api/destroy', { public_id });
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error deleting product');
    }
  };

  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="products">
      {products.map(product => product._id && (
        <ProductList
          key={product._id}
          product={product}
          isAdmin={isAdmin}
          handleCheck={handleCheck}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
};

export default Products;
