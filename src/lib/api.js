const BASE = '/api'

const ADMIN_EMAIL = 'baraka@admin.com'
const ADMIN_PASSWORD = 'Baraka@123'
const adminAuth = `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`

// ── Public ──────────────────────────────────────────────
export async function submitContactMessage(data) {
  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ── Admin ────────────────────────────────────────────────
export async function adminLogin(email, password) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function fetchAdminMessages() {
  const res = await fetch(`${BASE}/admin/messages`, {
    headers: { 'x-admin-auth': adminAuth },
  })
  return res.json()
}

export async function markMessageRead(id) {
  await fetch(`${BASE}/admin/messages/${id}/read`, {
    method: 'PATCH',
    headers: { 'x-admin-auth': adminAuth },
  })
}

export async function deleteAdminMessage(id) {
  await fetch(`${BASE}/admin/messages/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-auth': adminAuth },
  })
}
