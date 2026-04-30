# Baraka DevX Portfolio

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive**: Works perfectly on all devices
- **Animations**: Smooth scroll animations powered by Framer Motion
- **Sections**:
  - Hero with animated intro
  - About with stats and features
  - Skills with progress bars
  - Projects showcase
  - Contact form
  - Footer

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Supabase (Database & Auth)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

Edit the component files in `src/components/` to update:
- Personal information
- Projects
- Skills
- Contact details
- Colors and styling

## Supabase Setup

### 1. Environment Variables

Create a `.env` file in the root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

### 2. Database Tables

Create these tables in your Supabase project:

**Contacts Table** (stores contact form submissions):
```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table contacts enable row level security;

CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);
```

### 3. Usage

The Contact form automatically saves to Supabase. You can view submissions in your Supabase dashboard or query them:

```javascript
import { useSupabase } from './contexts/SupabaseContext'

const { fetchData, insertData } = useSupabase()

// Fetch all contacts
const contacts = await fetchData('contacts')

// Insert new contact
await insertData('contacts', { name, email, subject, message })
```

See `SUPABASE_SETUP.md` for more details.

## License

MIT
