import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import HeroImage from '../assets/read.png'; 
import logoIcon from '../assets/wow.png';  // Your logo image path

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">
          <img src={logoIcon} alt="Logo" className="logo-image" />
          <span>SMART SHIKSHA</span>
        </div>
        <nav className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <button onClick={() => navigate('/Signup')} className="signup-btn">Signup</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            SMART <br />
            <span className="highlight">EDUCATION FOR ALL</span>
          </h1>
          <p>
            Best LMS platform
          </p>
          <button className="get-started" onClick={() => navigate('/login')}>Get Started</button>
        </div>

        <div className="hero-image">
          <img src={HeroImage} alt="E-learning" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-item">
            <h4>Contact Us</h4>
            <p>📞 9818505045</p>
            <p>📧 smartshiksha@example.com</p>
            <p>🏢 Baneshwor</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
