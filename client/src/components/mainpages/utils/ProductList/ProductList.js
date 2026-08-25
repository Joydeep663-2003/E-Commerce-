import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineStar, MdOutlineAddShoppingCart, MdOutlineVisibility } from 'react-icons/md';
import { GlobalState } from '../../../../GlobalState';
import './productlist.css';

const ProductList = ({ product }) => {
  const state = useContext(GlobalState);
  const { addToCart } = state;

  const getImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
    if (typeof img === 'string') return img;
    if (img.url) return img.url;
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
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

  return (
    <div className="product_card">
      <div className="product-img-wrapper">
        <img src={primaryImage} alt={product.title || 'Product'} />
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
