import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImage from '../assets/read.png';
import logoIcon from '../assets/wow.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      // Redirect based on backend role
      const role = data.user.role.toLowerCase();
      navigate(`/dashboard/${role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side Image */}
        <div className="login-image">
          <img src={loginImage} alt="Login Visual" />
        </div>
        {/* Right Side Card */}
        <div className="login-card">
          <h1 className="logo">
            <img src={logoIcon} alt="Logo" className="logo-icon" />
            Smart Shiksha
          </h1>
          <div className="login-header">
            <h2>WELCOME BACK</h2>
            <p>Please enter your details</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {/* Remove role selection, backend determines role */}
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </form>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
