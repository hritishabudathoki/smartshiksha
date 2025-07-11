import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  Settings, 
  UserPlus, 
  PlayCircle,
  User,
  ChevronRight
} from 'lucide-react';
import './dashboard.css';

const lecturers = [
  {
    id: 1,
    name: "Hikmat Saud",
    role: "Lecturer",
    subject: "Programming for Developers",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Giriraj Rawat",
    role: "Lecturer",
    subject: "Programming And Algorithms",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "Sandis Prajapati",
    role: "Lecturer",
    subject: "Software Development",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 4,
    name: "Ayush Kaji Dangol",
    role: "Lecturer",
    subject: "Database System",
    avatar: "/api/placeholder/60/60"
  }
];

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: BookOpen, label: "Manage Classes" },
  { icon: Users, label: "Manage Class Students", active: false },
  { icon: FileText, label: "Manage Class Lessons" },
  { icon: Settings, label: "Manage Account" },
  { icon: UserPlus, label: "Create New Account" },
  { icon: PlayCircle, label: "Manage Lessons" },
  { icon: Settings, label: "Manage Account" }
];

function Dashboard() {
  const [adminEnabled, setAdminEnabled] = useState(true);
  const [instructorEnabled, setInstructorEnabled] = useState(true);
  const [studentEnabled, setStudentEnabled] = useState(false);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo-container">
            <div className="mascot">
              <div className="graduation-cap"></div>
              <div className="face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="smile"></div>
              </div>
              <div className="thumbs">
                <div className="thumb thumb-left">👍</div>
                <div className="thumb thumb-right">👍</div>
              </div>
            </div>
          </div>
          <div className="logo-text">
            <h1>SMARTSHIKSHA</h1>
            <p>EDUCATION FOR ALL</p>
          </div>
        </div>

        <nav className="nav-menu">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                <IconComponent className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {item.label === "Manage Account" && index === sidebarItems.length - 1 && (
                  <ChevronRight className="nav-arrow" />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <ChevronRight className="back-arrow" />
          </div>
          
          <div className="header-center">
            <div className="toggle-group">
              <div className="toggle-item">
                <span>Admin :</span>
                <div className={`toggle ${adminEnabled ? 'active' : ''}`} onClick={() => setAdminEnabled(!adminEnabled)}>
                  <div className="toggle-slider"></div>
                </div>
              </div>
              <div className="toggle-item">
                <span>Instructor :</span>
                <div className={`toggle ${instructorEnabled ? 'active' : ''}`} onClick={() => setInstructorEnabled(!instructorEnabled)}>
                  <div className="toggle-slider"></div>
                </div>
              </div>
              <div className="toggle-item">
                <span>Student :</span>
                <div className={`toggle ${studentEnabled ? 'active' : ''}`} onClick={() => setStudentEnabled(!studentEnabled)}>
                  <div className="toggle-slider"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="header-right">
            <span className="username">Username: Admin</span>
            <div className="user-avatar">
              <User />
            </div>
          </div>
        </div>

        {/* Lecturers List */}
        <div className="lecturers-container">
          {lecturers.map((lecturer) => (
            <div key={lecturer.id} className="lecturer-card">
              <div className="lecturer-info">
                <div className="lecturer-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="lecturer-details">
                  <h3 className="lecturer-name">{lecturer.name}</h3>
                  <p className="lecturer-role">{lecturer.role}</p>
                  <p className="lecturer-subject">{lecturer.subject}</p>
                </div>
              </div>
              <div className="lecturer-actions">
                <button className="action-btn">Show Class</button>
                <button className="action-btn">Show Student</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;