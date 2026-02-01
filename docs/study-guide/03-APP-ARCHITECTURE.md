# 03 - App Architecture

> How Nexus Geom Lab is structured and how data flows through it

## 🗺️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           App.jsx                                │
│  (Routes, AuthProvider, ErrorBoundary)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   HomePage   │  │ MyScenesPage │  │  ThreeScene  │          │
│  │  (Landing)   │  │ (User Scenes)│  │   (3D Lab)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                 │                  │                   │
│         ▼                 ▼                  ▼                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Shared Components                      │   │
│  │  NavBar, Modals, BeamScanButton, QuantumCursor           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         ▼                    ▼                    ▼              │
│  ┌────────────┐      ┌────────────┐      ┌────────────┐        │
│  │AuthContext │      │SceneContext│      │  Services  │        │
│  │(User State)│      │(3D State)  │      │ (API Calls)│        │
│  └────────────┘      └────────────┘      └────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Backend API    │
                    │    (Render)     │
                    └─────────────────┘
```

---

## 📁 Directory Structure Explained

```
src/
├── main.jsx              # Entry point - renders App into DOM
├── App.jsx               # Root component - routing, providers
├── index.css             # Global styles
│
├── components/           # UI Components
│   ├── layout/
│   │   └── NavBar/       # Site navigation
│   ├── pages/
│   │   ├── HomePage/     # Landing page with animations
│   │   ├── MyScenesPage/ # User's saved scenes
│   │   └── Showcase/     # Public gallery
│   └── ui/
│       ├── BeamScanButton/   # Fancy animated button
│       ├── Modals/           # Save/Load dialogs
│       ├── Effects/          # QuantumCursor, backgrounds
│       └── ErrorBoundary/    # Catches React errors
│
├── features/             # Feature modules (domain logic)
│   ├── auth/
│   │   ├── context/      # AuthContext (login state)
│   │   ├── pages/        # LoginPage, SignUpPage
│   │   └── services/     # authApi.js (API calls)
│   └── sceneControls/
│       ├── components/   # Controls panel, sliders
│       ├── hooks/        # useSceneState, useAnimation
│       ├── geometries/   # 3D shape generators
│       └── threeSetup/   # Three.js initialization
│
├── context/              # React Contexts
│   └── SceneContext.jsx  # Global 3D scene state
│
├── hooks/                # Custom hooks
│   ├── useParallax.js    # Mouse parallax effect
│   ├── useQuantumState.js# Random state animation
│   └── useSceneState.js  # Scene configuration
│
├── services/             # API communication
│   └── sceneApi.jsx      # Save/load scenes to backend
│
├── utils/                # Helper functions
│   ├── coreHelpers.js    # Utility functions
│   └── threeConstants.js # 3D configuration values
│
└── styles/               # CSS files
    ├── core/             # Reset, fonts, animations
    ├── layout/           # Cursor, navigation
    └── shared/           # Buttons, common elements
```

---

## 🔀 Data Flow

### 1. User Authentication Flow
```
User clicks "Login"
        │
        ▼
┌─────────────────┐
│   LoginPage     │ ──► authApi.login(email, password)
└─────────────────┘              │
                                 ▼
                    ┌─────────────────────┐
                    │   Backend /api/auth │
                    └─────────────────────┘
                                 │
                                 ▼
                    Returns { token, user }
                                 │
        ┌────────────────────────┘
        ▼
┌─────────────────┐
│  AuthContext    │ ──► Stores token in localStorage
│  setUser(user)  │     Updates user state
└─────────────────┘
        │
        ▼
All components using useAuth() re-render with new user
```

### 2. Scene State Flow
```
User adjusts metalness slider
        │
        ▼
┌─────────────────┐
│ Controls.jsx    │ ──► onChange={(e) => setMetalness(e.target.value)}
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  SceneContext   │ ──► metalness state updates
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  ThreeScene     │ ──► Reads metalness from context
│  (3D Renderer)  │     Updates Three.js material
└─────────────────┘
        │
        ▼
3D object visually updates in real-time
```

### 3. Save Scene Flow
```
User clicks "Save"
        │
        ▼
┌─────────────────┐
│ SaveModal.jsx   │ ──► Collects scene name
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ SceneContext    │ ──► Gathers all current settings
│ getSceneConfig()│     (metalness, color, geometry, etc.)
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ sceneApi.jsx    │ ──► POST /api/scenes { name, config }
│ saveScene()     │     with JWT token in header
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Backend saves   │ ──► MongoDB stores scene document
│ to database     │
└─────────────────┘
```

---

## 🎯 Key Architectural Decisions

### 1. Context for Global State
**Why:** Avoid "prop drilling" (passing props through many levels)

```jsx
// WITHOUT Context (prop drilling nightmare):
<App user={user}>
  <Layout user={user}>
    <NavBar user={user}>
      <UserMenu user={user} />  // Finally used here!
    </NavBar>
  </Layout>
</App>

// WITH Context:
<AuthProvider>  {/* Provides user to all children */}
  <App>
    <Layout>
      <NavBar>
        <UserMenu />  {/* Uses useAuth() to get user */}
      </NavBar>
    </Layout>
  </App>
</AuthProvider>
```

### 2. Feature-Based Structure
**Why:** Keep related code together, easier to maintain

```
features/auth/           # All auth code in one place
├── context/AuthContext  # State management
├── pages/LoginPage      # UI
├── services/authApi     # API calls
```

### 3. Custom Hooks for Reusable Logic
**Why:** Share stateful logic between components

```jsx
// Instead of duplicating this in every component:
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const fetchData = async () => { ... };

// Create a hook:
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // ... fetch logic
  return { data, isLoading, error };
}

// Use anywhere:
const { data, isLoading } = useFetch('/api/scenes');
```

### 4. Services for API Calls
**Why:** Centralize API logic, easy to change endpoints

```jsx
// services/sceneApi.jsx
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://nexus-geom-lab-backend-sn7k.onrender.com' 
  : '';

export const saveScene = async (sceneData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/scenes`, { ... });
  return response.json();
};
```

---

## 🔗 Component Communication Patterns

### Parent → Child: Props
```jsx
<SceneCard scene={scene} onDelete={handleDelete} />
```

### Child → Parent: Callback Props
```jsx
// Parent
function Parent() {
  const handleSave = (data) => console.log(data);
  return <Child onSave={handleSave} />;
}

// Child
function Child({ onSave }) {
  return <button onClick={() => onSave({ name: 'test' })}>Save</button>;
}
```

### Siblings: Lift State Up
```jsx
// Parent holds shared state
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <List onSelect={setSelected} />
      <Details selected={selected} />
    </>
  );
}
```

### Any → Any: Context
```jsx
// Any component can access auth state
function AnyComponent() {
  const { user, login, logout } = useAuth();
}
```

---

## 🎓 Interview Talking Points

1. **"I used Context API for global state"** - Auth and scene state needed everywhere

2. **"Feature-based folder structure"** - Scales better than type-based (all components together)

3. **"Separation of concerns"** - UI (components), logic (hooks), data (services), state (context)

4. **"Single source of truth"** - Scene config lives in one place (context), not duplicated

5. **"Unidirectional data flow"** - Data flows down, events flow up, predictable state changes
