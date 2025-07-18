const API_URL = "http://localhost:5000/api/routines";

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchRoutines() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch routines");
  return res.json();
}

export async function addRoutine(routine) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(routine)
  });
  if (!res.ok) throw new Error("Failed to add routine");
  return res.json();
}

export async function updateRoutine(id, routine) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(routine)
  });
  if (!res.ok) throw new Error("Failed to update routine");
  return res.json();
}

export async function deleteRoutine(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to delete routine");
  return res.json();
} 