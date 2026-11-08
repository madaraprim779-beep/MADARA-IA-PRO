const API_BASE_URL = '';

export async function apiRequest(endpoint, options = {}) {
const response = await fetch("${API_BASE_URL}${endpoint}", {
...options,
headers: {
'Content-Type': 'application/json',
...options.headers
}
});

const data = await response.json().catch(() => ({}));

if (!response.ok) {
throw new Error(
data.error || "Erreur serveur : ${response.status}"
);
}

return data;
}

export function checkApiStatus() {
return apiRequest('/api/health');
}