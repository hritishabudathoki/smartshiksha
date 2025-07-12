import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import logoIcon from '../assets/wow.png';
import '../styles/AdminDashboard.css';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaMoneyBillWave, FaBell } from 'react-icons/fa';
import defaultAvatar from '../assets/ok.png';

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
const initialNotifications = [
  { id: 1, title: 'Exam Schedule Update', message: 'Mathematics exam rescheduled to Friday', date: '2024-01-15', priority: 'High' },
  { id: 2, title: 'Fee Due Reminder', message: 'Please pay your fees before month end', date: '2024-01-20', priority: 'Medium' },
];

const SECTION_LABELS = {
  students: 'Manage Students',
  classes: 'Manage Classes',
  routine: 'Manage Routine',
  learning: 'Manage Learning Materials',
  fees: 'Manage Fees',
  notifications: 'Manage Notifications',
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

const AdminDashboard = () => {
  const [section, setSection] = useState('home');

  // Students CRUD
  const [students, setStudents] = useState(initialStudents);
  const [studentEditId, setStudentEditId] = useState(null);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', class: '' });
  // Add modal state for each section
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Classes CRUD
  const [classes, setClasses] = useState(initialClasses);
  const [classEditId, setClassEditId] = useState(null);
  const [classForm, setClassForm] = useState({ name: '', teacher: '', schedule: '' });
  // Add modal state for each section
  const [showClassModal, setShowClassModal] = useState(false);

  // Routine CRUD
  const [routine, setRoutine] = useState(initialRoutine);
  const [routineEditId, setRoutineEditId] = useState(null);
  const [routineForm, setRoutineForm] = useState({ day: '', class: '', time: '' });
  // Add modal state for each section
  const [showRoutineModal, setShowRoutineModal] = useState(false);

  // Learning Materials CRUD
  const [learning, setLearning] = useState(initialLearning);
  const [learningEditId, setLearningEditId] = useState(null);
  const [learningForm, setLearningForm] = useState({ title: '', type: '', link: '' });
  // Add modal state for each section
  const [showLearningModal, setShowLearningModal] = useState(false);

  // Fees CRUD
  const [fees, setFees] = useState(initialFees);
  const [feeEditId, setFeeEditId] = useState(null);
  const [feeForm, setFeeForm] = useState({ student: '', amount: '', status: '' });
  // Add modal state for each section
  const [showFeeModal, setShowFeeModal] = useState(false);

  // Notifications CRUD
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationEditId, setNotificationEditId] = useState(null);
  const [notificationForm, setNotificationForm] = useState({ title: '', message: '', date: '', priority: '' });
  // Add modal state for each section
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // --- Handlers for each CRUD table ---
  // Students
  const handleStudentEdit = (s) => { setStudentEditId(s.id); setStudentForm({ name: s.name, email: s.email, class: s.class }); };
  const handleStudentDelete = (id) => setStudents(students.filter((s) => s.id !== id));
  const handleStudentChange = (e) => setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  const handleStudentSave = () => { setStudents(students.map((s) => (s.id === studentEditId ? { ...s, ...studentForm } : s))); setStudentEditId(null); setStudentForm({ name: '', email: '', class: '' }); };
  const handleStudentAdd = () => { setStudents([...students, { id: Date.now(), ...studentForm }]); setStudentForm({ name: '', email: '', class: '' }); };

  // Classes
  const handleClassEdit = (c) => { setClassEditId(c.id); setClassForm({ name: c.name, teacher: c.teacher, schedule: c.schedule }); };
  const handleClassDelete = (id) => setClasses(classes.filter((c) => c.id !== id));
  const handleClassChange = (e) => setClassForm({ ...classForm, [e.target.name]: e.target.value });
  const handleClassSave = () => { setClasses(classes.map((c) => (c.id === classEditId ? { ...c, ...classForm } : c))); setClassEditId(null); setClassForm({ name: '', teacher: '', schedule: '' }); };
  const handleClassAdd = () => { setClasses([...classes, { id: Date.now(), ...classForm }]); setClassForm({ name: '', teacher: '', schedule: '' }); };

  // Routine
  const handleRoutineEdit = (r) => { setRoutineEditId(r.id); setRoutineForm({ day: r.day, class: r.class, time: r.time }); };
  const handleRoutineDelete = (id) => setRoutine(routine.filter((r) => r.id !== id));
  const handleRoutineChange = (e) => setRoutineForm({ ...routineForm, [e.target.name]: e.target.value });
  const handleRoutineSave = () => { setRoutine(routine.map((r) => (r.id === routineEditId ? { ...r, ...routineForm } : r))); setRoutineEditId(null); setRoutineForm({ day: '', class: '', time: '' }); };
  const handleRoutineAdd = () => { setRoutine([...routine, { id: Date.now(), ...routineForm }]); setRoutineForm({ day: '', class: '', time: '' }); };

  // Learning
  const handleLearningEdit = (l) => { setLearningEditId(l.id); setLearningForm({ title: l.title, type: l.type, link: l.link }); };
  const handleLearningDelete = (id) => setLearning(learning.filter((l) => l.id !== id));
  const handleLearningChange = (e) => setLearningForm({ ...learningForm, [e.target.name]: e.target.value });
  const handleLearningSave = () => { setLearning(learning.map((l) => (l.id === learningEditId ? { ...l, ...learningForm } : l))); setLearningEditId(null); setLearningForm({ title: '', type: '', link: '' }); };
  const handleLearningAdd = () => { setLearning([...learning, { id: Date.now(), ...learningForm }]); setLearningForm({ title: '', type: '', link: '' }); };

  // Fees
  const handleFeeEdit = (f) => { setFeeEditId(f.id); setFeeForm({ student: f.student, amount: f.amount, status: f.status }); };
  const handleFeeDelete = (id) => setFees(fees.filter((f) => f.id !== id));
  const handleFeeChange = (e) => setFeeForm({ ...feeForm, [e.target.name]: e.target.value });
  const handleFeeSave = () => {
    setFees(fees.map((f) => (f.id === feeEditId ? { ...f, ...feeForm, amount: parseInt(feeForm.amount, 10) } : f)));
    setFeeEditId(null);
    setFeeForm({ student: '', amount: '', status: '' });
  };
  const handleFeeAdd = () => {
    setFees([...fees, { id: Date.now(), ...feeForm, amount: parseInt(feeForm.amount, 10) }]);
    setFeeForm({ student: '', amount: '', status: '' });
  };

  // Notifications
  const handleNotificationEdit = (n) => { setNotificationEditId(n.id); setNotificationForm({ title: n.title, message: n.message, date: n.date, priority: n.priority }); };
  const handleNotificationDelete = (id) => setNotifications(notifications.filter((n) => n.id !== id));
  const handleNotificationChange = (e) => setNotificationForm({ ...notificationForm, [e.target.name]: e.target.value });
  const handleNotificationSave = () => { setNotifications(notifications.map((n) => (n.id === notificationEditId ? { ...n, ...notificationForm } : n))); setNotificationEditId(null); setNotificationForm({ title: '', message: '', date: '', priority: '' }); };
  const handleNotificationAdd = () => { setNotifications([...notifications, { id: Date.now(), ...notificationForm }]); setNotificationForm({ title: '', message: '', date: '', priority: '' }); };

  // --- Render Table for Active Section ---
  function renderSectionContent() {
    if (section === 'home') {
      return (
        <div className="dashboard-overview">
          <h2 style={{ fontWeight: 'bold' }}>Welcome, Admin!</h2>
          <div className="overview-cards">
            <div className="overview-card">
              <span className="overview-icon"><FaUserGraduate /></span>
              <h3>Total Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="overview-card">
              <span className="overview-icon"><FaChalkboardTeacher /></span>
              <h3>Total Classes</h3>
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
            <h2 style={{ textAlign: 'center', margin: '40px 0 20px', fontWeight: 'bold' }}>Why SMART SHIKSHA?</h2>
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
    switch (section) {
      case 'students':
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Students</h2>
            <Modal isOpen={showStudentModal} onClose={() => setShowStudentModal(false)}>
              <div className="crud-form">
                <h3>Add New Student</h3>
                <input type="text" name="name" placeholder="Name" value={studentForm.name} onChange={handleStudentChange} />
                <input type="email" name="email" placeholder="Email" value={studentForm.email} onChange={handleStudentChange} />
                <input type="text" name="class" placeholder="Class" value={studentForm.class} onChange={handleStudentChange} />
                <button className="add-btn" onClick={() => { handleStudentAdd(); setShowStudentModal(false); }} disabled={!studentForm.name || !studentForm.email || !studentForm.class}>
                  Add Student
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
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
                      <input type="text" name="name" value={studentForm.name} onChange={handleStudentChange} />
                    ) : student.name}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="email" name="email" value={studentForm.email} onChange={handleStudentChange} />
                    ) : student.email}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="text" name="class" value={studentForm.class} onChange={handleStudentChange} />
                    ) : student.class}</td>
                    <td>
                      {studentEditId === student.id ? (
                        <button className="save-btn" onClick={handleStudentSave}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => handleStudentEdit(student)}>Edit</button>
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
      case 'classes':
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Classes</h2>
            <Modal isOpen={showClassModal} onClose={() => setShowClassModal(false)}>
              <div className="crud-form">
                <h3>Add New Class</h3>
                <input type="text" name="name" placeholder="Class Name" value={classForm.name} onChange={handleClassChange} />
                <input type="text" name="teacher" placeholder="Teacher" value={classForm.teacher} onChange={handleClassChange} />
                <input type="text" name="schedule" placeholder="Schedule" value={classForm.schedule} onChange={handleClassChange} />
                <button className="add-btn" onClick={() => { handleClassAdd(); setShowClassModal(false); }} disabled={!classForm.name || !classForm.teacher || !classForm.schedule}>
                  Add Class
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Teacher</th>
                  <th>Schedule</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, idx) => (
                  <tr key={cls.id}>
                    <td>{idx + 1}</td>
                    <td>{classEditId === cls.id ? (
                      <input type="text" name="name" value={classForm.name} onChange={handleClassChange} />
                    ) : cls.name}</td>
                    <td>{classEditId === cls.id ? (
                      <input type="text" name="teacher" value={classForm.teacher} onChange={handleClassChange} />
                    ) : cls.teacher}</td>
                    <td>{classEditId === cls.id ? (
                      <input type="text" name="schedule" value={classForm.schedule} onChange={handleClassChange} />
                    ) : cls.schedule}</td>
                    <td>
                      {classEditId === cls.id ? (
                        <button className="save-btn" onClick={handleClassSave}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => handleClassEdit(cls)}>Edit</button>
                          <button className="delete-btn styled-delete" onClick={() => handleClassDelete(cls.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowClassModal(true)}>
              Add Class
            </button>
          </div>
        );
      case 'routine':
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Routine</h2>
            <Modal isOpen={showRoutineModal} onClose={() => setShowRoutineModal(false)}>
              <div className="crud-form">
                <h3>Add New Routine</h3>
                <input type="text" name="day" placeholder="Day" value={routineForm.day} onChange={handleRoutineChange} />
                <input type="text" name="class" placeholder="Class" value={routineForm.class} onChange={handleRoutineChange} />
                <input type="text" name="time" placeholder="Time" value={routineForm.time} onChange={handleRoutineChange} />
                <button className="add-btn" onClick={() => { handleRoutineAdd(); setShowRoutineModal(false); }} disabled={!routineForm.day || !routineForm.class || !routineForm.time}>
                  Add Routine
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Day</th>
                  <th>Class</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routine.map((r, idx) => (
                  <tr key={r.id}>
                    <td>{idx + 1}</td>
                    <td>{routineEditId === r.id ? (
                      <input type="text" name="day" value={routineForm.day} onChange={handleRoutineChange} />
                    ) : r.day}</td>
                    <td>{routineEditId === r.id ? (
                      <input type="text" name="class" value={routineForm.class} onChange={handleRoutineChange} />
                    ) : r.class}</td>
                    <td>{routineEditId === r.id ? (
                      <input type="text" name="time" value={routineForm.time} onChange={handleRoutineChange} />
                    ) : r.time}</td>
                    <td>
                      {routineEditId === r.id ? (
                        <button className="save-btn" onClick={handleRoutineSave}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => handleRoutineEdit(r)}>Edit</button>
                          <button className="delete-btn styled-delete" onClick={() => handleRoutineDelete(r.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowRoutineModal(true)}>
              Add Routine
            </button>
          </div>
        );
      case 'learning':
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Learning Materials</h2>
            <Modal isOpen={showLearningModal} onClose={() => setShowLearningModal(false)}>
              <div className="crud-form">
                <h3>Add New Learning Material</h3>
                <input type="text" name="title" placeholder="Title" value={learningForm.title} onChange={handleLearningChange} />
                <input type="text" name="type" placeholder="Type (PDF/Video)" value={learningForm.type} onChange={handleLearningChange} />
                <input type="text" name="link" placeholder="Link" value={learningForm.link} onChange={handleLearningChange} />
                <button className="add-btn" onClick={() => { handleLearningAdd(); setShowLearningModal(false); }} disabled={!learningForm.title || !learningForm.type || !learningForm.link}>
                  Add Material
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {learning.map((l, idx) => (
                  <tr key={l.id}>
                    <td>{idx + 1}</td>
                    <td>{learningEditId === l.id ? (
                      <input type="text" name="title" value={learningForm.title} onChange={handleLearningChange} />
                    ) : l.title}</td>
                    <td>{learningEditId === l.id ? (
                      <input type="text" name="type" value={learningForm.type} onChange={handleLearningChange} />
                    ) : l.type}</td>
                    <td>{learningEditId === l.id ? (
                      <input type="text" name="link" value={learningForm.link} onChange={handleLearningChange} />
                    ) : l.link}</td>
                    <td>
                      {learningEditId === l.id ? (
                        <button className="save-btn" onClick={handleLearningSave}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => handleLearningEdit(l)}>Edit</button>
                          <button className="delete-btn styled-delete" onClick={() => handleLearningDelete(l.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowLearningModal(true)}>
              Add Material
            </button>
          </div>
        );
      case 'fees':
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Fees</h2>
            <Modal isOpen={showFeeModal} onClose={() => setShowFeeModal(false)}>
              <div className="crud-form">
                <h3>Add New Fee Record</h3>
                <input type="text" name="student" placeholder="Student" value={feeForm.student} onChange={handleFeeChange} />
                <input type="number" name="amount" placeholder="Amount" value={feeForm.amount} onChange={e => setFeeForm({ ...feeForm, amount: e.target.value === '' ? '' : parseInt(e.target.value, 10) })} min="0" step="1" />
                <input type="text" name="status" placeholder="Status (Paid/Unpaid)" value={feeForm.status} onChange={handleFeeChange} />
                <button className="add-btn" onClick={() => { handleFeeAdd(); setShowFeeModal(false); }} disabled={!feeForm.student || !feeForm.amount || !feeForm.status}>
                  Add Fee
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f, idx) => (
                  <tr key={f.id}>
                    <td>{idx + 1}</td>
                    <td>{feeEditId === f.id ? (
                      <input type="text" name="student" value={feeForm.student} onChange={handleFeeChange} />
                    ) : f.student}</td>
                    <td>{feeEditId === f.id ? (
                      <input type="number" name="amount" value={feeForm.amount} onChange={e => setFeeForm({ ...feeForm, amount: e.target.value === '' ? '' : parseInt(e.target.value, 10) })} min="0" step="1" />
                    ) : f.amount}</td>
                    <td>{feeEditId === f.id ? (
                      <input type="text" name="status" value={feeForm.status} onChange={handleFeeChange} />
                    ) : (
                      <span className={`status-badge ${f.status.toLowerCase() === 'paid' ? 'status-active' : 'status-inactive'}`}>
                        {f.status}
                      </span>
                    )}</td>
                    <td>
                      {feeEditId === f.id ? (
                        <button className="save-btn" onClick={handleFeeSave}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => handleFeeEdit(f)}>Edit</button>
                          <button className="delete-btn styled-delete" onClick={() => handleFeeDelete(f.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowFeeModal(true)}>
              Add Fee
            </button>
          </div>
        );
      case 'notifications':
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Notifications</h2>
            <Modal isOpen={showNotificationModal} onClose={() => setShowNotificationModal(false)}>
              <div className="crud-form">
                <h3>Add New Notification</h3>
                <input type="text" name="title" placeholder="Title" value={notificationForm.title} onChange={handleNotificationChange} />
                <textarea name="message" placeholder="Message" value={notificationForm.message} onChange={handleNotificationChange} />
                <input type="date" name="date" placeholder="Date" value={notificationForm.date} onChange={handleNotificationChange} />
                <select name="priority" value={notificationForm.priority} onChange={handleNotificationChange}>
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button className="add-btn" onClick={() => { handleNotificationAdd(); setShowNotificationModal(false); }} disabled={!notificationForm.title || !notificationForm.message || !notificationForm.date || !notificationForm.priority}>
                  Add Notification
                </button>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, idx) => (
                  <tr key={notification.id}>
                    <td>{idx + 1}</td>
                    <td>{notificationEditId === notification.id ? (
                      <input type="text" name="title" value={notificationForm.title} onChange={handleNotificationChange} />
                    ) : notification.title}</td>
                    <td>{notificationEditId === notification.id ? (
                      <textarea name="message" value={notificationForm.message} onChange={handleNotificationChange} />
                    ) : notification.message}</td>
                    <td>{notificationEditId === notification.id ? (
                      <input type="date" name="date" value={notificationForm.date} onChange={handleNotificationChange} />
                    ) : notification.date}</td>
                    <td>{notificationEditId === notification.id ? (
                      <select name="priority" value={notificationForm.priority} onChange={handleNotificationChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    ) : (
                      <span className={`status-badge priority-${notification.priority.toLowerCase()}`}>
                        {notification.priority}
                      </span>
                    )}</td>
                    <td>
                      {notificationEditId === notification.id ? (
                        <button className="save-btn" onClick={handleNotificationSave}>Save</button>
                      ) : (
                        <>
                          <button className="edit-btn styled-edit" onClick={() => handleNotificationEdit(notification)}>Edit</button>
                          <button className="delete-btn styled-delete" onClick={() => handleNotificationDelete(notification.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowNotificationModal(true)}>
              Add Notification
            </button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" section={section} onSectionChange={setSection} />
      <div className="main-content">
        {/* Modern Header */}
        <header className="dashboard-header-bar">
          <div className="header-left">
            <img src={logoIcon} alt="Logo" className="header-logo" />
            <span className="header-appname">SMART SHIKSHA</span>
          </div>
          <div className="header-right">
            <span className="header-role">Admin</span>
            <span className="header-username">Admin</span>
            <span className="header-avatar">A</span>
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

export default AdminDashboard;
