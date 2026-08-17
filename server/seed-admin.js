import 'dotenv/config'
import connectDB from './mongodb.js'
import User from './models/User.js'

await connectDB()

const adminEmail = 'Baraka@admin.com'
const adminPassword = 'Admin@123'

try {
  const existing = await User.findOne({ email: adminEmail })
  if (existing) {
    console.log(`Admin user already exists: ${adminEmail}`)
  } else {
    await User.create({
      name: 'Baraka Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    })
    console.log(`Admin user created: ${adminEmail}`)
  }
} catch (err) {
  console.error('Seed error:', err.message)
} finally {
  process.exit(0)
}
