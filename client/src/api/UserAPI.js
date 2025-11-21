import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/info`, {
          headers: { Authorization: token },
          withCredentials: true,
        });

        setIsLogged(true);
        setUser(res.data);
        setIsAdmin(res.data.role === 1);
      } catch (err) {
        console.log("❌ User Error:", err.message);
      }
    };

    getUser();
  }, [token, API_URL]);

  const addToCart = async (product) => {
    const check = cart.every((item) => item._id !== product._id);
    if (!check) return alert("This product is already in your cart.");

    const newCart = [...cart, { ...product, quantity: 1 }];
    setCart(newCart);

    try {
      await axios.patch(
        `${API_URL}/api/user/addcart`,
        { cart: newCart },
        {
          headers: { Authorization: token },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log("❌ Cart Error:", err.message);
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    addToCart,
  };
};

export default UserAPI;
