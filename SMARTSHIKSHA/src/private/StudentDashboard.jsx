import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import logoIcon from '../assets/wow.png';
import '../styles/StudentDashboard.css';
import { FaChalkboardTeacher, FaBook, FaMoneyBillWave, FaBell } from 'react-icons/fa';

const initialStudents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', class: '10A' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', class: '10B' },
];
const initialClasses = [
  { id: 1, name: 'Mathematics', teacher: 'Mr. Smith', schedule: 'Mon 10:00' },
  { id: 2, name: 'Science', teacher: 'Ms. Johnson', schedule: 'Wed 12:00' },
];
const initialRoutine = [
  { id: 1, day: 'Monday', class: 'Mathematics', time: '10:00' },
  { id: 2, day: 'Wednesday', class: 'Science', time: '12:00' },
];
const initialLearning = [
  { id: 1, title: 'Algebra Basics', type: 'PDF', link: 'algebra.pdf' },
  { id: 2, title: 'Photosynthesis', type: 'Video', link: 'photosynthesis.mp4' },
];
const initialFees = [
  { id: 1, student: 'John Doe', amount: 5000, status: 'Paid' },
  { id: 2, student: 'Jane Smith', amount: 5000, status: 'Unpaid' },
];
const initialReports = [
  { id: 1, title: 'Math Progress', student: 'John Doe', status: 'Reviewed' },
  { id: 2, title: 'Science Project', student: 'Jane Smith', status: 'Pending' },
];
const initialAttendance = [
  { id: 1, student: 'John Doe', date: '2024-06-01', status: 'Present' },
  { id: 2, student: 'Jane Smith', date: '2024-06-01', status: 'Absent' },
];
const initialNotifications = [
  { id: 1, title: 'Exam Schedule Update', message: 'Mathematics exam rescheduled to Friday', date: '2024-01-15', priority: 'High' },
  { id: 2, title: 'Fee Due Reminder', message: 'Please pay your fees before month end', date: '2024-01-20', priority: 'Medium' },
];

const StudentDashboard = () => {
  const [section, setSection] = useState('home');
  const [students] = useState(initialStudents);
  const [classes] = useState(initialClasses);
  const [routine] = useState(initialRoutine);
  const [learning] = useState(initialLearning);
  const [fees] = useState(initialFees);
  const [reports] = useState(initialReports);
  const [attendance] = useState(initialAttendance);
  const [notifications] = useState(initialNotifications);

  function renderSectionContent() {
    if (section === 'home') {
      return (
        <div className="dashboard-overview">
          <h2>Welcome, Student!</h2>
          <div className="overview-cards">
            <div className="overview-card">
              <span className="overview-icon"><FaChalkboardTeacher /></span>
              <h3>Your Classes</h3>
              <p>{classes.length}</p>
            </div>
            <div className="overview-card">
              <span className="overview-icon"><FaBook /></span>
              <h3>Learning Materials</h3>
              <p>{learning.length}</p>
            </div>
            <div className="overview-card">
              <span className="overview-icon"><FaMoneyBillWave /></span>
              <h3>Unpaid Fees</h3>
              <p>{fees.filter(f => f.status.toLowerCase() !== 'paid').length}</p>
            </div>
            <div className="overview-card">
              <span className="overview-icon"><FaBell /></span>
              <h3>Active Notifications</h3>
              <p>{notifications.length}</p>
            </div>
          </div>
          {/* Why SMART SHIKSHA Section */}
          <div className="why-smart-shiksha-section">
            <h2 style={{ textAlign: 'center', margin: '40px 0 20px' }}>Why SMART SHIKSHA?</h2>
            <div className="why-features-grid">
              <div className="why-feature-card">
                <span role="img" aria-label="web" className="why-feature-icon">🌐</span>
                <div className="why-feature-title">Web Based</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="affordable" className="why-feature-icon">💲</span>
                <div className="why-feature-title">Affordable</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="security" className="why-feature-icon">🛡️</span>
                <div className="why-feature-title">Data Security</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="user" className="why-feature-icon">👤</span>
                <div className="why-feature-title">User Friendly</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="support" className="why-feature-icon">🧑‍💻</span>
                <div className="why-feature-title">24x7 support</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="automation" className="why-feature-icon">⚙️</span>
                <div className="why-feature-title">Automations</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (section === 'students') {
      return (
        <div className="crud-table-card">
          <h2>Students</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'classes') {
      return (
        <div className="crud-table-card">
          <h2>Classes</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Teacher</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td>{cls.name}</td>
                  <td>{cls.teacher}</td>
                  <td>{cls.schedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'routine') {
      return (
        <div className="crud-table-card">
          <h2>Routine</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Class</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {routine.map((r) => (
                <tr key={r.id}>
                  <td>{r.day}</td>
                  <td>{r.class}</td>
                  <td>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'learning') {
      return (
        <div className="crud-table-card">
          <h2>Learning Materials</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {learning.map((l) => (
                <tr key={l.id}>
                  <td>{l.title}</td>
                  <td>{l.type}</td>
                  <td>{l.link}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'fees') {
      return (
        <div className="crud-table-card">
          <h2>Fees</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.id}>
                  <td>{f.student}</td>
                  <td>{f.amount}</td>
                  <td>
                    <span className={`status-badge ${f.status.toLowerCase() === 'paid' ? 'status-active' : 'status-inactive'}`}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'reports') {
      return (
        <div className="crud-table-card">
          <h2>Reports</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.student}</td>
                  <td>
                    <span className={`status-badge ${report.status.toLowerCase() === 'reviewed' ? 'status-active' : 'status-pending'}`}>
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'attendance') {
      return (
        <div className="crud-table-card">
          <h2>Attendance</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{a.student}</td>
                  <td>{a.date}</td>
                  <td>
                    <span className={`status-badge ${a.status.toLowerCase() === 'present' ? 'status-present' : a.status.toLowerCase() === 'absent' ? 'status-absent' : 'status-late'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'notifications') {
      return (
        <div className="crud-table-card">
          <h2>Notifications</h2>
          <table className="crud-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Date</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                  <td>{notification.date}</td>
                  <td>
                    <span className={`status-badge priority-${notification.priority.toLowerCase()}`}>
                      {notification.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section === 'profile') {
      // Example: Replace with real user data if available
      const user = { username: 'studentuser', email: 'student@example.com' };
      return (
        <div className="crud-table-card">
          <h2>Profile</h2>
          <table className="crud-table" style={{ maxWidth: 400, margin: '0 auto' }}>
            <tbody>
              <tr>
                <th style={{ width: '120px' }}>Username</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Password</th>
                <td>••••••••••</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" section={section} onSectionChange={setSection} />
      <div className="main-content">
        {/* Modern Header */}
        <header className="dashboard-header-bar">
          <div className="header-left">
            <img src={logoIcon} alt="Logo" className="header-logo" />
            <span className="header-appname">SMART SHIKSHA</span>
          </div>
          <div className="header-right">
            <span className="header-role">Student</span>
            <span className="header-username">Student</span>
            <span className="header-avatar">S</span>
          </div>
        </header>
        {/* Main Section */}
        <section className="dashboard-section">
          {renderSectionContent()}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
