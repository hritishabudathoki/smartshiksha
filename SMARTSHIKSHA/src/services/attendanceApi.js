const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/attendance';

function getToken() {
  return localStorage.getItem('token');
}

export async function fetchAttendance() {
  const res = await fetch(API_URL, {
    headers: { Authorization: 'Bearer ' + getToken() },
  });
  if (!res.ok) throw new Error('Failed to fetch attendance');
  return res.json();
}

export async function addAttendance(attendance) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
    body: JSON.stringify(attendance),
  });
  if (!res.ok) throw new Error('Failed to add attendance');
  return res.json();
}

export async function updateAttendance(id, attendance) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
    body: JSON.stringify(attendance),
  });
  if (!res.ok) throw new Error('Failed to update attendance');
  return res.json();
}

export async function deleteAttendance(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + getToken() },
  });
  if (!res.ok) throw new Error('Failed to delete attendance');
  return res.json();
} 