import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const state = useContext(GlobalState);
  const [, setToken] = state.token;
  const [, setIsLogged] = state.isLogged;

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/user/login`, user, {
        withCredentials: true,
      });

      localStorage.setItem("firstLogin", true);
      setToken(res.data.accessToken);
      setIsLogged(true);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.msg || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
