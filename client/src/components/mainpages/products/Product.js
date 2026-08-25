import React, { useContext, useState, useMemo } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
import './products.css';

const defaultCategories = [
  'All',
  'Electronics',
  'Fashion',
  'Footwear',
  'Watches & Accessories',
  'Home & Kitchen',
  'Skincare & Beauty',
  'Gaming & Tech',
  'Books & Office'
];

const Product = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [loading] = state.productAPI.loading;
  const [category, setCategory] = state.productAPI.category;
  const [search] = state.productAPI.search;
  const [sort, setSort] = state.productAPI.sort;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Dynamically compute category counts to ensure every category has items
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    defaultCategories.forEach(cat => {
      if (cat !== 'All') counts[cat] = 0;
    });

    products.forEach(p => {
      if (p.category) {
        const matchingDefault = defaultCategories.find(
          cat => cat !== 'All' && (
            cat.toLowerCase() === p.category.toLowerCase() ||
            p.category.toLowerCase().includes(cat.toLowerCase()) ||
            cat.toLowerCase().includes(p.category.toLowerCase())
          )
        );

        if (matchingDefault) {
          counts[matchingDefault] = (counts[matchingDefault] || 0) + 1;
        } else {
          counts[p.category] = (counts[p.category] || 0) + 1;
        }
      }
    });

    return counts;
  }, [products]);

  const activeCategoryList = useMemo(() => {
    const uniqueFromProducts = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    const merged = ['All'];
    
    defaultCategories.forEach(cat => {
      if (cat !== 'All' && !merged.includes(cat)) merged.push(cat);
    });

    uniqueFromProducts.forEach(cat => {
      const exists = merged.some(m => m.toLowerCase() === cat.toLowerCase());
      if (!exists) merged.push(cat);
    });

    return merged;
  }, [products]);

  // Filter products by category & search
  const filteredProducts = products.filter((prod) => {
    let matchCat = category === 'All';

    if (!matchCat && prod.category) {
      const pCat = prod.category.toLowerCase();
      const selCat = category.toLowerCase();
      matchCat = pCat === selCat || pCat.includes(selCat) || selCat.includes(pCat);
    }

    const matchSearch = !search ||
      prod.title?.toLowerCase().includes(search.toLowerCase()) ||
      prod.description?.toLowerCase().includes(search.toLowerCase()) ||
      prod.category?.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (catName) => {
    setCategory(catName);
    setCurrentPage(1);
  };

  return (
    <div className="products-page-container">
      {/* Category Pills Bar with Item Counts */}
      <div className="category-filter-bar">
        {activeCategoryList.map((catName) => {
          const count = categoryCounts[catName] || 0;
          return (
            <button
              key={catName}
              className={`category-pill ${category === catName ? 'active' : ''}`}
              onClick={() => handleCategoryChange(catName)}
            >
              {catName} <span className="cat-count-badge">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Filter Controls Bar */}
      <div className="filter-controls-bar">
        <div className="results-count">
          Showing {paginatedProducts.length} of {sortedProducts.length} Products
          {category !== 'All' && ` in "${category}"`}
          {search && ` for "${search}"`}
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select" style={{ fontSize: '13px', fontWeight: 600 }}>Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Featured / Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Skeleton Loading State */}
      {loading ? (
        <div className="products-grid">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton skeleton-img"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-price"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h3>No products found matching your search.</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Try switching category or search keywords.</p>
          <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => { setCategory('All'); handleCategoryChange('All'); }}>
            View All Categories
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {paginatedProducts.map((product) => (
            <ProductList key={product._id || product.product_id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &laquo;
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
