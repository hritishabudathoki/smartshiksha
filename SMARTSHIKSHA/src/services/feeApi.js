const API_URL = "http://localhost:5000/api/fees";

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchFees() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch fees");
  return res.json();
}

export async function addFee(fee) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(fee)
  });
  if (!res.ok) throw new Error("Failed to add fee");
  return res.json();
}

export async function updateFee(id, fee) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(fee)
  });
  if (!res.ok) throw new Error("Failed to update fee");
  return res.json();
}

export async function deleteFee(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to delete fee");
  return res.json();
} 