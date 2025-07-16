import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import loginImage from '../assets/read.png';
import logoIcon from '../assets/wow.png';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
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
          <img src={loginImage} alt="Signup Visual" />
        </div>
        {/* Right Side Card */}
        <div className="login-card">
          <h1 className="logo">
            <img src={logoIcon} alt="Logo" className="logo-icon" />
            Smart Shiksha
          </h1>
          <div className="login-header">
            <h2>CREATE ACCOUNT</h2>
            <p>Please fill in your details</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Signup as</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
          </form>
          <div className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
