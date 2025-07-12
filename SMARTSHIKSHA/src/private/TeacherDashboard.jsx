import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../styles/TeacherDashboard.css';
import DashboardHome from './DashboardHome';
import MockTable from './MockTable';
import MockList from './MockList';
import TopBar from './TopBar';

const sidebarItems = [
  { label: 'Home', icon: <span role="img" aria-label="home">🏠</span> },
  { label: 'My Classes', icon: <span role="img" aria-label="class">📚</span> },
  { label: 'My Students', icon: <span role="img" aria-label="students">👨‍🎓</span> },
  { label: 'Attendance', icon: <span role="img" aria-label="attendance">✅</span> },
  { label: 'Results', icon: <span role="img" aria-label="results">🎓</span> },
  { label: 'Profile', icon: <span role="img" aria-label="profile">👤</span> },
];

const mockNotifications = [
  { title: 'Assignment Graded', description: 'You graded Assignment 2 for Class 10A.' },
  { title: 'Lesson Updated', description: 'Lesson “Algebra” updated for Class 9B.' },
  { title: 'New Student Added', description: 'Student “Riya” joined Class 8C.' },
];

const teacherStats = [
  { label: 'My Classes', value: 5, icon: <span role="img" aria-label="class">📚</span> },
  { label: 'My Students', value: 120, icon: <span role="img" aria-label="students">👨‍🎓</span> },
  { label: 'Lessons', value: 22, icon: <span role="img" aria-label="lessons">📖</span> },
  { label: 'Assignments', value: 8, icon: <span role="img" aria-label="assignments">📝</span> },
];

const mockMyClasses = [
  { className: '10A', subject: 'Math', students: ['Riya', 'Aman', 'Priya'] },
  { className: '9B', subject: 'Science', students: ['Manas', 'Sita', 'Rahul'] },
];
const mockMyStudents = [
  ['Riya', '10A'],
  ['Manas', '9B'],
];
const mockMyLessons = [
  ['Algebra', '10A'],
  ['Biology', '9B'],
];
const mockProfile = ['Name: Alex', 'Email: teacher@school.com', 'Department: Science'];

