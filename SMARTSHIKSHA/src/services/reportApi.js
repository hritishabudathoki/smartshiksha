const API_URL = "http://localhost:5000/api/reports";

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchReports() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}

export async function addReport(report) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(report)
  });
  if (!res.ok) throw new Error("Failed to add report");
  return res.json();
}

export async function updateReport(id, report) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(report)
  });
  if (!res.ok) throw new Error("Failed to update report");
  return res.json();
}

export async function deleteReport(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to delete report");
  return res.json();
} 