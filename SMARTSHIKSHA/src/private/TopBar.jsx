import React from 'react';
import wowLogo from '../assets/wow.png';
import './TopBar.css';

const TopBar = ({ username, role }) => (
  <div className="topbar">
    <div className="topbar-left">
      <img src={wowLogo} alt="logo" className="topbar-logo-img" />
      <span className="topbar-logo-text">SMART SHIKSHA</span>
    </div>
    <div className="topbar-right">
      <span className="topbar-user-role">{role}</span>
      <span className="topbar-username">{username}</span>
      <span className="topbar-avatar">👤</span>
    </div>
  </div>
);

export default TopBar;