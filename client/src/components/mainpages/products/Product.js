import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
import axios from 'axios';

const Products = () => {
  const state = useContext(GlobalState);

  const [products, setProducts] = state?.productAPI?.products || [[], () => {}];
  const [isAdmin] = state?.userAPI?.isAdmin || [false];

  // Fetch products from Render backend on mount
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

  const handleCheck = (id) => {
    const newProducts = products.map(product =>
      product._id === id ? { ...product, checked: !product.checked } : product
    );
    setProducts(newProducts);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      await axios.post('https://e-commerce-g3k8.onrender.com/api/destroy', { public_id });
      await axios.delete(`https://e-commerce-g3k8.onrender.com/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error deleting product');
    }
  };

  if (!products.length) return <p>Loading products...</p>;

  return (
    <div className="products">
      {products.map(product => product._id && (
        <ProductList
          key={product._id}
          product={{
            ...product,
            images: Array.isArray(product.images)
              ? product.images.map(img => `https://e-commerce-g3k8.onrender.com${img}`)
              : [`https://e-commerce-g3k8.onrender.com${product.images}`]
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
