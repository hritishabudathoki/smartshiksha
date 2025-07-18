import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import logoIcon from '../assets/wow.png';
import '../styles/AdminDashboard.css';
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from "../services/studentApi";
import {
  fetchRoutines,
  addRoutine,
  updateRoutine,
  deleteRoutine
} from "../services/routineApi";
import {
  fetchLearningMaterials,
  addLearningMaterial,
  updateLearningMaterial,
  deleteLearningMaterial
} from "../services/learningMaterialApi";
import {
  fetchFees,
  addFee,
  updateFee,
  deleteFee
} from "../services/feeApi";
import {
  fetchNotifications,
  addNotification,
  updateNotification,
  deleteNotification
} from "../services/notificationApi";
import { FaEdit, FaTrash, FaUserGraduate, FaClipboardCheck, FaChartBar, FaBell, FaMoneyBillWave, FaBook } from 'react-icons/fa';

export default function AdminDashboard() {
  const [section, setSection] = useState('home');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ fullName: "", email: "", class: "" });
  const [editId, setEditId] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [routineLoading, setRoutineLoading] = useState(true);
  const [routineForm, setRoutineForm] = useState({ day: "", class: "", time: "" });
  const [routineEditId, setRoutineEditId] = useState(null);
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [learningLoading, setLearningLoading] = useState(true);
  const [learningForm, setLearningForm] = useState({ title: "", type: "", link: "" });
  const [learningEditId, setLearningEditId] = useState(null);
  const [fees, setFees] = useState([]);
  const [feeLoading, setFeeLoading] = useState(true);
  const [feeForm, setFeeForm] = useState({ studentName: "", amount: "", status: "" });
  const [feeEditId, setFeeEditId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);
  const [notificationForm, setNotificationForm] = useState({ title: "", message: "", date: "", priority: "" });
  const [notificationEditId, setNotificationEditId] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showEditFeeModal, setShowEditFeeModal] = useState(false);
  const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);
  const [showEditNotificationModal, setShowEditNotificationModal] = useState(false);
  const [showAddLearningModal, setShowAddLearningModal] = useState(false);
  const [showEditLearningModal, setShowEditLearningModal] = useState(false);

  useEffect(() => {
    if (section === 'students') {
      loadStudents();
    }
    if (section === 'routine') {
      loadRoutines();
    }
    if (section === 'learning') {
      loadLearningMaterials();
    }
    if (section === 'fees') {
      loadFees();
    }
    if (section === 'notifications') {
      loadNotifications();
    }
  }, [section]);

  async function loadStudents() {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  }

  async function handleAdd() {
    try {
      await addStudent(form);
      setForm({ fullName: "", email: "", class: "" });
      loadStudents();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleEdit(id) {
    try {
      await updateStudent(id, form);
      setEditId(null);
      setForm({ fullName: "", email: "", class: "" });
      loadStudents();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (e) {
      alert(e.message);
    }
  }

  async function loadRoutines() {
    setRoutineLoading(true);
    try {
      const data = await fetchRoutines();
      setRoutines(data);
    } catch (e) {
      alert(e.message);
    }
    setRoutineLoading(false);
  }

  async function handleRoutineAdd() {
    try {
      await addRoutine(routineForm);
      setRoutineForm({ day: "", class: "", time: "" });
      loadRoutines();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleRoutineEdit(id) {
    try {
      await updateRoutine(id, routineForm);
      setRoutineEditId(null);
      setRoutineForm({ day: "", class: "", time: "" });
      loadRoutines();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleRoutineDelete(id) {
    if (!window.confirm("Delete this routine?")) return;
    try {
      await deleteRoutine(id);
      loadRoutines();
    } catch (e) {
      alert(e.message);
    }
  }

  async function loadLearningMaterials() {
    setLearningLoading(true);
    try {
      const data = await fetchLearningMaterials();
      setLearningMaterials(data);
    } catch (e) {
      alert(e.message);
    }
    setLearningLoading(false);
  }

  async function handleLearningAdd() {
    try {
      await addLearningMaterial(learningForm);
      setLearningForm({ title: "", type: "", link: "" });
      loadLearningMaterials();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleLearningEdit(id) {
    try {
      await updateLearningMaterial(id, learningForm);
      setLearningEditId(null);
      setLearningForm({ title: "", type: "", link: "" });
      loadLearningMaterials();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleLearningDelete(id) {
    if (!window.confirm("Delete this material?")) return;
    try {
      await deleteLearningMaterial(id);
      loadLearningMaterials();
    } catch (e) {
      alert(e.message);
    }
  }

  async function loadFees() {
    setFeeLoading(true);
    try {
      const data = await fetchFees();
      setFees(data);
    } catch (e) {
      alert(e.message);
    }
    setFeeLoading(false);
  }

  async function handleFeeAdd() {
    try {
      await addFee({ ...feeForm, amount: parseInt(feeForm.amount, 10) });
      setFeeForm({ studentName: "", amount: "", status: "" });
      loadFees();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleFeeEdit(id) {
    try {
      await updateFee(id, { ...feeForm, amount: parseInt(feeForm.amount, 10) });
    setFeeEditId(null);
      setFeeForm({ studentName: "", amount: "", status: "" });
      loadFees();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleFeeDelete(id) {
    if (!window.confirm("Delete this fee?")) return;
    try {
      await deleteFee(id);
      loadFees();
    } catch (e) {
      alert(e.message);
    }
  }

  async function loadNotifications() {
    setNotificationLoading(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (e) {
      alert(e.message);
    }
    setNotificationLoading(false);
  }

  async function handleNotificationAdd() {
    try {
      await addNotification(notificationForm);
      setNotificationForm({ title: "", message: "", date: "", priority: "" });
      loadNotifications();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleNotificationEdit(id) {
    try {
      await updateNotification(id, notificationForm);
      setNotificationEditId(null);
      setNotificationForm({ title: "", message: "", date: "", priority: "" });
      loadNotifications();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleNotificationDelete(id) {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await deleteNotification(id);
      loadNotifications();
    } catch (e) {
      alert(e.message);
    }
  }

  function renderSectionContent() {
    if (section === 'home') {
      return (
        <div className="dashboard-overview">
          <h2>Welcome, Admin!</h2>
          <div className="overview-cards">
            <div className="overview-card">
              <img src={require('../assets/std.png')} alt="Total Students" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Total Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="overview-card">
              <img src={require('../assets/tea.png')} alt="Classes" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="overview-card">
              <img src={require('../assets/fee.png')} alt="Fees" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Fees</h3>
              <p>{fees.length}</p>
            </div>
            <div className="overview-card">
              <img src={require('../assets/noti.png')} alt="Notifications" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Notifications</h3>
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
              </div>
              </div>
          <div className="features-section">
            <h2 className="features-title">Our Features</h2>
            <div className="features-underline"></div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={require('../assets/one.png')} alt="Learning Management System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">Learning Management System</div>
                  <div className="feature-desc">The LMS feature revolutionizes the teaching experience, enabling educators to effortlessly create, manage, and deliver online courses while closely monitoring student progress, making online education engaging and effective.</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={require('../assets/two.png')} alt="School Management System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">School Management System</div>
                  <div className="feature-desc">The School Management System streamlines administrative tasks for schools, offering a centralized platform to efficiently manage student records, attendance, timetables, and financial matters.</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={require('../assets/three.png')} alt="Accounting Management System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">Accounting Management System</div>
                  <div className="feature-desc">Comprehensive Accounting simplifies financial management for educational institutions, offering tools for tracking budgets, expenses, and revenue, ensuring transparent and efficient financial operations.</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={require('../assets/four.png')} alt="Notification System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">Notification System</div>
                  <div className="feature-desc">Instant notifications for important updates and reminders, keeping everyone informed and engaged.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (section === 'students') {
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Students</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                {students.map((s, idx) => (
                  <tr key={s.id}>
                    <td>{idx + 1}</td>
                    <td>{s.fullName}</td>
                    <td>{s.email}</td>
                    <td>{s.class}</td>
                    <td>
                          <button
                            onClick={() => {
                              setEditId(s.id);
                              setForm({
                                fullName: s.fullName,
                                email: s.email,
                                class: s.class
                              });
                          setShowEditStudentModal(true);
                            }}
                        className="action-btn edit"
                        title="Edit"
                          >
                        <FaEdit />
                          </button>
                      <button onClick={() => handleDelete(s.id)} className="action-btn delete" title="Delete">
                        <FaTrash />
                          </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="add-btn" onClick={() => setShowAddStudentModal(true)}>
            <span className="add-icon">➕</span>Add Student
          </button>
          {/* Student Add Modal */}
          <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)}>
            <div className="modal-header">Add Student</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="addStudentFullName">Full Name</label>
                <input id="addStudentFullName" className="modal-input" placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addStudentEmail">Email</label>
                <input id="addStudentEmail" className="modal-input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
                {!isValidEmail(form.email) && form.email && (<div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>Please enter a valid email address.</div>)}
              </div>
              <div className="modal-form-row">
                <label htmlFor="addStudentClass">Class</label>
                <input id="addStudentClass" className="modal-input" placeholder="Class" value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleAdd(); setShowAddStudentModal(false); }} disabled={!form.fullName || !form.email || !form.class || !isValidEmail(form.email)}>Add Student</button>
            </div>
          </Modal>
          {/* Student Edit Modal */}
          <Modal isOpen={showEditStudentModal} onClose={() => { setShowEditStudentModal(false); setEditId(null); }}>
            <div className="modal-header">Edit Student</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="editStudentFullName">Full Name</label>
                <input id="editStudentFullName" className="modal-input" placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editStudentEmail">Email</label>
                <input id="editStudentEmail" className="modal-input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
                {!isValidEmail(form.email) && form.email && (<div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>Please enter a valid email address.</div>)}
              </div>
              <div className="modal-form-row">
                <label htmlFor="editStudentClass">Class</label>
                <input id="editStudentClass" className="modal-input" placeholder="Class" value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleEdit(editId); setShowEditStudentModal(false); }} disabled={!form.fullName || !form.email || !form.class || !isValidEmail(form.email)}>Save</button>
            </div>
          </Modal>
          </div>
        );
    }
    if (section === 'routine') {
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Routine</h2>
          {routineLoading ? (
            <p>Loading...</p>
          ) : (
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
                {routines.map((r, idx) => (
                  <tr key={r.id}>
                    <td>{idx + 1}</td>
                    <td>{r.day}</td>
                    <td>{r.class}</td>
                    <td>{r.time}</td>
                    <td>
                          <button onClick={() => {
                            setRoutineEditId(r.id);
                            setRoutineForm({ day: r.day, class: r.class, time: r.time });
                        setShowEditRoutineModal(true);
                      }} className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleRoutineDelete(r.id)} className="action-btn delete" title="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="add-btn" onClick={() => setShowAddRoutineModal(true)}>
            <span className="add-icon">➕</span>Add Routine
          </button>
          {/* Routine Add Modal */}
          <Modal isOpen={showAddRoutineModal} onClose={() => setShowAddRoutineModal(false)}>
            <div className="modal-header">Add Routine</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="addRoutineDay">Day</label>
                <select id="addRoutineDay" className="modal-input" value={routineForm.day} onChange={e => setRoutineForm({ ...routineForm, day: e.target.value })}>
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="addRoutineClass">Class</label>
                <input id="addRoutineClass" className="modal-input" placeholder="Class" value={routineForm.class} onChange={e => setRoutineForm({ ...routineForm, class: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addRoutineTime">Time</label>
                <input id="addRoutineTime" className="modal-input" type="time" value={routineForm.time} onChange={e => setRoutineForm({ ...routineForm, time: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleRoutineAdd(); setShowAddRoutineModal(false); }} disabled={!routineForm.day || !routineForm.class || !routineForm.time}>Add Routine</button>
            </div>
          </Modal>
          {/* Routine Edit Modal */}
          <Modal isOpen={showEditRoutineModal} onClose={() => { setShowEditRoutineModal(false); setRoutineEditId(null); }}>
            <div className="modal-header">Edit Routine</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="editRoutineDay">Day</label>
                <select id="editRoutineDay" className="modal-input" value={routineForm.day} onChange={e => setRoutineForm({ ...routineForm, day: e.target.value })}>
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="editRoutineClass">Class</label>
                <input id="editRoutineClass" className="modal-input" placeholder="Class" value={routineForm.class} onChange={e => setRoutineForm({ ...routineForm, class: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editRoutineTime">Time</label>
                <input id="editRoutineTime" className="modal-input" type="time" value={routineForm.time} onChange={e => setRoutineForm({ ...routineForm, time: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleRoutineEdit(routineEditId); setShowEditRoutineModal(false); }} disabled={!routineForm.day || !routineForm.class || !routineForm.time}>Save</button>
            </div>
          </Modal>
          </div>
        );
    }
    if (section === 'learning') {
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Learning Materials</h2>
          {learningLoading ? (
            <p>Loading...</p>
          ) : (
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
                {learningMaterials.map((l, idx) => (
                  <tr key={l.id}>
                    <td>{idx + 1}</td>
                    <td>{l.title}</td>
                    <td>{l.type}</td>
                    <td><a href={l.link} target="_blank" rel="noopener noreferrer">{l.link}</a></td>
                    <td>
                          <button onClick={() => {
                            setLearningEditId(l.id);
                            setLearningForm({ title: l.title, type: l.type, link: l.link });
                        setShowEditLearningModal(true);
                      }} className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleLearningDelete(l.id)} className="action-btn delete" title="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="add-btn" onClick={() => setShowAddLearningModal(true)}>
            <span className="add-icon">➕</span>Add Learning Material
          </button>
          {/* Learning Material Add Modal */}
          <Modal isOpen={showAddLearningModal} onClose={() => setShowAddLearningModal(false)}>
            <div className="modal-header">Add Learning Material</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="addLearningTitle">Title</label>
                <input id="addLearningTitle" className="modal-input" placeholder="Title" value={learningForm.title} onChange={e => setLearningForm({ ...learningForm, title: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addLearningType">Type</label>
                <select id="addLearningType" className="modal-input" value={learningForm.type} onChange={e => setLearningForm({ ...learningForm, type: e.target.value })}>
                  <option value="">Select Type</option>
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Link">Link</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="addLearningLink">Link</label>
                <input id="addLearningLink" className="modal-input" placeholder="Link" value={learningForm.link} onChange={e => setLearningForm({ ...learningForm, link: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleLearningAdd(); setShowAddLearningModal(false); }} disabled={!learningForm.title || !learningForm.type || !learningForm.link}>Add Material</button>
            </div>
          </Modal>
          {/* Learning Material Edit Modal */}
          <Modal isOpen={showEditLearningModal} onClose={() => { setShowEditLearningModal(false); setLearningEditId(null); }}>
            <div className="modal-header">Edit Learning Material</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="editLearningTitle">Title</label>
                <input id="editLearningTitle" className="modal-input" placeholder="Title" value={learningForm.title} onChange={e => setLearningForm({ ...learningForm, title: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editLearningType">Type</label>
                <select id="editLearningType" className="modal-input" value={learningForm.type} onChange={e => setLearningForm({ ...learningForm, type: e.target.value })}>
                  <option value="">Select Type</option>
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Link">Link</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="editLearningLink">Link</label>
                <input id="editLearningLink" className="modal-input" placeholder="Link" value={learningForm.link} onChange={e => setLearningForm({ ...learningForm, link: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleLearningEdit(learningEditId); setShowEditLearningModal(false); }} disabled={!learningForm.title || !learningForm.type || !learningForm.link}>Save</button>
            </div>
          </Modal>
          </div>
        );
    }
    if (section === 'fees') {
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Fees</h2>
          {feeLoading ? (
            <p>Loading...</p>
          ) : (
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
                    <td>{f.studentName}</td>
                    <td>{f.amount}</td>
                    <td>{f.status}</td>
                    <td>
                          <button onClick={() => {
                            setFeeEditId(f.id);
                            setFeeForm({ studentName: f.studentName, amount: f.amount, status: f.status });
                        setShowEditFeeModal(true);
                      }} className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleFeeDelete(f.id)} className="action-btn delete" title="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="add-btn" onClick={() => setShowAddFeeModal(true)}>
            <span className="add-icon">➕</span>Add Fee
          </button>
          {/* Fee Add Modal */}
          <Modal isOpen={showAddFeeModal} onClose={() => setShowAddFeeModal(false)}>
            <div className="modal-header">Add Fee</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="addFeeStudentName">Student Name</label>
                <input id="addFeeStudentName" className="modal-input" placeholder="Student Name" value={feeForm.studentName} onChange={e => setFeeForm({ ...feeForm, studentName: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addFeeAmount">Amount</label>
                <input id="addFeeAmount" className="modal-input" placeholder="Amount" type="number" value={feeForm.amount} onChange={e => setFeeForm({ ...feeForm, amount: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addFeeStatus">Status</label>
                <select id="addFeeStatus" className="modal-input" value={feeForm.status} onChange={e => setFeeForm({ ...feeForm, status: e.target.value })}>
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleFeeAdd(); setShowAddFeeModal(false); }} disabled={!feeForm.studentName || !feeForm.amount || !feeForm.status}>Add Fee</button>
            </div>
          </Modal>
          {/* Fee Edit Modal */}
          <Modal isOpen={showEditFeeModal} onClose={() => { setShowEditFeeModal(false); setFeeEditId(null); }}>
            <div className="modal-header">Edit Fee</div>
            <div className="modal-body">
              <div className="modal-form-row">
                <label htmlFor="editFeeStudentName">Student Name</label>
                <input id="editFeeStudentName" className="modal-input" placeholder="Student Name" value={feeForm.studentName} onChange={e => setFeeForm({ ...feeForm, studentName: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editFeeAmount">Amount</label>
                <input id="editFeeAmount" className="modal-input" placeholder="Amount" type="number" value={feeForm.amount} onChange={e => setFeeForm({ ...feeForm, amount: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editFeeStatus">Status</label>
                <select id="editFeeStatus" className="modal-input" value={feeForm.status} onChange={e => setFeeForm({ ...feeForm, status: e.target.value })}>
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-btn" onClick={() => { handleFeeEdit(feeEditId); setShowEditFeeModal(false); }} disabled={!feeForm.studentName || !feeForm.amount || !feeForm.status}>Save</button>
            </div>
          </Modal>
          </div>
        );
    }
    if (section === 'notifications') {
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Manage Notifications</h2>
          {notificationLoading ? (
            <p>Loading...</p>
          ) : (
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
                {notifications.map((n, idx) => (
                  <tr key={n.id}>
                    <td>{idx + 1}</td>
                    <td>{n.title}</td>
                    <td>{n.message}</td>
                    <td>{n.date}</td>
                    <td>{n.priority}</td>
                    <td>
                          <button onClick={() => {
                            setNotificationEditId(n.id);
                            setNotificationForm({ title: n.title, message: n.message, date: n.date, priority: n.priority });
                        setShowEditNotificationModal(true);
                      }} className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleNotificationDelete(n.id)} className="action-btn delete" title="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="add-btn" onClick={() => setShowAddNotificationModal(true)}>
            <span className="add-icon">➕</span>Add Notification
          </button>
          {/* Refactor Add Notification Modal */}
          <Modal isOpen={showAddNotificationModal} onClose={() => setShowAddNotificationModal(false)}>
            <div className="modal-content">
              <button className="modal-close-btn" onClick={() => setShowAddNotificationModal(false)} aria-label="Close">&times;</button>
              <div className="modal-header-title">Send Notification</div>
              <div className="modal-body">
                <div className="modal-form-row">
                  <label htmlFor="addNotificationTitle">Title</label>
                  <input id="addNotificationTitle" className="modal-input" placeholder="Title" value={notificationForm.title} onChange={e => setNotificationForm({ ...notificationForm, title: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="addNotificationMessage">Message</label>
                  <input id="addNotificationMessage" className="modal-input" placeholder="Message" value={notificationForm.message} onChange={e => setNotificationForm({ ...notificationForm, message: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="addNotificationDate">Date</label>
                  <input id="addNotificationDate" className="modal-input" type="date" value={notificationForm.date} onChange={e => setNotificationForm({ ...notificationForm, date: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="addNotificationPriority">Priority</label>
                  <select id="addNotificationPriority" className="modal-input" value={notificationForm.priority} onChange={e => setNotificationForm({ ...notificationForm, priority: e.target.value })}>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn cancel-btn" onClick={() => setShowAddNotificationModal(false)}>Cancel</button>
                <button className="modal-btn primary-btn" onClick={() => { handleNotificationAdd(); setShowAddNotificationModal(false); }} disabled={!notificationForm.title || !notificationForm.message || !notificationForm.date || !notificationForm.priority}>Send Notification</button>
              </div>
            </div>
          </Modal>
          {/* Refactor Edit Notification Modal */}
          <Modal isOpen={showEditNotificationModal} onClose={() => { setShowEditNotificationModal(false); setNotificationEditId(null); }}>
            <div className="modal-content">
              <button className="modal-close-btn" onClick={() => { setShowEditNotificationModal(false); setNotificationEditId(null); }} aria-label="Close">&times;</button>
              <div className="modal-header-title">Edit Notification</div>
              <div className="modal-body">
                <div className="modal-form-row">
                  <label htmlFor="editNotificationTitle">Title</label>
                  <input id="editNotificationTitle" className="modal-input" placeholder="Title" value={notificationForm.title} onChange={e => setNotificationForm({ ...notificationForm, title: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="editNotificationMessage">Message</label>
                  <input id="editNotificationMessage" className="modal-input" placeholder="Message" value={notificationForm.message} onChange={e => setNotificationForm({ ...notificationForm, message: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="editNotificationDate">Date</label>
                  <input id="editNotificationDate" className="modal-input" type="date" value={notificationForm.date} onChange={e => setNotificationForm({ ...notificationForm, date: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="editNotificationPriority">Priority</label>
                  <select id="editNotificationPriority" className="modal-input" value={notificationForm.priority} onChange={e => setNotificationForm({ ...notificationForm, priority: e.target.value })}>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn cancel-btn" onClick={() => { setShowEditNotificationModal(false); setNotificationEditId(null); }}>Cancel</button>
                <button className="modal-btn primary-btn" onClick={() => { handleNotificationEdit(notificationEditId); setShowEditNotificationModal(false); }} disabled={!notificationForm.title || !notificationForm.message || !notificationForm.date || !notificationForm.priority}>Save</button>
              </div>
            </div>
          </Modal>
          </div>
        );
    }
    // Placeholder for other sections
    return <div className="dashboard-overview"><h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2></div>;
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
            <span className="header-avatar">A</span>
          </div>
        </header>
        {/* Main Section */}
        <section className="dashboard-section">
          {renderSectionContent()}
        </section>
      </div>
      <footer className="dashboard-footer">
        Designed and Developed for Smart Shiksha
      </footer>
    </div>
  );
}

// Modal component for pop-ups (copied from TeacherDashboard)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
