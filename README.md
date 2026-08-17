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
- MongoDB (Database via Mongoose)

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

## MongoDB Setup

### 1. Environment Variables

Create a `.env` file in the root:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/barakadevx?retryWrites=true&w=majority
```

Get your connection string from [MongoDB Atlas](https://cloud.mongodb.com).

### 2. Database Collections

MongoDB creates collections automatically. The app uses:

- **contactmessages** — Contact form submissions
- **payments** — PawaPay donation records
- **testimonials** — User testimonials

### 3. Usage

The Express API connects to MongoDB on startup via Mongoose. All data flows through `server/index.js`:

```bash
# Start the API server (port 3001)
npm run dev:api

# Start both API + frontend
npm run dev
```

## License

MIT
