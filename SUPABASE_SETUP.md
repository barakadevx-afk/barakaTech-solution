# Supabase Setup Guide

## Database Tables

### 1. Contacts Table
Store contact form submissions:

```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table contacts enable row level security;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow admin to read all
CREATE POLICY "Allow admin read all" ON contacts
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

### 2. Users Table (for auth)
Users are automatically managed by Supabase Auth.

### 3. Payments Table (for PawaPay)
Store payment transactions:

```sql
create table payments (
  id uuid default gen_random_uuid() primary key,
  amount integer not null,
  currency text default 'RWF',
  payer_phone text not null,
  recipient_phone text not null,
  method text not null,
  status text default 'PENDING',
  reference text,
  pawapay_transaction_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table payments enable row level security;

CREATE POLICY "Allow anonymous inserts" ON payments
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow admin read all" ON payments
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

### 4. Testimonials Table (optional)
Store dynamic testimonials:

```sql
create table testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  content text not null,
  rating integer default 5,
  project text,
  image text,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table testimonials enable row level security;

CREATE POLICY "Allow public read" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admin write" ON testimonials
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

## Environment Variables

Add to your `.env` file:
```
VITE_SUPABASE_URL=https://suuzfkehyrtmsyvzbcvc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fApvOEDooBPIv4xPVaJ8CA_Gbq3QPBg
```

## Usage Examples

### Fetch Data
```javascript
import { useSupabase } from './contexts/SupabaseContext'

const { fetchData, loading, error } = useSupabase()

// Get all testimonials
const testimonials = await fetchData('testimonials', {
  order: { column: 'created_at', ascending: false }
})

// Get featured only
const featured = await fetchData('testimonials', {
  eq: { column: 'is_featured', value: true }
})
```

### Insert Data
```javascript
const { insertData } = useSupabase()

const newContact = await insertData('contacts', {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!'
})
```

### Real-time Updates
```javascript
const { subscribeToChanges } = useSupabase()

// Subscribe to new contacts
const unsubscribe = subscribeToChanges('contacts', (payload) => {
  console.log('New contact:', payload.new)
})

// Clean up
return () => unsubscribe()
```

## Admin Dashboard Integration

In your admin dashboard, you can query all data:

```javascript
const { fetchData } = useSupabase()

// Get all contacts
const contacts = await fetchData('contacts', {
  order: { column: 'created_at', ascending: false }
})

// Get all users (requires admin role)
const { data: users } = await supabase.auth.admin.listUsers()
```

## Notes
- Always enable RLS (Row Level Security) on tables
- Set up proper policies for read/write access
- Use environment variables for credentials
- Never expose service_role key in frontend
