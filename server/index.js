import express from 'express'
import cors from 'cors'
import connectDB from './mongodb.js'
import ContactMessage from './models/ContactMessage.js'

await connectDB()

const app = express()
app.use(cors())
app.use(express.json())

const ADMIN_EMAIL = 'baraka@admin.com'
const ADMIN_PASSWORD = 'Baraka@123'

// POST /api/messages — save a new contact message (public)
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

// POST /api/admin/login — verify admin credentials
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true })
  } else {
    res.status(401).json({ success: false, error: 'Invalid email or password' })
  }
})

// GET /api/admin/messages — fetch all messages (admin only via simple auth header)
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

// PATCH /api/admin/messages/:id/read — mark message as read
app.patch('/api/admin/messages/:id/read', async (req, res) => {
  const auth = req.headers['x-admin-auth']
  if (auth !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const { id } = req.params
  try {
    await ContactMessage.findByIdAndUpdate(id, { isRead: true })
    res.json({ success: true })
  } catch (err) {
    console.error('Update error:', err)
    res.status(500).json({ error: 'Failed to update message' })
  }
})

// DELETE /api/admin/messages/:id — delete a message
app.delete('/api/admin/messages/:id', async (req, res) => {
  const auth = req.headers['x-admin-auth']
  if (auth !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const { id } = req.params
  try {
    await ContactMessage.findByIdAndDelete(id)
    res.json({ success: true })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

// Health check
app.get('/api/health', (_, res) => res.json({ ok: true }))

const PORT = process.env.API_PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`)
})
