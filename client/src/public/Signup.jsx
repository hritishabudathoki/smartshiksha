import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import loginImage from '../assets/read.png';
import logoIcon from '../assets/wow.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    address: '',
    phone: '',
    school: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally you would send data to your backend here
    console.log('Signup data:', formData);

    alert('Signup successful!');
    navigate('/login'); // Redirect back to login
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="school">School</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter your school"
                required
              />
            </div>

            <button type="submit" className="signin-button">Sign Up</button>
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
