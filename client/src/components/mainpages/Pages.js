import React from 'react';
import Product from './products/Product';
import Login from './login/Login';
import Register from './login/Register';
import Cart from './cart/Cart';
import DetailProduct from './utils/DetailProducts/DetailProduct';
import OrderHistory from './orders/OrderHistory';
import OrderTracking from './orders/OrderTracking';
import { Route, Routes } from 'react-router-dom';

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Product />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/detail/:id' element={<DetailProduct />} />
      <Route path='/orders' element={<OrderHistory />} />
      <Route path='/tracking/:id' element={<OrderTracking />} />
      <Route path='*' element={<Product />} />
    </Routes>
  );
};

export default Pages;
