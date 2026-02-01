# 01 - Deployment Guide

> How we deployed Nexus Geom Lab to production (Vercel + Render)

## 🚀 The Setup

| Service | What it hosts | URL |
|---------|--------------|-----|
| **Vercel** | Frontend (React app) | https://nexus-geom-lab.vercel.app |
| **Render** | Backend (Express API) | https://nexus-geom-lab-backend-sn7k.onrender.com |
| **MongoDB Atlas** | Database | Cloud-hosted MongoDB |

---

## 🔧 Problems We Solved

### Problem 1: 404 Errors on Vercel (CSS/JS not loading)

**Symptom:**
```
Failed to load resource: the server responded with a status of 404
index-CYfXOyq7.css:1 Failed to load resource: 404
```

**Root Cause:**
Vite was configured with `base: '/nexus-geom-lab/'` for GitHub Pages, but Vercel deploys to root `/`.

**Solution:**
Updated `vite.config.js` to detect deployment target:

```javascript
// vite.config.js
const getBase = () => {
  if (process.env.VERCEL) return '/';  // Vercel sets this env var automatically
  if (process.env.NODE_ENV === 'production') return '/nexus-geom-lab/';  // GitHub Pages
  return '/';  // Local dev
};

export default defineConfig({
  base: getBase(),
  // ...
});
```

**Key Insight:** Vercel automatically sets `process.env.VERCEL = '1'` during builds.

---

### Problem 2: Output Directory Mismatch

**Symptom:**
```
Error: No Output Directory named "dist" found after the Build completed.
```

**Root Cause:**
- Vite was outputting to `docs/` (for GitHub Pages)
- Vercel expected `dist/`

**Solution:**
Created `vercel.json` to tell Vercel where to find the built files:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "docs"
}
```

---

### Problem 3: CORS Blocking Login Requests

**Symptom:**
```
Access to fetch at 'https://nexus-geom-lab-backend-sn7k.onrender.com/api/auth/login' 
from origin 'https://nexus-geom-lab.vercel.app' has been blocked by CORS policy
```

**Root Cause:**
Backend only allowed `localhost` and `github.io` origins, not `vercel.app`.

**Solution:**
Updated `nexus-geom-lab-backend/index.js`:

```javascript
// Before: Only allowed GitHub Pages
if (origin.startsWith('https://cordero080.github.io')) {
  return callback(null, true);
}

// After: Also allow Vercel
if (origin.includes('vercel.app') || origin.includes('nexus-geom-lab')) {
  console.log('CORS allowed for Vercel');
  return callback(null, true);
}
```

---

### Problem 4: Render Not Auto-Deploying

**Symptom:**
Vercel showed old commit from 53 days ago, not responding to git pushes.

**Root Cause:**
- Vercel was connected to the wrong repo, OR
- Webhook was broken

**Solution:**
Reconnected Vercel to the correct GitHub repo in Vercel Dashboard → Settings → Git.

---

### Problem 5: Render Backend Not Connected

**Symptom:**
Backend running old code without CORS fix.

**Solution:**
Connected Render to the monorepo with these settings:

| Setting | Value |
|---------|-------|
| Repository | `Cordero080/-nexus-geom-lab-backend` |
| Branch | `main` |
| Root Directory | `nexus-geom-lab-backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |

**Environment Variables needed:**
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `NODE_ENV` - `production`

---

## 📁 Key Configuration Files

### `vercel.json` (Frontend)
```json
{
  "buildCommand": "vite build",
  "outputDirectory": "docs"
}
```

### `vite.config.js` (Frontend)
```javascript
const getBase = () => {
  if (process.env.VERCEL) return '/';
  if (process.env.NODE_ENV === 'production') return '/nexus-geom-lab/';
  return '/';
};
```

### Backend CORS (index.js)
```javascript
cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost:')) return callback(null, true);
    if (origin.startsWith('https://cordero080.github.io')) return callback(null, true);
    if (origin.includes('vercel.app')) return callback(null, true);
    callback(null, false);
  }
})
```

---

## 🎓 Key Learnings

1. **Environment Detection** - Use environment variables to change behavior per deployment target
2. **CORS is Origin-Based** - Backend must explicitly allow each frontend domain
3. **Monorepo Setup** - Render/Vercel can deploy from subdirectories using "Root Directory" setting
4. **Vercel vs GitHub Pages** - Different base paths (`/` vs `/repo-name/`)
5. **Always Check Webhooks** - If auto-deploy isn't working, the Git connection is probably broken
