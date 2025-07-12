import React from 'react';
import './DashboardHome.css';
import okImg from '../assets/ok.png';
import wewImg from '../assets/wew.png';
import wowImg from '../assets/wow.png';
import readImg from '../assets/read.png';
import sikshaImg from '../assets/siksha.png';
import lmsFeatureImg from '../assets/lms-feature.jpg';
import lmssImg from '../assets/lmss.jpg';

const DashboardHome = ({ role, stats }) => {
  return (
    <div className="dashboard-home">
      <h1>Welcome, {role}!</h1>
      <p className="dashboard-home-sub">Here is a quick overview of your dashboard.</p>
      <div className="dashboard-home-cards">
        {stats.map((stat, idx) => (
          <div className="dashboard-home-card" key={idx}>
            <div className="dashboard-home-card-icon">{stat.icon}</div>
            <div className="dashboard-home-card-info">
              <div className="dashboard-home-card-value">{stat.value}</div>
              <div className="dashboard-home-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Features Section */}
      <div className="dashboard-features">
        <h2 className="dashboard-features-title">Why SMART SHIKSHA?</h2>
        <div className="dashboard-features-list">
          <div className="dashboard-feature">
            <img src={okImg} alt="Smart Attendance" className="dashboard-feature-img" />
            <div className="dashboard-feature-caption">Smart Attendance</div>
          </div>
          <div className="dashboard-feature">
            <img src={wewImg} alt="Digital Materials" className="dashboard-feature-img" />
            <div className="dashboard-feature-caption">Digital Materials</div>
          </div>
          <div className="dashboard-feature">
            <img src={wowImg} alt="Routine & Calendar" className="dashboard-feature-img" />
            <div className="dashboard-feature-caption">Routine & Calendar</div>
          </div>
          <div className="dashboard-feature">
            <img src={readImg} alt="Announcements" className="dashboard-feature-img" />
            <div className="dashboard-feature-caption">Announcements</div>
          </div>
        </div>
      </div>
      {/* Featured LMS Section */}
      <div className="dashboard-featured-lms">
        <h2 className="dashboard-featured-lms-title" style={{textAlign: 'center', width: '100%', fontWeight: 900, fontSize: '2.2rem', letterSpacing: '1px'}}>Our Features</h2>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '36px', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={lmsFeatureImg} alt="LMS Feature" className="dashboard-featured-lms-img" />
            <div className="dashboard-featured-lms-desc" style={{textAlign: 'center', marginTop: '12px'}}>
              <p style={{margin: 0, fontWeight: 600}}>Learning Management System</p>
              <span style={{fontWeight: 400, fontSize: '0.98rem'}}>
                Our LMS brings together smart attendance, digital materials, routine management, announcements, and more—all in one seamless platform.
              </span>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={lmssImg} alt="LMS Feature 2" className="dashboard-featured-lms-img" />
            <div className="dashboard-featured-lms-desc" style={{textAlign: 'center', marginTop: '12px'}}>
              <p style={{margin: 0, fontWeight: 600}}>Advanced Digital Classroom</p>
              <span style={{fontWeight: 400, fontSize: '0.98rem'}}>
                Experience interactive lessons, real-time feedback, and collaborative tools for teachers and students.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 