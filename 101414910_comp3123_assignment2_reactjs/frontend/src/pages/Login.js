import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css' 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/v1/user/login`, {
        email,
        password,
      });
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/employees'); // Redirect to a protected route after login
    } catch (error) {
      if (error.response) {
        console.error('Login error response:', error.response);
        alert(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Login error request:', error.request);
        alert('Login failed: No response received from server');
      } else {
        console.error('Login error:', error.message);
        alert('Login failed: An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
