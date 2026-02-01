# 09 - API Integration

> How frontend communicates with backend

## 🌐 The Request-Response Cycle

```
┌─────────────────────┐                    ┌─────────────────────┐
│   FRONTEND (React)  │                    │  BACKEND (Express)  │
│                     │                    │                     │
│  User clicks Save   │                    │                     │
│         │           │                    │                     │
│         ▼           │                    │                     │
│  saveScene()        │───── HTTP POST ───►│  /api/scenes        │
│                     │  Authorization:    │         │           │
│                     │  Bearer eyJ...     │         ▼           │
│                     │  Body: {scene}     │  Verify JWT         │
│                     │                    │         │           │
│                     │                    │         ▼           │
│                     │                    │  Save to MongoDB    │
│                     │                    │         │           │
│  setScenes([...])   │◄─── JSON ─────────│  Return success     │
│         │           │  {success: true}   │                     │
│         ▼           │                    │                     │
│  UI Updates         │                    │                     │
└─────────────────────┘                    └─────────────────────┘
```

---

## 📡 Fetch API Basics

### Simple GET Request
```javascript
const response = await fetch('https://api.example.com/data');
const data = await response.json();
```

### POST with Body
```javascript
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'test' }),
});
```

### With Authorization
```javascript
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

---

## 🗄️ API Service Pattern

### Why Use a Service Layer?

```jsx
// ❌ BAD: API logic scattered in components
function MyScenesPage() {
  const fetchScenes = async () => {
    const response = await fetch('https://api.example.com/api/scenes', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    // ... error handling
    // ... response parsing
  };
}

// ✅ GOOD: Centralized API service
function MyScenesPage() {
  const fetchScenes = async () => {
    const scenes = await sceneApi.getScenes(token);
    // Service handles all the details
  };
}
```

### Benefits:
- Single place to change API URL
- Consistent error handling
- Reusable across components
- Easier testing

---

## 📁 API Services in This App

### sceneApi.jsx

```javascript
// services/sceneApi.jsx

// Base URL - different for dev vs production
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://nexus-geom-lab-backend-sn7k.onrender.com' 
  : '';  // Empty string = use Vite proxy in dev

/**
 * Save a new scene
 */
export const saveScene = async (sceneData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scenes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(sceneData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save scene');
    }
    
    return response.json();
  } catch (error) {
    console.error('saveScene error:', error);
    throw error;
  }
};

/**
 * Get all scenes for current user
 */
export const getScenes = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scenes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch scenes');
    }
    
    const data = await response.json();
    return data.scenes;
  } catch (error) {
    console.error('getScenes error:', error);
    throw error;
  }
};

/**
 * Get a single scene by ID
 */
export const getScene = async (sceneId, token) => {
  const response = await fetch(`${API_BASE_URL}/api/scenes/${sceneId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Scene not found');
  }
  
  return response.json();
};

/**
 * Update an existing scene
 */
export const updateScene = async (sceneId, sceneData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/scenes/${sceneId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(sceneData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update scene');
  }
  
  return response.json();
};

/**
 * Delete a scene
 */
export const deleteScene = async (sceneId, token) => {
  const response = await fetch(`${API_BASE_URL}/api/scenes/${sceneId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete scene');
  }
  
  return response.json();
};
```

---

## 🔄 Using API in Components

### Fetching Data on Mount

```jsx
function MyScenesPage() {
  const { token } = useAuth();
  const [scenes, setScenes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await sceneApi.getScenes(token);
        setScenes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    }
  }, [token]);
  
  // Render based on state...
}
```

### Handling User Actions

```jsx
function SceneCard({ scene, onDelete }) {
  const { token } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!confirm('Delete this scene?')) return;
    
    try {
      setIsDeleting(true);
      await sceneApi.deleteScene(scene._id, token);
      onDelete(scene._id);  // Update parent state
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="scene-card">
      <h3>{scene.name}</h3>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
```

### Saving with Feedback

```jsx
function SaveButton({ sceneData }) {
  const { token } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveStatus(null);
      
      await sceneApi.saveScene(sceneData, token);
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div>
      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Scene'}
      </button>
      {saveStatus === 'success' && <span>✓ Saved!</span>}
      {saveStatus === 'error' && <span>✗ Failed to save</span>}
    </div>
  );
}
```

---

## 🔧 Development vs Production

### Vite Proxy (Development)

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Local backend
        changeOrigin: true,
      },
    },
  },
});
```

In development:
- Frontend: `http://localhost:5173`
- API calls to `/api/scenes` → proxied to `http://localhost:3000/api/scenes`
- No CORS issues!

### Production URLs

```javascript
// In production, API_BASE_URL points to Render
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://nexus-geom-lab-backend-sn7k.onrender.com' 
  : '';  // Empty = use proxy
```

---

## ❌ Error Handling Strategies

### 1. HTTP Status Codes

```javascript
if (!response.ok) {
  // Check specific status codes
  switch (response.status) {
    case 400:
      throw new Error('Invalid data');
    case 401:
      throw new Error('Please login again');
    case 403:
      throw new Error('You don\'t have permission');
    case 404:
      throw new Error('Not found');
    case 500:
      throw new Error('Server error, try again later');
    default:
      throw new Error('Something went wrong');
  }
}
```

### 2. Network Errors

```javascript
try {
  const response = await fetch(url);
} catch (error) {
  if (error.name === 'TypeError') {
    // Network error (no internet, server down)
    throw new Error('Network error. Check your connection.');
  }
  throw error;
}
```

### 3. Timeout Handling

```javascript
const fetchWithTimeout = async (url, options, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};
```

---

## 📊 Request/Response Format

### Scene Data Structure

```javascript
// Saving a scene
const sceneData = {
  name: 'My Cool Scene',
  config: {
    geometryType: 'icosahedron',
    metalness: 0.5,
    roughness: 0.3,
    baseColor: '#ff00ff',
    emissiveColor: '#220022',
    emissiveIntensity: 0.5,
    wireframe: false,
    rotationSpeed: 1.0,
    // ... more settings
  },
};

// Response from save
{
  "success": true,
  "scene": {
    "_id": "abc123",
    "name": "My Cool Scene",
    "config": { ... },
    "userId": "user456",
    "createdAt": "2026-02-01T...",
    "updatedAt": "2026-02-01T..."
  }
}

// Response from getScenes
{
  "success": true,
  "scenes": [
    { "_id": "abc123", "name": "Scene 1", ... },
    { "_id": "def456", "name": "Scene 2", ... }
  ]
}
```

---

## 🔁 Optimistic Updates

Update UI immediately, revert if API fails:

```jsx
const handleDelete = async (sceneId) => {
  // Save current state for rollback
  const previousScenes = scenes;
  
  // Optimistic update - remove immediately
  setScenes(scenes.filter(s => s._id !== sceneId));
  
  try {
    await sceneApi.deleteScene(sceneId, token);
  } catch (error) {
    // Rollback on failure
    setScenes(previousScenes);
    alert('Failed to delete');
  }
};
```

---

## 🎓 Interview Talking Points

1. **"Service layer for API calls"** - Centralized, reusable, easier to maintain

2. **"Vite proxy for development"** - Avoid CORS during development

3. **"Environment-based URLs"** - Different backends for dev/production

4. **"Three states for async"** - loading, success, error for every API call

5. **"Optimistic updates for UX"** - Update UI immediately, rollback on error

6. **"Token in Authorization header"** - Standard Bearer token pattern
