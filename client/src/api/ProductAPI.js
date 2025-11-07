import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading flag

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products', {
          withCredentials: true
        });
        console.log("Fetched Products:", res.data);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return {
    products: [products, setProducts],
    loading,
  };
};

export default ProductAPI;
