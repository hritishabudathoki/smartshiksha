import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import logoIcon from '../assets/wow.png';
import '../styles/TeacherDashboard.css';
import { FaClipboardList, FaClipboardCheck, FaBell } from 'react-icons/fa';

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
const initialStudents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', class: '10A' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', class: '10B' },
];

const TeacherDashboard = () => {
  // For demonstration, set role here. Replace with real auth logic as needed.
  const role = 'teacher'; // Change to 'admin' to see CRUD, 'teacher' for view-only
  const [section, setSection] = useState('home');
  const [reports, setReports] = useState(initialReports);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [notifications, setNotifications] = useState(initialNotifications);
  // Reports CRUD
  const [reportEditId, setReportEditId] = useState(null);
  const [reportForm, setReportForm] = useState({ title: '', student: '', status: '' });
  // Attendance CRUD
  const [attendanceEditId, setAttendanceEditId] = useState(null);
  const [attendanceForm, setAttendanceForm] = useState({ student: '', date: '', status: '' });
  // Students CRUD
  const [students, setStudents] = useState(initialStudents);
  const [studentEditId, setStudentEditId] = useState(null);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', class: '' });

  // Modal state for pop-ups
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Reports handlers
  const handleReportEdit = (r) => { setReportEditId(r.id); setReportForm({ title: r.title, student: r.student, status: r.status }); };
  const handleReportDelete = (id) => setReports(reports.filter((r) => r.id !== id));
  const handleReportChange = (e) => setReportForm({ ...reportForm, [e.target.name]: e.target.value });
  const handleReportSave = () => { setReports(reports.map((r) => (r.id === reportEditId ? { ...r, ...reportForm } : r))); setReportEditId(null); setReportForm({ title: '', student: '', status: '' }); };
  const handleReportAdd = () => { setReports([...reports, { id: Date.now(), ...reportForm }]); setReportForm({ title: '', student: '', status: '' }); };

  // Attendance handlers
  const handleAttendanceEdit = (a) => { setAttendanceEditId(a.id); setAttendanceForm({ student: a.student, date: a.date, status: a.status }); };
  const handleAttendanceDelete = (id) => setAttendance(attendance.filter((a) => a.id !== id));
  const handleAttendanceChange = (e) => setAttendanceForm({ ...attendanceForm, [e.target.name]: e.target.value });
  const handleAttendanceSave = () => { setAttendance(attendance.map((a) => (a.id === attendanceEditId ? { ...a, ...attendanceForm } : a))); setAttendanceEditId(null); setAttendanceForm({ student: '', date: '', status: '' }); };
  const handleAttendanceAdd = () => { setAttendance([...attendance, { id: Date.now(), ...attendanceForm }]); setAttendanceForm({ student: '', date: '', status: '' }); };

  // Students handlers
  const handleStudentEdit = (s) => { setStudentEditId(s.id); setStudentForm({ name: s.name, email: s.email, class: s.class }); };
  const handleStudentDelete = (id) => setStudents(students.filter((s) => s.id !== id));
  const handleStudentChange = (e) => setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  const handleStudentSave = () => { setStudents(students.map((s) => (s.id === studentEditId ? { ...s, ...studentForm } : s))); setStudentEditId(null); setStudentForm({ name: '', email: '', class: '' }); };
  const handleStudentAdd = () => { setStudents([...students, { id: Date.now(), ...studentForm }]); setStudentForm({ name: '', email: '', class: '' }); };

  function renderSectionContent() {
    if (section === 'home') {
      return (
        <div className="dashboard-overview">
          <h2>Welcome, Teacher!</h2>
          <div className="overview-cards">
            <div className="overview-card">
              <span className="overview-icon"><FaClipboardList /></span>
              <h3>Total Reports</h3>
              <p>{reports.length}</p>
            </div>
            <div className="overview-card">
              <span className="overview-icon"><FaClipboardCheck /></span>
              <h3>Attendance Records</h3>
              <p>{attendance.length}</p>
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
    if (section === 'reports') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Reports</h2>
          <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)}>
            <div className="crud-form">
              <h3>Add New Report</h3>
              <input type="text" name="title" placeholder="Title" value={reportForm.title} onChange={handleReportChange} />
              <input type="text" name="student" placeholder="Student" value={reportForm.student} onChange={handleReportChange} />
              <input type="text" name="status" placeholder="Status" value={reportForm.status} onChange={handleReportChange} />
              <button className="add-btn" onClick={() => { handleReportAdd(); setShowReportModal(false); }} disabled={!reportForm.title || !reportForm.student || !reportForm.status}>
                Add Report
              </button>
            </div>
          </Modal>
          <table className="crud-table styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Student</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={report.id}>
                  <td>{idx + 1}</td>
                  <td>{reportEditId === report.id ? (
                    <input type="text" name="title" value={reportForm.title} onChange={handleReportChange} />
                  ) : report.title}</td>
                  <td>{reportEditId === report.id ? (
                    <input type="text" name="student" value={reportForm.student} onChange={handleReportChange} />
                  ) : report.student}</td>
                  <td>{reportEditId === report.id ? (
                    <input type="text" name="status" value={reportForm.status} onChange={handleReportChange} />
                  ) : (
                    <span className={`status-badge ${report.status.toLowerCase() === 'reviewed' ? 'status-active' : 'status-pending'}`}>
                      {report.status}
                    </span>
                  )}</td>
                  <td>
                    {reportEditId === report.id ? (
                      <button className="save-btn" onClick={handleReportSave}>Save</button>
                    ) : (
                      <>
                        <button className="edit-btn styled-edit" onClick={() => handleReportEdit(report)}>Edit</button>
                        <button className="delete-btn styled-delete" onClick={() => handleReportDelete(report.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => setShowReportModal(true)}>
            Add Report
          </button>
        </div>
      );
    }
    if (section === 'attendance') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Attendance</h2>
          <Modal isOpen={showAttendanceModal} onClose={() => setShowAttendanceModal(false)}>
            <div className="crud-form">
              <h3>Add New Attendance Record</h3>
              <input type="text" name="student" placeholder="Student" value={attendanceForm.student} onChange={handleAttendanceChange} />
              <input type="date" name="date" placeholder="Date" value={attendanceForm.date} onChange={handleAttendanceChange} />
              <input type="text" name="status" placeholder="Status" value={attendanceForm.status} onChange={handleAttendanceChange} />
              <button className="add-btn" onClick={() => { handleAttendanceAdd(); setShowAttendanceModal(false); }} disabled={!attendanceForm.student || !attendanceForm.date || !attendanceForm.status}>
                Add Attendance
              </button>
            </div>
          </Modal>
          <table className="crud-table styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, idx) => (
                <tr key={a.id}>
                  <td>{idx + 1}</td>
                  <td>{attendanceEditId === a.id ? (
                    <input type="text" name="student" value={attendanceForm.student} onChange={handleAttendanceChange} />
                  ) : a.student}</td>
                  <td>{attendanceEditId === a.id ? (
                    <input type="date" name="date" value={attendanceForm.date} onChange={handleAttendanceChange} />
                  ) : a.date}</td>
                  <td>{attendanceEditId === a.id ? (
                    <input type="text" name="status" value={attendanceForm.status} onChange={handleAttendanceChange} />
                  ) : (
                    <span className={`status-badge ${a.status.toLowerCase() === 'present' ? 'status-present' : a.status.toLowerCase() === 'absent' ? 'status-absent' : 'status-late'}`}>
                      {a.status}
                    </span>
                  )}</td>
                  <td>
                    {attendanceEditId === a.id ? (
                      <button className="save-btn" onClick={handleAttendanceSave}>Save</button>
                    ) : (
                      <>
                        <button className="edit-btn styled-edit" onClick={() => handleAttendanceEdit(a)}>Edit</button>
                        <button className="delete-btn styled-delete" onClick={() => handleAttendanceDelete(a.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => setShowAttendanceModal(true)}>
            Add Attendance
          </button>
        </div>
      );
    }
    if (section === 'notifications') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Notifications</h2>
          <table className="crud-table styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Date</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, idx) => (
                <tr key={notification.id}>
                  <td>{idx + 1}</td>
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
    if (section === 'students') {
      if (role === 'admin') {
        // CRUD table for admin
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Students</h2>
            <Modal isOpen={showStudentModal} onClose={() => setShowStudentModal(false)}>
              <div className="crud-form">
                <h3>Add New Student</h3>
                <input type="text" name="name" placeholder="Name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
                <input type="email" name="email" placeholder="Email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
                <input type="text" name="class" placeholder="Class" value={studentForm.class} onChange={e => setStudentForm({ ...studentForm, class: e.target.value })} />
                <button className="add-btn" onClick={() => { handleStudentAdd(); setShowStudentModal(false); }} disabled={!studentForm.name || !studentForm.email || !studentForm.class}>
                  Add Student
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{idx + 1}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="text" name="name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
                    ) : student.name}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="email" name="email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
                    ) : student.email}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="text" name="class" value={studentForm.class} onChange={e => setStudentForm({ ...studentForm, class: e.target.value })} />
                    ) : student.class}</td>
                    <td>
                      {studentEditId === student.id ? (
                        <button className="save-btn" onClick={() => {
                          handleStudentSave();
                          setStudentEditId(null);
                          setStudentForm({ name: '', email: '', class: '' });
                        }}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => { setStudentEditId(student.id); setStudentForm({ name: student.name, email: student.email, class: student.class }); }}>Edit</button>
                          <button className="delete-btn styled-delete" onClick={() => handleStudentDelete(student.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowStudentModal(true)}>
              Add Student
            </button>
          </div>
        );
      } else {
        // View-only table for teacher
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Students</h2>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{idx + 1}</td>
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
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role={role} section={section} onSectionChange={setSection} />
      <div className="main-content">
        {/* Modern Header */}
        <header className="dashboard-header-bar">
          <div className="header-left">
            <img src={logoIcon} alt="Logo" className="header-logo" />
            <span className="header-appname">SMART SHIKSHA</span>
          </div>
          <div className="header-right">
            <span className="header-role">Teacher</span>
            <span className="header-username">Teacher</span>
            <span className="header-avatar">T</span>
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

// Modal component for pop-ups
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default TeacherDashboard;
