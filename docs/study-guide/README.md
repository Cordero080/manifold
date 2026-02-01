# Nexus Geom Lab - Study Guide & Documentation

> A comprehensive guide for understanding this React + Three.js application, written for someone transitioning from beginner to interview-ready.

## 📚 Table of Contents

1. [Deployment Guide](./01-DEPLOYMENT.md) - How we deployed to Vercel + Render
2. [React Fundamentals](./02-REACT-FUNDAMENTALS.md) - Core concepts used in this app
3. [App Architecture](./03-APP-ARCHITECTURE.md) - How the app is structured
4. [Hooks Deep Dive](./04-HOOKS-DEEP-DIVE.md) - useState, useEffect, custom hooks
5. [State Management](./05-STATE-MANAGEMENT.md) - Context API, prop drilling, lifting state
6. [Loading & Error Handling](./06-LOADING-ERROR-HANDLING.md) - Async patterns, suspense, error boundaries
7. [Three.js Integration](./07-THREEJS-INTEGRATION.md) - How 3D rendering works with React
8. [Authentication Flow](./08-AUTHENTICATION.md) - JWT, protected routes, auth context
9. [API Integration](./09-API-INTEGRATION.md) - Frontend-backend communication
10. [Interview Prep](./10-INTERVIEW-PREP.md) - Common questions and how this app demonstrates answers

---

## 🎯 How to Use This Guide

1. **Start with Architecture** - Understand the big picture first
2. **Deep dive into Hooks** - This is where React "clicks"
3. **Study the patterns** - Loading, error handling, state management
4. **Practice explaining** - Use this app as your portfolio talking point

---

## 🏗️ Quick App Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND (Vercel)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  React App (Vite)                               │   │
│  │  ├── Pages (HomePage, MyScenesPage, Lab)        │   │
│  │  ├── Components (NavBar, Buttons, Modals)       │   │
│  │  ├── Context (AuthContext, SceneContext)        │   │
│  │  ├── Hooks (useAuth, useSceneState, useParallax)│   │
│  │  └── Three.js (3D Geometry Rendering)           │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│                    HTTP Requests                        │
│                          ▼                              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Render)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Express.js API                                 │   │
│  │  ├── /api/auth (login, signup)                  │   │
│  │  ├── /api/scenes (CRUD operations)             │   │
│  │  └── Middleware (JWT auth, CORS, rate limiting) │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│                    MongoDB Atlas                        │
│                          ▼                              │
└─────────────────────────────────────────────────────────┘
```

---

## 📅 Last Updated
February 1, 2026 - After successful Vercel + Render deployment
