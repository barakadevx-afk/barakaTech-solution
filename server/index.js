import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './mongodb.js'
import ContactMessage from './models/ContactMessage.js'
import User from './models/User.js'
import Payment from './models/Payment.js'

await connectDB()

const app = express()
app.use(cors())
app.use(express.json())

const ADMIN_EMAIL = 'baraka@admin.com'
const ADMIN_PASSWORD = 'Baraka@123'

const isAdminAuth = (req) => {
  const auth = req.headers['x-admin-auth']
  return auth === `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`
}

// ── Contact Messages ──────────────────────────────────────

app.post('/api/messages', async (req, res) => {
  const { name, email, projectType, budget, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }
  try {
    const doc = await ContactMessage.create({ name, email, projectType, budget, message })
    res.status(201).json({ success: true, message: doc })
  } catch (err) {
    console.error('Insert error:', err)
    res.status(500).json({ error: 'Failed to save message' })
  }
})

// ── Auth ──────────────────────────────────────────────────

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' })
  }
  try {
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }
    const user = await User.create({ name, email, password })
    res.status(201).json({ success: true, user })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const valid = await user.comparePassword(password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    res.json({ success: true, user })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Failed to login' })
  }
})

app.patch('/api/auth/premium/:email', async (req, res) => {
  const { email } = req.params
  try {
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isPremium: true, premiumSince: new Date() },
      { new: true }
    )
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ success: true, user })
  } catch (err) {
    console.error('Premium error:', err)
    res.status(500).json({ error: 'Failed to upgrade user' })
  }
})

// ── Payments ──────────────────────────────────────────────

app.post('/api/payments', async (req, res) => {
  const { amount, currency, payerPhone, recipientPhone, method, status, reference, pawapayTransactionId } = req.body
  if (!amount || !payerPhone || !method) {
    return res.status(400).json({ error: 'amount, payerPhone, and method are required' })
  }
  try {
    const doc = await Payment.create({
      amount, currency, payerPhone, recipientPhone,
      method, status, reference, pawapayTransactionId,
    })
    res.status(201).json({ success: true, payment: doc })
  } catch (err) {
    console.error('Payment insert error:', err)
    res.status(500).json({ error: 'Failed to record payment' })
  }
})

app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 }).lean()
    res.json({ payments })
  } catch (err) {
    console.error('Payment fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch payments' })
  }
})

// ── Admin ─────────────────────────────────────────────────

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' })
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' })
    }
    const valid = await user.comparePassword(password)
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' })
    }
    res.json({ success: true, user })
  } catch (err) {
    console.error('Admin login error:', err)
    res.status(500).json({ error: 'Failed to login' })
  }
})

app.get('/api/admin/messages', async (req, res) => {
  const auth = req.headers['x-admin-auth']
  if (auth !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
    res.json({ messages })
  } catch (err) {
    console.error('Fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

app.patch('/api/admin/messages/:id/read', async (req, res) => {
  const auth = req.headers['x-admin-auth']
  if (auth !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true })
    res.json({ success: true })
  } catch (err) {
    console.error('Update error:', err)
    res.status(500).json({ error: 'Failed to update message' })
  }
})

app.delete('/api/admin/messages/:id', async (req, res) => {
  const auth = req.headers['x-admin-auth']
  if (auth !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  try {
    await ContactMessage.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

app.get('/api/health', (_, res) => res.json({ ok: true }))

const PORT = process.env.API_PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`)
})
