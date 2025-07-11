import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import DashboardHome from './DashboardHome';
import MockTable from './MockTable';
import MockList from './MockList';
import TopBar from './TopBar';
import RoutineCalendar from './RoutineCalendar';
import { MdHome, MdPeople, MdEventNote, MdCampaign, MdMenuBook, MdAttachMoney, MdSchool, MdPerson, MdAnnouncement } from 'react-icons/md';
import barImg from '../assets/bar.jpg';

const sidebarItems = [
  { label: 'Home', icon: <MdHome /> },
  { label: 'Manage Students', icon: <MdPeople /> },
  { label: 'Manage Routine', icon: <MdEventNote /> },
  { label: 'Manage Announcement', icon: <MdCampaign /> },
  { label: 'Learning Materials', icon: <MdMenuBook /> },
  { label: 'Fees', icon: <MdAttachMoney /> },
];

const mockNotifications = [
  { title: 'New Session Added!!!', description: 'New Session “Software Development” Thu Mar 20 Created by Krish Shrestha' },
  { title: 'Lesson Updated!!!', description: 'The Lesson “web developement” updated Instructor: Alex' },
  { title: 'The User Deleted!!', description: 'The user “Kritagya” deleted' },
  { title: 'Student Routine Updated!!!', description: 'The Student “Manas” class changed. New class 35b' },
];

const adminStats = [
  { label: 'Total Classes', value: 12, icon: <MdSchool /> },
  { label: 'Total Students', value: 320, icon: <MdPeople /> },
  { label: 'Total Teachers', value: 18, icon: <MdPerson /> },
  { label: 'Lessons', value: 54, icon: <MdMenuBook /> },
];

const mockClasses = [
  ['Class 10A', 'Math', 'Mr. Smith'],
  ['Class 9B', 'Science', 'Ms. Lee'],
  ['Class 8C', 'English', 'Mr. Brown'],
];
const mockStudents = [
  ['Riya', '10A', 'Active'],
  ['Manas', '9B', 'Active'],
  ['Kritagya', '8C', 'Inactive'],
];
const mockLessons = [
  ['Math', 'Algebra', 'Mr. Smith'],
  ['Science', 'Biology', 'Ms. Lee'],
  ['English', 'Grammar', 'Mr. Brown'],
];
const mockAccounts = ['admin@school.com', 'teacher@school.com', 'student@school.com'];

const initialClasses = [
  { className: 'Class 10A', subject: 'Math', teacher: 'Mr. Smith' },
  { className: 'Class 9B', subject: 'Science', teacher: 'Ms. Lee' },
  { className: 'Class 8C', subject: 'English', teacher: 'Mr. Brown' },
];

const initialStudents = [
  { name: 'Riya', className: '10A', status: 'Active' },
  { name: 'Manas', className: '9B', status: 'Active' },
  { name: 'Kritagya', className: '8C', status: 'Inactive' },
];

const initialMaterials = [
  { title: 'Mathematics Book', type: 'Book', link: 'https://example.com/math-book.pdf' },
  { title: 'Science Notes', type: 'PDF', link: 'https://example.com/science-notes.pdf' },
];

const initialAnnouncements = [
  { title: 'Exam Schedule', message: 'Final exams start from 10th June.', date: '2024-06-01' },
  { title: 'Holiday Notice', message: 'School will be closed on 15th June for Eid.', date: '2024-06-10' },
];

const initialFees = [
  { student: 'Riya', className: '10A', amount: 2000, dueDate: '2024-07-01', status: 'Unpaid' },
  { student: 'Manas', className: '9B', amount: 1800, dueDate: '2024-07-01', status: 'Paid' },
];

