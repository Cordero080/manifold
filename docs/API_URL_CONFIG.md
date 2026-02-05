# API URL Configuration

## The Problem

When developing locally, you might encounter a **401 Invalid token** error when saving scenes, even though you're logged in.

### Root Cause

The app has two API services:
- `authApi.js` - handles login/signup
- `sceneApi.jsx` - handles saving/loading scenes

If these two files use **different backends**, you get a token mismatch:

1. You login via **Render** (production backend) → get token signed with Render's `JWT_SECRET`
2. You save scene via **localhost** (local backend) → token fails because local backend has a different `JWT_SECRET`

## The Solution

Both API files must use the **same backend** based on environment:

```javascript
// In development: use empty string (Vite proxy forwards /api to backend)
// In production: Use Render backend URL
const API_BASE_URL = import.meta.env.PROD ? 'https://nexus-geom-lab-backend-sn7k.onrender.com' : '';
```

### How it works

| Environment | `import.meta.env.PROD` | `API_BASE_URL` | Backend Used |
|-------------|------------------------|----------------|--------------|
| `npm run dev` | `false` | `''` (empty) | Vite proxy → localhost:3000 |
| Vercel/Production | `true` | Render URL | Render backend |

### Files that need this config

- `src/features/auth/services/authApi.js`
- `src/services/sceneApi.jsx`

## Local Development Setup

1. Start backend: `make b` (runs on port 3000)
2. Start frontend: `make f` (runs on port 5173)
3. Vite proxy forwards `/api/*` requests to `localhost:3000`

## Troubleshooting

### Still getting 401 errors?

1. **Check both backends match** - Make sure both API files use the same `API_BASE_URL` logic
2. **Clear old tokens** - Log out, clear localStorage, log back in
3. **Restart backend** - If you restarted the backend, tokens from before are invalid (different JWT signing)

### Check your token source

Open browser DevTools console and run:
```javascript
console.log('Token:', localStorage.getItem('token'));
```

Then compare with what the backend expects by testing directly:
```bash
curl -s http://localhost:3000/health
```
