import { useEffect, useState } from 'react';
import axios from 'axios';
import { seed100ProductsList } from './seedData';

const ProductAPI = () => {
  const [products, setProducts] = useState(seed100ProductsList);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(seed100ProductsList.length);

  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (!API_URL) return;

        const res = await axios.get(
          `${API_URL}/api/products?limit=100&category=${category === 'All' ? '' : category}&search=${search}&sort=${sort}&page=${page}`,
          { withCredentials: true }
        );

        if (res.data && res.data.products) {
          const dbProducts = res.data.products;
          
          // Map database products to ensure they use the new unique images
          const enrichedDbProducts = dbProducts.map(dbP => {
            const matchingSeed = seed100ProductsList.find(sp => 
              sp.product_id === dbP.product_id || 
              sp.title?.toLowerCase() === dbP.title?.toLowerCase()
            );
            if (matchingSeed) {
              return {
                ...dbP,
                images: matchingSeed.images,
                originalPrice: dbP.originalPrice || matchingSeed.originalPrice,
                rating: dbP.rating || matchingSeed.rating,
                numReviews: dbP.numReviews || matchingSeed.numReviews
              };
            }
            return dbP;
          });

          const merged = [...enrichedDbProducts];
          
          seed100ProductsList.forEach(seedProd => {
            const exists = enrichedDbProducts.some(dbP => 
              dbP.product_id === seedProd.product_id || 
              dbP.title?.toLowerCase() === seedProd.title?.toLowerCase()
            );
            if (!exists) {
              merged.push(seedProd);
            }
          });

          setProducts(merged);
          setResult(merged.length);
        }
      } catch (err) {
        console.log('Using instant fast product cache:', err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category, search, sort, page, API_URL]);

  return {
    products: [products, setProducts],
    loading: [loading, setLoading],
    category: [category, setCategory],
    search: [search, setSearch],
    sort: [sort, setSort],
    page: [page, setPage],
    result: [result, setResult]
  };
};

export default ProductAPI;