const initialRoutine = {
  Monday: { 'Period 1': { subject: 'Math', teacher: 'Mr. Smith' } },
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {},
};

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('Home');
  // CRUD state for classes
  const [classes, setClasses] = useState(initialClasses);
  const [showClassForm, setShowClassForm] = useState(false);
  const [editClassIdx, setEditClassIdx] = useState(null);
  const [classForm, setClassForm] = useState({ className: '', subject: '', teacher: '' });

  // CRUD state for students
  const [students, setStudents] = useState(initialStudents);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editStudentIdx, setEditStudentIdx] = useState(null);
  const [studentForm, setStudentForm] = useState({ name: '', className: '', status: 'Active' });

  // Learning Materials state
  const [materials, setMaterials] = useState(initialMaterials);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [editMaterialIdx, setEditMaterialIdx] = useState(null);
  const [materialForm, setMaterialForm] = useState({ title: '', type: '', link: '' });

  // Announcements state
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editAnnouncementIdx, setEditAnnouncementIdx] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({ title: '', message: '', date: '' });

  // Fees state
  const [fees, setFees] = useState(initialFees);
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [editFeeIdx, setEditFeeIdx] = useState(null);
  const [feeForm, setFeeForm] = useState({ student: '', className: '', amount: '', dueDate: '', status: 'Unpaid' });

  // Routine state
  const [routine, setRoutine] = useState(initialRoutine);
  const [routineModal, setRoutineModal] = useState({ open: false, day: '', period: '', subject: '', teacher: '' });

  const handleSidebarClick = (label) => {
    setActiveItem(label);
  };

  // CRUD handlers
  const handleAddClass = () => {
    setClassForm({ className: '', subject: '', teacher: '' });
    setEditClassIdx(null);
    setShowClassForm(true);
  };
  const handleEditClass = (idx) => {
    setClassForm(classes[idx]);
    setEditClassIdx(idx);
    setShowClassForm(true);
  };
  const handleDeleteClass = (idx) => {
    setClasses(classes.filter((_, i) => i !== idx));
  };
  const handleClassFormChange = (e) => {
    setClassForm({ ...classForm, [e.target.name]: e.target.value });
  };
  const handleClassFormSubmit = (e) => {
    e.preventDefault();
    if (editClassIdx !== null) {
      // Update
      setClasses(classes.map((c, i) => (i === editClassIdx ? classForm : c)));
    } else {
      // Add
      setClasses([...classes, classForm]);
    }
    setShowClassForm(false);
    setEditClassIdx(null);
  };
  const handleClassFormCancel = () => {
    setShowClassForm(false);
    setEditClassIdx(null);
  };

  // CRUD handlers for students
  const handleAddStudent = () => {
    setStudentForm({ name: '', className: '', status: 'Active' });
    setEditStudentIdx(null);
    setShowStudentForm(true);
  };
  const handleEditStudent = (idx) => {
    setStudentForm(students[idx]);
    setEditStudentIdx(idx);
    setShowStudentForm(true);
  };
  const handleDeleteStudent = (idx) => {
    setStudents(students.filter((_, i) => i !== idx));
  };
  const handleStudentFormChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };
  const handleStudentFormSubmit = (e) => {
    e.preventDefault();
    if (editStudentIdx !== null) {
      setStudents(students.map((s, i) => (i === editStudentIdx ? studentForm : s)));
    } else {
      setStudents([...students, studentForm]);
    }
    setShowStudentForm(false);
    setEditStudentIdx(null);
  };
  const handleStudentFormCancel = () => {
    setShowStudentForm(false);
    setEditStudentIdx(null);
  };

  // CRUD handlers for materials
  const handleAddMaterial = () => {
    setMaterialForm({ title: '', type: '', link: '' });
    setEditMaterialIdx(null);
    setShowMaterialForm(true);
  };
  const handleEditMaterial = (idx) => {
    setMaterialForm(materials[idx]);
    setEditMaterialIdx(idx);
    setShowMaterialForm(true);
  };
  const handleDeleteMaterial = (idx) => {
    setMaterials(materials.filter((_, i) => i !== idx));
  };
  const handleMaterialFormChange = (e) => {
    setMaterialForm({ ...materialForm, [e.target.name]: e.target.value });
  };
  const handleMaterialFormSubmit = (e) => {
    e.preventDefault();
    if (editMaterialIdx !== null) {
      setMaterials(materials.map((m, i) => (i === editMaterialIdx ? materialForm : m)));
    } else {
      setMaterials([...materials, materialForm]);
    }
    setShowMaterialForm(false);
    setEditMaterialIdx(null);
  };
  const handleMaterialFormCancel = () => {
    setShowMaterialForm(false);
    setEditMaterialIdx(null);
  };

  // CRUD handlers for announcements
  const handleAddAnnouncement = () => {
    setAnnouncementForm({ title: '', message: '', date: '' });
    setEditAnnouncementIdx(null);
    setShowAnnouncementForm(true);
  };
  const handleEditAnnouncement = (idx) => {
    setAnnouncementForm(announcements[idx]);
    setEditAnnouncementIdx(idx);
    setShowAnnouncementForm(true);
  };
  const handleDeleteAnnouncement = (idx) => {
    setAnnouncements(announcements.filter((_, i) => i !== idx));
  };
  const handleAnnouncementFormChange = (e) => {
    setAnnouncementForm({ ...announcementForm, [e.target.name]: e.target.value });
  };
  const handleAnnouncementFormSubmit = (e) => {
    e.preventDefault();
    if (editAnnouncementIdx !== null) {
      setAnnouncements(announcements.map((a, i) => (i === editAnnouncementIdx ? announcementForm : a)));
    } else {
      setAnnouncements([...announcements, announcementForm]);
    }
    setShowAnnouncementForm(false);
    setEditAnnouncementIdx(null);
  };
  const handleAnnouncementFormCancel = () => {
    setShowAnnouncementForm(false);
    setEditAnnouncementIdx(null);
  };

  // CRUD handlers for fees
  const handleAddFee = () => {
    setFeeForm({ student: '', className: '', amount: '', dueDate: '', status: 'Unpaid' });
    setEditFeeIdx(null);
    setShowFeeForm(true);
  };
  const handleEditFee = (idx) => {
    setFeeForm(fees[idx]);
    setEditFeeIdx(idx);
    setShowFeeForm(true);
  };
  const handleDeleteFee = (idx) => {
    setFees(fees.filter((_, i) => i !== idx));
  };
  const handleFeeFormChange = (e) => {
    setFeeForm({ ...feeForm, [e.target.name]: e.target.value });
  };
  const handleFeeFormSubmit = (e) => {
    e.preventDefault();
    if (editFeeIdx !== null) {
      setFees(fees.map((f, i) => (i === editFeeIdx ? feeForm : f)));
    } else {
      setFees([...fees, feeForm]);
    }
    setShowFeeForm(false);
    setEditFeeIdx(null);
  };
  const handleFeeFormCancel = () => {
    setShowFeeForm(false);
    setEditFeeIdx(null);
  };

  const handleRoutineCellClick = (day, period) => {
    const entry = routine[day]?.[period] || { subject: '', teacher: '' };
    setRoutineModal({ open: true, day, period, subject: entry.subject, teacher: entry.teacher });
  };
  const handleRoutineModalChange = (e) => {
    setRoutineModal({ ...routineModal, [e.target.name]: e.target.value });
  };
  const handleRoutineModalSave = (e) => {
    e.preventDefault();
    setRoutine(r => ({
      ...r,
      [routineModal.day]: {
        ...r[routineModal.day],
        [routineModal.period]: { subject: routineModal.subject, teacher: routineModal.teacher },
      },
    }));
    setRoutineModal({ open: false, day: '', period: '', subject: '', teacher: '' });
  };
  const handleRoutineModalDelete = () => {
    setRoutine(r => {
      const updated = { ...r };
      if (updated[routineModal.day]) {
        delete updated[routineModal.day][routineModal.period];
      }
      return updated;
    });
    setRoutineModal({ open: false, day: '', period: '', subject: '', teacher: '' });
  };
  const handleRoutineModalCancel = () => {
    setRoutineModal({ open: false, day: '', period: '', subject: '', teacher: '' });
  };

  return (
    <div>
      <TopBar username="Admin" role="Admin" />
      <div className="dashboard-container" style={{ marginLeft: 220 }}>
        <Sidebar items={sidebarItems} activeItem={activeItem} onItemClick={handleSidebarClick} />
        <div className="dashboard-content">
          <div className="dashboard-header">
            {/* Removed old username display, now in TopBar */}
          </div>
          {activeItem === 'Home' && (
            <DashboardHome
              role="Admin"
              stats={[
                { label: 'Total Classes', value: classes.length, icon: <MdSchool /> },
                { label: 'Total Students', value: students.length, icon: <MdPeople /> },
                { label: 'Announcements', value: announcements.length, icon: <MdAnnouncement /> },
                { label: 'Learning Materials', value: materials.length, icon: <MdMenuBook /> },
              ]}
            />
          )}
          {activeItem === 'Manage Classes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 8px 0' }}>
                <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600 }}>Classes</h2>
                <button onClick={handleAddClass} style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontSize: '1rem', cursor: 'pointer' }}>Add Class</button>
              </div>
              <MockTable
                columns={['Class', 'Subject', 'Teacher', 'Actions']}
                data={classes.map((c, idx) => [
                  c.className,
                  c.subject,
                  c.teacher,
                  <>
                    <button onClick={() => handleEditClass(idx)} style={{ marginRight: 8, background: '#f3eaff', color: '#6c3fc7', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteClass(idx)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </>
                ])}
              />
              {showClassForm && (
                <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(44,19,56,0.06)', padding: '28px 32px', maxWidth: '400px', margin: '32px auto' }}>
                  <h3 style={{ color: '#6c3fc7' }}>{editClassIdx !== null ? 'Edit Class' : 'Add Class'}</h3>
                  <form onSubmit={handleClassFormSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Class Name<br /><input name="className" value={classForm.className} onChange={handleClassFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter class name" /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Subject<br /><input name="subject" value={classForm.subject} onChange={handleClassFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter subject" /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Teacher<br /><input name="teacher" value={classForm.teacher} onChange={handleClassFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter teacher name" /></label>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button type="submit" style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>{editClassIdx !== null ? 'Update' : 'Add'}</button>
                      <button type="button" onClick={handleClassFormCancel} style={{ background: '#eee', color: '#444', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {activeItem === 'Manage Students' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 8px 0' }}>
                <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600 }}>Class Students</h2>
                <button onClick={handleAddStudent} style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontSize: '1rem', cursor: 'pointer' }}>Add Student</button>
              </div>
              <MockTable
                columns={['Student', 'Class', 'Status', 'Actions']}
                data={students.map((s, idx) => [
                  s.name,
                  s.className,
                  s.status,
                  <>
                    <button onClick={() => handleEditStudent(idx)} style={{ marginRight: 8, background: '#f3eaff', color: '#6c3fc7', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteStudent(idx)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </>
                ])}
              />
              {showStudentForm && (
                <div className="modal-overlay" onClick={handleStudentFormCancel}>
                  <div className="modal-card" onClick={e => e.stopPropagation()}>
                    <h3 style={{ color: '#6c3fc7' }}>{editStudentIdx !== null ? 'Edit Student' : 'Add Student'}</h3>
                    <form onSubmit={handleStudentFormSubmit}>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Name<br /><input name="name" value={studentForm.name} onChange={handleStudentFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter student name" /></label>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Class<br /><input name="className" value={studentForm.className} onChange={handleStudentFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter class" /></label>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Status<br />
                          <select name="status" value={studentForm.status} onChange={handleStudentFormChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </label>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>{editStudentIdx !== null ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={handleStudentFormCancel} style={{ background: '#eee', color: '#444', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeItem === 'Manage Class Lessons' && (
            <MockTable columns={['Subject', 'Lesson', 'Instructor']} data={mockLessons} />
          )}
          {activeItem === 'Manage Lessons' && (
            <MockTable columns={['Subject', 'Lesson', 'Instructor']} data={mockLessons} />
          )}
          {activeItem === 'Manage Account' && (
            <MockList title="Accounts" items={mockAccounts} />
          )}
          {activeItem === 'Create New Account' && (
            <div style={{margin:'32px 0', background:'#fff', borderRadius:'10px', boxShadow:'0 2px 8px rgba(44,19,56,0.06)', padding:'28px 32px', maxWidth:'400px'}}>
              <h3 style={{color:'#6c3fc7'}}>Create New Account</h3>
              <form>
                <div style={{marginBottom:'16px'}}>
                  <label>Email<br/><input type="email" style={{width:'100%',padding:'8px',borderRadius:'4px',border:'1px solid #ccc'}} placeholder="Enter email" /></label>
                </div>
                <div style={{marginBottom:'16px'}}>
                  <label>Role<br/>
                    <select style={{width:'100%',padding:'8px',borderRadius:'4px',border:'1px solid #ccc'}}>
                      <option>Admin</option>
                      <option>Teacher</option>
                      <option>Student</option>
                    </select>
                  </label>
                </div>
                <button type="button" style={{background:'#6c3fc7',color:'#fff',border:'none',borderRadius:'4px',padding:'10px 24px',cursor:'pointer'}}>Create</button>
              </form>
            </div>
          )}
          {activeItem === 'Manage Routine' && (
            <div>
              <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600, margin: '24px 0 8px 0' }}>Manage Routine</h2>
              <RoutineCalendar
                routineData={routine}
                onCellClick={handleRoutineCellClick}
                readOnly={false}
              />
              {routineModal.open && (
                <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(44,19,56,0.06)', padding: '28px 32px', maxWidth: '400px', margin: '32px auto' }}>
                  <h3 style={{ color: '#6c3fc7' }}>Edit Routine ({routineModal.day}, {routineModal.period})</h3>
                  <form onSubmit={handleRoutineModalSave}>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Subject<br /><input name="subject" value={routineModal.subject} onChange={handleRoutineModalChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter subject" /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Teacher<br /><input name="teacher" value={routineModal.teacher} onChange={handleRoutineModalChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter teacher" /></label>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button type="submit" style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Save</button>
                      <button type="button" onClick={handleRoutineModalDelete} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Delete</button>
                      <button type="button" onClick={handleRoutineModalCancel} style={{ background: '#eee', color: '#444', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {activeItem === 'Manage Announcement' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 8px 0' }}>
                <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600 }}>Announcements</h2>
                <button onClick={handleAddAnnouncement} style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontSize: '1rem', cursor: 'pointer' }}>Add Announcement</button>
              </div>
              <MockTable
                columns={['Title', 'Message', 'Date', 'Actions']}
                data={announcements.map((a, idx) => [
                  a.title,
                  a.message,
                  a.date,
                  <>
                    <button onClick={() => handleEditAnnouncement(idx)} style={{ marginRight: 8, background: '#f3eaff', color: '#6c3fc7', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteAnnouncement(idx)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </>
                ])}
              />
              {showAnnouncementForm && (
                <div className="modal-overlay" onClick={handleAnnouncementFormCancel}>
                  <div className="modal-card" onClick={e => e.stopPropagation()}>
                    <h3 style={{ color: '#6c3fc7' }}>{editAnnouncementIdx !== null ? 'Edit Announcement' : 'Add Announcement'}</h3>
                    <form onSubmit={handleAnnouncementFormSubmit}>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Title<br /><input name="title" value={announcementForm.title} onChange={handleAnnouncementFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter title" /></label>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Message<br /><textarea name="message" value={announcementForm.message} onChange={handleAnnouncementFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter message" rows={3} /></label>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Date<br /><input name="date" type="date" value={announcementForm.date} onChange={handleAnnouncementFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} /></label>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>{editAnnouncementIdx !== null ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={handleAnnouncementFormCancel} style={{ background: '#eee', color: '#444', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeItem === 'Learning Materials' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 8px 0' }}>
                <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600 }}>Learning Materials</h2>
                <button onClick={handleAddMaterial} style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontSize: '1rem', cursor: 'pointer' }}>Add Material</button>
              </div>
              <MockTable
                columns={['Title', 'Type', 'Link', 'Actions']}
                data={materials.map((m, idx) => [
                  m.title,
                  m.type,
                  <a href={m.link} target="_blank" rel="noopener noreferrer">View</a>,
                  <>
                    <button onClick={() => handleEditMaterial(idx)} style={{ marginRight: 8, background: '#f3eaff', color: '#6c3fc7', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteMaterial(idx)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </>
                ])}
              />
              {showMaterialForm && (
                <div className="modal-overlay" onClick={handleMaterialFormCancel}>
                  <div className="modal-card" onClick={e => e.stopPropagation()}>
                    <h3 style={{ color: '#6c3fc7' }}>{editMaterialIdx !== null ? 'Edit Material' : 'Add Material'}</h3>
                    <form onSubmit={handleMaterialFormSubmit}>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Title<br /><input name="title" value={materialForm.title} onChange={handleMaterialFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter title" /></label>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Type<br /><input name="type" value={materialForm.type} onChange={handleMaterialFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. Book, PDF, Link" /></label>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label>Link<br /><input name="link" value={materialForm.link} onChange={handleMaterialFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter URL" /></label>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>{editMaterialIdx !== null ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={handleMaterialFormCancel} style={{ background: '#eee', color: '#444', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeItem === 'Fees' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 8px 0' }}>
                <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600 }}>Fees</h2>
                <button onClick={handleAddFee} style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontSize: '1rem', cursor: 'pointer' }}>Add Fee</button>
              </div>
              <MockTable
                columns={['Student', 'Class', 'Amount', 'Due Date', 'Status', 'Actions']}
                data={fees.map((f, idx) => [
                  f.student,
                  f.className,
                  f.amount,
                  f.dueDate,
                  f.status,
                  <>
                    <button onClick={() => handleEditFee(idx)} style={{ marginRight: 8, background: '#f3eaff', color: '#6c3fc7', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteFee(idx)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </>
                ])}
              />
              {showFeeForm && (
                <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(44,19,56,0.06)', padding: '28px 32px', maxWidth: '400px', margin: '32px auto' }}>
                  <h3 style={{ color: '#6c3fc7' }}>{editFeeIdx !== null ? 'Edit Fee' : 'Add Fee'}</h3>
                  <form onSubmit={handleFeeFormSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Student<br /><input name="student" value={feeForm.student} onChange={handleFeeFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter student name" /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Class<br /><input name="className" value={feeForm.className} onChange={handleFeeFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter class" /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Amount<br /><input name="amount" type="number" value={feeForm.amount} onChange={handleFeeFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter amount" /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Due Date<br /><input name="dueDate" type="date" value={feeForm.dueDate} onChange={handleFeeFormChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} /></label>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label>Status<br />
                        <select name="status" value={feeForm.status} onChange={handleFeeFormChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                          <option>Unpaid</option>
                          <option>Paid</option>
                        </select>
                      </label>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button type="submit" style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>{editFeeIdx !== null ? 'Update' : 'Add'}</button>
                      <button type="button" onClick={handleFeeFormCancel} style={{ background: '#eee', color: '#444', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Dashboard Footer */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer-info">
          <div className="dashboard-footer-contact-title">Contact Us</div>
          <div className="dashboard-footer-phone">📞 9818505045</div>
          <div className="dashboard-footer-email">📧 smartshiksha@example.com</div>
          <div className="dashboard-footer-address">🏢 Baneshwor</div>
        </div>
        <div className="dashboard-footer-qr">
          <img src={barImg} alt="QR Code" className="dashboard-footer-qr-img" />
          <div className="dashboard-footer-qr-title">Download our app<br />on Playstore</div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
