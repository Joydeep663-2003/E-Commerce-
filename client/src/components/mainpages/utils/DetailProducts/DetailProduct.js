import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MdOutlineStar,
  MdOutlineAddShoppingCart,
  MdOutlineVerifiedUser,
  MdOutlineLocalShipping,
  MdOutlineAssignmentReturn
} from 'react-icons/md';
import { GlobalState } from '../../../../GlobalState';
import ProductList from '../ProductList/ProductList';
import axios from 'axios';
import './detailProduct.css';

const DetailProduct = () => {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const API_URL = process.env.REACT_APP_API_URL || '';

  const [products] = state.productAPI?.products || [[]];
  const { addToCart } = state;

  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let product = products.find(p => p._id === id || p.product_id === id);
        if (!product && API_URL) {
          const res = await axios.get(`${API_URL}/api/products/${id}`);
          product = res.data;
        }
        setDetailProduct(product || null);
        setSelectedImgIndex(0);
      } catch (err) {
        console.error('Error fetching product detail:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, products, API_URL]);

  if (loading) {
    return (
      <div className="detail-page-wrapper" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Loading Product Details...</h2>
      </div>
    );
  }

  if (!detailProduct) {
    return (
      <div className="detail-page-wrapper" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '16px' }}>Back to Shop</Link>
      </div>
    );
  }

  // Extract images array
  const rawImages = detailProduct.images;
  const imagesList = Array.isArray(rawImages)
    ? rawImages.map(img => typeof img === 'string' ? img : img.url || '')
    : [typeof rawImages === 'string' ? rawImages : rawImages?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];

  const activeImage = imagesList[selectedImgIndex] || imagesList[0];

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const originalPrice = detailProduct.originalPrice || Math.floor((detailProduct.price || 0) * 1.35);
  const discountPercent = Math.round(((originalPrice - detailProduct.price) / originalPrice) * 100);

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === detailProduct.category && (p._id !== detailProduct._id && p.product_id !== detailProduct.product_id))
    .slice(0, 4);

  return (
    <div className="detail-page-wrapper">
      <div className="detail-product-container">
        {/* Gallery Section */}
        <div className="gallery-section">
          <div className="main-image-box">
            <img src={activeImage} alt={detailProduct.title} />
          </div>
          {imagesList.length > 1 && (
            <div className="thumbnails-row">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`thumbnail-btn ${selectedImgIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImgIndex(idx)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="detail-info-box">
          <span className="badge badge-accent" style={{ width: 'fit-content' }}>
            {detailProduct.category}
          </span>
          <h1>{detailProduct.title}</h1>

          <div className="detail-rating-row">
            <span className="rating-badge">
              <MdOutlineStar color="#f59e0b" size={18} /> {detailProduct.rating || 4.5}
            </span>
            <span className="review-count">({detailProduct.numReviews || 120} Customer Reviews)</span>
            <span className="badge badge-success">In Stock</span>
          </div>

          <div className="detail-price-box">
            <span className="detail-current-price">{formatINR(detailProduct.price)}</span>
            {originalPrice > detailProduct.price && (
              <>
                <span className="detail-original-price">{formatINR(originalPrice)}</span>
                <span className="detail-discount-badge">{discountPercent}% OFF</span>
              </>
            )}
          </div>

          <p className="detail-description">{detailProduct.description}</p>

          <div className="guarantee-grid">
            <div className="guarantee-card">
              <MdOutlineLocalShipping size={22} color="var(--accent-color)" />
              <div>Free Express Shipping</div>
            </div>
            <div className="guarantee-card">
              <MdOutlineVerifiedUser size={22} color="var(--success-color)" />
              <div>1-Year Brand Warranty</div>
            </div>
            <div className="guarantee-card">
              <MdOutlineAssignmentReturn size={22} color="var(--warning-color)" />
              <div>7-Day Easy Replacement</div>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-add-cart-large" onClick={() => addToCart(detailProduct)}>
              <MdOutlineAddShoppingCart size={22} /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3>Similar Items You Might Like</h3>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductList key={p._id || p.product_id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
