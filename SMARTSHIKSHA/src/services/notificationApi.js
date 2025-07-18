const API_URL = "http://localhost:5000/api/notifications";

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchNotifications() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function addNotification(notification) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(notification)
  });
  if (!res.ok) throw new Error("Failed to add notification");
  return res.json();
}

export async function updateNotification(id, notification) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(notification)
  });
  if (!res.ok) throw new Error("Failed to update notification");
  return res.json();
}

export async function deleteNotification(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to delete notification");
  return res.json();
} 