const TeacherDashboard = () => {
  const [activeItem, setActiveItem] = useState('Home');
  // Attendance and results state
  const [attendance, setAttendance] = useState({}); // { '10A': { 'Riya': 'Present', ... }, ... }
  const [results, setResults] = useState({}); // { '10A': { 'Riya': 'A', ... }, ... }
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [attendanceForm, setAttendanceForm] = useState({});
  const [resultForm, setResultForm] = useState({});

  const handleSidebarClick = (label) => {
    setActiveItem(label);
  };

  const handleMarkAttendance = (classObj) => {
    setCurrentClass(classObj);
    setAttendanceForm(
      Object.fromEntries(classObj.students.map(s => [s, attendance[classObj.className]?.[s] || 'Present']))
    );
    setShowAttendanceModal(true);
  };
  const handlePublishResult = (classObj) => {
    setCurrentClass(classObj);
    setResultForm(
      Object.fromEntries(classObj.students.map(s => [s, results[classObj.className]?.[s] || '']))
    );
    setShowResultModal(true);
  };
  const handleAttendanceChange = (student, value) => {
    setAttendanceForm({ ...attendanceForm, [student]: value });
  };
  const handleResultChange = (student, value) => {
    setResultForm({ ...resultForm, [student]: value });
  };
  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    setAttendance({ ...attendance, [currentClass.className]: attendanceForm });
    setShowAttendanceModal(false);
  };
  const handleResultSubmit = (e) => {
    e.preventDefault();
    setResults({ ...results, [currentClass.className]: resultForm });
    setShowResultModal(false);
  };

  return (
    <div>
      <TopBar username="Alex" role="Teacher" />
      <div className="dashboard-container">
        <Sidebar items={sidebarItems} activeItem={activeItem} onItemClick={setActiveItem} />
        <div className="dashboard-content">
          <div className="dashboard-header">
            {/* Removed old username display, now in TopBar */}
          </div>
          {activeItem === 'Home' && (
            <DashboardHome
              role="Teacher"
              stats={[
                { label: 'My Classes', value: mockMyClasses.length, icon: <span role="img" aria-label="class">📚</span> },
                { label: 'My Students', value: mockMyClasses.reduce((acc, c) => acc + c.students.length, 0), icon: <span role="img" aria-label="students">👨‍🎓</span> },
                { label: 'Results Published', value: Object.values(results).reduce((acc, r) => acc + Object.values(r || {}).filter(v => v).length, 0), icon: <span role="img" aria-label="results">🎓</span> },
                { label: 'Attendance Marked', value: Object.values(attendance).reduce((acc, a) => acc + Object.values(a || {}).filter(v => v).length, 0), icon: <span role="img" aria-label="attendance">✅</span> },
              ]}
            />
          )}
          {activeItem === 'My Classes' && (
            <MockTable columns={['Class', 'Subject']} data={mockMyClasses.map(c => [c.className, c.subject])} />
          )}
          {activeItem === 'Attendance' && (
            <div>
              <h2 style={{ color: '#6c3fc7', fontSize: '1.3rem', fontWeight: 600, margin: '24px 0 8px 0' }}>Mark Attendance</h2>
              {mockMyClasses.map((c, idx) => (
                <div key={idx} style={{ marginBottom: '32px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(44,19,56,0.06)', padding: '24px 28px' }}>
                  <h4 style={{ color: '#6c3fc7', marginBottom: '12px' }}>{c.className} - {c.subject}</h4>
                  <form onSubmit={e => { e.preventDefault(); }}>
                    <table className="mock-table">
                      <thead>
                        <tr><th>Student</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {c.students.map((student, sidx) => (
                          <tr key={sidx}>
                            <td>{student}</td>
                            <td>
                              <select value={attendance[c.className]?.[student] || 'Present'} onChange={e => setAttendance({ ...attendance, [c.className]: { ...attendance[c.className], [student]: e.target.value } })} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option>Present</option>
                                <option>Absent</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button type="button" onClick={() => setAttendance({ ...attendance, [c.className]: { ...attendance[c.className] } })} style={{ background: '#6c3fc7', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Save</button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          )}
          {activeItem === 'Results' && (
            <div>
              <h2 style={{ color: '#388e3c', fontSize: '1.3rem', fontWeight: 600, margin: '24px 0 8px 0' }}>Publish Results</h2>
              {mockMyClasses.map((c, idx) => (
                <div key={idx} style={{ marginBottom: '32px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(44,19,56,0.06)', padding: '24px 28px' }}>
                  <h4 style={{ color: '#388e3c', marginBottom: '12px' }}>{c.className} - {c.subject}</h4>
                  <form onSubmit={e => { e.preventDefault(); }}>
                    <table className="mock-table">
                      <thead>
                        <tr><th>Student</th><th>Result</th></tr>
                      </thead>
                      <tbody>
                        {c.students.map((student, sidx) => (
                          <tr key={sidx}>
                            <td>{student}</td>
                            <td>
                              <input value={results[c.className]?.[student] || ''} onChange={e => setResults({ ...results, [c.className]: { ...results[c.className], [student]: e.target.value } })} placeholder="Grade/Marks" style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button type="button" onClick={() => setResults({ ...results, [c.className]: { ...results[c.className] } })} style={{ background: '#388e3c', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: 'pointer' }}>Save</button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          )}
          {activeItem === 'My Students' && (
            <MockTable columns={['Student', 'Class']} data={mockMyStudents} />
          )}
          {activeItem === 'My Lessons' && (
            <MockTable columns={['Lesson', 'Class']} data={mockMyLessons} />
          )}
          {activeItem === 'Profile' && (
            <MockList title="Profile" items={mockProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
