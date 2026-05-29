# Aegis Legal Partners

A cinematic, enterprise-grade Law Firm Progressive Web App with a Next.js frontend and Express backend.

## Stack

- `frontend/`: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, next-pwa
- `backend/`: Node.js, Express, CORS, dotenv, structured in-memory JSON arrays

## Local Development

```bash
npm install
npm run dev
```

The root `dev` script starts the Express API on `http://localhost:5000` and the Next.js app on `http://localhost:3000`.

## Environment

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `backend/.env`:

```bash
PORT=5000
FRONTEND_URL=http://localhost:3000
FRONTEND_URLS=http://localhost:3000,https://your-vercel-app.vercel.app
```

## Production Checks

```bash
npm run lint --workspace frontend
npm run build
node --check backend/server.js
```

## Frontend Deployment: Vercel

Deploy `frontend/` to Vercel and set:

```bash
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app
```

Recommended Vercel settings:

```bash
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Install Command: npm install
Output Directory: .next
```

## Backend Deployment: Render

Deploy `backend/` to Render using:

```bash
npm install
npm start
```

Set the backend environment variable:

```bash
FRONTEND_URL=https://your-vercel-app.vercel.app
FRONTEND_URLS=https://your-vercel-app.vercel.app
NODE_ENV=production
```

Render settings:

```bash
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

## Production Features

- OpenGraph and Twitter metadata
- `robots.txt` and `sitemap.xml`
- PWA manifest, install shortcut, and service worker caching
- Vercel caching and security headers
- Render-safe Express `PORT` handling
- Hardened CORS and consultation validation
