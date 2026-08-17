const BASE = '/api'

// ── Contact Messages ──────────────────────────────────────

export async function submitContactMessage(data) {
  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ── Auth ──────────────────────────────────────────────────

export async function registerUser(name, email, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return res.json()
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function upgradeUserToPremium(email) {
  const res = await fetch(`${BASE}/auth/premium/${encodeURIComponent(email)}`, {
    method: 'PATCH',
  })
  return res.json()
}

// ── Payments ──────────────────────────────────────────────

export async function recordPayment(data) {
  const res = await fetch(`${BASE}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ── Admin ─────────────────────────────────────────────────

export async function adminLogin(email, password) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function fetchAdminMessages(authHeader) {
  const res = await fetch(`${BASE}/admin/messages`, {
    headers: { 'x-admin-auth': authHeader },
  })
  return res.json()
}

export async function markMessageRead(id, authHeader) {
  await fetch(`${BASE}/admin/messages/${id}/read`, {
    method: 'PATCH',
    headers: { 'x-admin-auth': authHeader },
  })
}

export async function deleteAdminMessage(id, authHeader) {
  await fetch(`${BASE}/admin/messages/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-auth': authHeader },
  })
}
