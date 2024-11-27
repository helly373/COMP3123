import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/v1/user/signup`, {
        username,
        email,
        password,
      });
      alert('Signup successful! Please login.');
      navigate('/login'); // Redirect to the login page after signup
    } catch (error) {
      if (error.response) {
        // If the request was made and the server responded with a status code outside the 2xx range
        console.error('Signup error response:', error.response);
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || 'An error occurred';
  
        if (statusCode === 400) {
          alert(`Signup failed: ${errorMessage}`);
          if (error.response.data.errors) {
            error.response.data.errors.forEach((err) => {
              console.error(`Validation error: ${err.msg} for field: ${err.param}`);
            });
          }
        } else if (statusCode === 401) {
          alert(`Signup failed: Unauthorized - ${errorMessage}`);
        } else if (statusCode === 500) {
          alert(`Signup failed: Server error - ${errorMessage}`);
        } else {
          alert(`Signup failed: ${errorMessage}`);
        }
      } else if (error.request) {
        // If the request was made but no response was received
        console.error('Signup error request:', error.request);
        alert('Signup failed: No response received from the server. Please check your network connection.');
      } else {
        // If something else happened while setting up the request
        console.error('Signup error:', error.message);
        alert(`Signup failed: An unexpected error occurred - ${error.message}`);
      }
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h2>Signup</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="form-input"
            />
        </div>
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
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Signup;
