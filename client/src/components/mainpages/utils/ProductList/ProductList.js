import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineStar, MdOutlineAddShoppingCart, MdOutlineVisibility } from 'react-icons/md';
import { GlobalState } from '../../../../GlobalState';
import './productlist.css';

const ProductList = ({ product }) => {
  const state = useContext(GlobalState);
  const { addToCart } = state;

  const API_URL = process.env.REACT_APP_API_URL || '';

  const getImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
    
    let path = '';
    if (typeof img === 'string') {
      path = img;
    } else if (img.url) {
      path = img.url;
    } else {
      return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
    }

    if (path.startsWith('http') || path.startsWith('data:image')) {
      return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_URL}${normalizedPath}`;
  };

  const primaryImage = Array.isArray(product.images)
    ? getImageUrl(product.images[0])
    : getImageUrl(product.images);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const originalPrice = product.originalPrice || Math.floor((product.price || 0) * 1.3);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const categoryFallbacks = {
    'Electronics': 'https://images.unsplash.com/photo-1496181130207-d3365060fa69?w=800&auto=format&fit=crop&q=80',
    'Fashion': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
    'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    'Watches & Accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    'Skincare & Beauty': 'https://images.unsplash.com/photo-1608248597261-833244670d19?w=800&auto=format&fit=crop&q=80',
    'Gaming & Tech': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    'Books & Office': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
  };

  const getFallback = (cat) => {
    if (!cat) return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
    const found = Object.keys(categoryFallbacks).find(
      key => key.toLowerCase() === cat.toLowerCase() ||
             cat.toLowerCase().includes(key.toLowerCase()) ||
             key.toLowerCase().includes(cat.toLowerCase())
    );
    return found ? categoryFallbacks[found] : 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
  };

  return (
    <div className="product_card">
      <div className="product-img-wrapper">
        <img 
          src={primaryImage} 
          alt={product.title || 'Product'} 
          onError={(e) => { e.target.src = getFallback(product.category); }} 
        />
        {product.category && <span className="category-tag">{product.category}</span>}
        <span className="rating-tag"><MdOutlineStar color="#f59e0b" /> {product.rating || '4.5'}</span>
      </div>

      <div className="product_box">
        <h2>{product.title}</h2>
        <div className="price-row">
          <span className="current-price">{formatINR(product.price)}</span>
          {originalPrice > product.price && (
            <>
              <span className="original-price">{formatINR(originalPrice)}</span>
              <span className="discount-tag">{discountPercent}% OFF</span>
            </>
          )}
        </div>
        <p className="product-desc">{product.description}</p>
      </div>

      <div className="row_btn">
        <button
          className="btn-add-cart"
          onClick={() => addToCart(product)}
        >
          <MdOutlineAddShoppingCart size={18} /> Add
        </button>
        <Link to={`/detail/${product._id || product.product_id}`} className="btn-view-details">
          <MdOutlineVisibility size={18} /> View
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
