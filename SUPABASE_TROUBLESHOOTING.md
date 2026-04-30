# Supabase Troubleshooting Guide

## Common Issues & Solutions

### 1. "Invalid API key" Error

**Problem:** Your key looks like: `sb_publishable_...`

**Solution:** This is NOT a valid Supabase key. Get the correct key:

1. Go to [supabase.com](https://supabase.com) and log in
2. Select your project
3. Go to **Project Settings** → **API**
4. Copy the **anon public** key (starts with `eyJhbGci...`)

```
✓ Correct format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✗ Wrong format: sb_publishable_fApvOEDooBPIv4xPVaJ8CA_Gbq3QPBg
```

### 2. "Table 'contacts' does not exist" Error

**Solution:** Create the table in Supabase:

1. Go to **Table Editor** in your Supabase dashboard
2. Click **New table**
3. Name: `contacts`
4. Enable **Row Level Security (RLS)**
5. Add these columns:
   - `id` (uuid, primary key, default: `gen_random_uuid()`)
   - `name` (text, not null)
   - `email` (text, not null)
   - `subject` (text, not null)
   - `message` (text, not null)
   - `created_at` (timestamptz, default: `now()`)

### 3. "new row violates row-level security policy" Error

**Solution:** Add RLS policy for inserts:

1. Go to **Authentication** → **Policies**
2. Find the `contacts` table
3. Click **New policy**
4. Select template: "Enable insert access for all users"
5. Or use this SQL:

```sql
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);
```

### 4. Environment Variables Not Loading

**Problem:** `VITE_SUPABASE_URL` is undefined

**Solution:** 
1. Make sure `.env` file is in the project **root** (not src/)
2. Variables must start with `VITE_` for Vite
3. Restart dev server after adding env vars

```bash
# .env file location
rain/
├── .env          ← Put it here
├── src/
└── ...
```

### 5. Network/CORS Errors

**Problem:** "Failed to fetch" or CORS errors

**Solution:**
1. Check if Supabase URL is correct
2. Go to **Project Settings** → **API** → **URL**
3. Format should be: `https://your-project-ref.supabase.co`

## Testing Your Setup

### Quick Test

1. Open browser console (F12)
2. Navigate to Contact page
3. Click **"Test Connection"** in the debug panel
4. Check console for detailed logs

### Manual SQL Test

Run this in Supabase SQL Editor:

```sql
-- Check if table exists
SELECT * FROM information_schema.tables 
WHERE table_name = 'contacts';

-- Check RLS policies
SELECT * FROM pg_policies 
WHERE tablename = 'contacts';

-- Test insert (should work with proper RLS)
INSERT INTO contacts (name, email, subject, message, created_at)
VALUES ('Test', 'test@test.com', 'Test', 'Message', now());
```

## Correct .env Format

```env
VITE_SUPABASE_URL=https://suuzfkehyrtmsyvzbcvc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Where to Find Your Keys

1. Log into [supabase.com](https://supabase.com)
2. Select your project
3. Click gear icon → **Project Settings**
4. Click **API** in sidebar
5. Copy:
   - **URL** (Project URL)
   - **anon public** (JWT token, not "publishable" key)

## Debug Panel

The Contact page now includes a **Supabase Debug Panel** that shows:
- ✓ Environment variables status
- ✓ Connection test results
- ✓ Table existence check
- ✓ Test data insert functionality

Use it to diagnose issues quickly.

## Still Not Working?

1. Check browser console (F12) for detailed error messages
2. Verify your Supabase project is active (not paused)
3. Make sure you're using the **anon** key, not service_role key
4. Try creating a fresh Supabase project if issues persist
