const API_URL = "http://localhost:5000/api/learning-materials";

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchLearningMaterials() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch learning materials");
  return res.json();
}

export async function addLearningMaterial(material) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(material)
  });
  if (!res.ok) throw new Error("Failed to add learning material");
  return res.json();
}

export async function updateLearningMaterial(id, material) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(material)
  });
  if (!res.ok) throw new Error("Failed to update learning material");
  return res.json();
}

export async function deleteLearningMaterial(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to delete learning material");
  return res.json();
} 