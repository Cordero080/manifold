# 04 - Hooks Deep Dive

> Understanding useState, useEffect, useRef, useContext, and custom hooks

## 🎣 What Are Hooks?

Hooks are functions that let you "hook into" React features (state, lifecycle, context) from function components.

**Rules of Hooks:**
1. Only call at the top level (not inside loops, conditions, or nested functions)
2. Only call from React functions (components or custom hooks)

---

## 📦 useState: Managing State

### Basic Usage
```jsx
const [value, setValue] = useState(initialValue);
```

### Examples from This App:

```jsx
// Simple state
const [isLoading, setIsLoading] = useState(false);

// Object state
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

// Array state
const [scenes, setScenes] = useState([]);

// Function for initial value (runs once)
const [config, setConfig] = useState(() => {
  // Expensive calculation only runs on first render
  return computeInitialConfig();
});
```

### Updating State Correctly

```jsx
// ❌ WRONG: Mutating state directly
const [user, setUser] = useState({ name: 'Pablo' });
user.name = 'John';  // This won't trigger re-render!

// ✅ CORRECT: Create new object
setUser({ ...user, name: 'John' });

// ❌ WRONG: Using stale state in rapid updates
setCount(count + 1);
setCount(count + 1);  // Both use same old 'count' value!

// ✅ CORRECT: Use functional update
setCount(prev => prev + 1);
setCount(prev => prev + 1);  // Each uses latest value
```

### In This App - Scene Controls:
```jsx
// ThreeScene.jsx
const [metalness, setMetalness] = useState(0.5);
const [roughness, setRoughness] = useState(0.3);
const [baseColor, setBaseColor] = useState('#ff00ff');
const [geometryType, setGeometryType] = useState('icosahedron');

// When slider changes:
<input 
  type="range" 
  min="0" 
  max="1" 
  step="0.01"
  value={metalness}
  onChange={(e) => setMetalness(parseFloat(e.target.value))}
/>
```

---

## ⚡ useEffect: Side Effects

### What Are Side Effects?
Anything that reaches "outside" the component:
- Fetching data from API
- Setting up subscriptions/event listeners
- Manually changing the DOM
- Timers (setTimeout, setInterval)

### Basic Pattern
```jsx
useEffect(() => {
  // This runs AFTER render
  
  return () => {
    // This runs on CLEANUP (before next effect or unmount)
  };
}, [dependencies]);  // Only re-run if these change
```

### Dependency Array Explained

```jsx
// Runs after EVERY render
useEffect(() => {
  console.log('Rendered!');
});

// Runs ONCE after first render (like componentDidMount)
useEffect(() => {
  console.log('Mounted!');
}, []);

// Runs when 'userId' changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Runs when 'a' OR 'b' changes
useEffect(() => {
  console.log(a + b);
}, [a, b]);
```

### Examples from This App:

#### 1. Fetching Data on Mount
```jsx
// MyScenesPage.jsx
useEffect(() => {
  const fetchScenes = async () => {
    setIsLoading(true);
    try {
      const data = await getScenes(token);
      setScenes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchScenes();
}, [token]);  // Re-fetch if token changes
```

#### 2. Event Listeners with Cleanup
```jsx
// QuantumCursor.jsx
useEffect(() => {
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // CLEANUP: Remove listener when component unmounts
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);  // Empty = only setup once
```

#### 3. Scroll Effects
```jsx
// HomePage.jsx
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavScrolled(true);
    } else {
      setNavScrolled(false);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### 4. Animation Loop
```jsx
// ThreeScene.jsx
useEffect(() => {
  let animationId;
  
  const animate = () => {
    // Update 3D scene
    mesh.rotation.x += 0.01;
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  // CLEANUP: Stop animation when unmounting
  return () => {
    cancelAnimationFrame(animationId);
  };
}, []);
```

### Common Mistakes

```jsx
// ❌ WRONG: Missing dependency
const [count, setCount] = useState(0);
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);  // Always uses initial count (0)
  }, 1000);
  return () => clearInterval(id);
}, []);  // count is missing from deps!

// ✅ CORRECT: Use functional update
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);  // Always uses latest value
  }, 1000);
  return () => clearInterval(id);
}, []);  // No external dependencies needed

// ❌ WRONG: Infinite loop
useEffect(() => {
  setData(fetchData());  // This changes data
}, [data]);  // Which triggers effect again... forever!

// ✅ CORRECT: Fetch once or on specific trigger
useEffect(() => {
  setData(fetchData());
}, []);  // Only on mount
```

---

## 🎯 useRef: Persistent Values & DOM Access

### Two Main Uses:

#### 1. Access DOM Elements
```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  
  const handlePlay = () => {
    videoRef.current.play();  // Direct DOM access
  };
  
  return <video ref={videoRef} src="..." />;
}
```

#### 2. Store Values That Don't Trigger Re-renders
```jsx
function Timer() {
  const intervalRef = useRef(null);
  const countRef = useRef(0);  // Doesn't cause re-render when changed
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      console.log(countRef.current);  // Updates but no re-render
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
  };
  
  return <button onClick={start}>Start</button>;
}
```

### In This App:
```jsx
// ThreeScene.jsx - Store Three.js objects
const sceneRef = useRef(null);
const cameraRef = useRef(null);
const rendererRef = useRef(null);
const meshRef = useRef(null);

useEffect(() => {
  // Initialize Three.js
  sceneRef.current = new THREE.Scene();
  cameraRef.current = new THREE.PerspectiveCamera(...);
  
  // These persist across re-renders without causing re-renders
}, []);
```

---

## 🌐 useContext: Global State Access

### The Problem: Prop Drilling
```jsx
// Passing user through EVERY level 😫
<App user={user}>
  <Layout user={user}>
    <Header user={user}>
      <NavBar user={user}>
        <UserMenu user={user} />  {/* Finally used! */}
      </NavBar>
    </Header>
  </Layout>
</App>
```

### The Solution: Context
```jsx
// 1. Create context
const AuthContext = createContext(null);

// 2. Provide value at top level
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Consume anywhere with useContext
function UserMenu() {
  const { user } = useContext(AuthContext);
  return <span>{user.name}</span>;
}

// Or create a custom hook (cleaner):
function useAuth() {
  return useContext(AuthContext);
}

function UserMenu() {
  const { user } = useAuth();
  return <span>{user.name}</span>;
}
```

### In This App:
```jsx
// AuthContext.jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Any component:
function NavBar() {
  const { user, logout } = useAuth();
  return user ? <button onClick={logout}>Logout</button> : <LoginLink />;
}
```

---

## 🔧 Custom Hooks: Reusable Logic

### Pattern: Extract Repeated Logic

```jsx
// Before: Duplicated in every component that fetches data
function ComponentA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/a')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  // ... render
}

// After: Custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Use anywhere:
function ComponentA() {
  const { data, loading, error } = useFetch('/api/a');
}

function ComponentB() {
  const { data, loading, error } = useFetch('/api/b');
}
```

### Custom Hooks in This App:

#### useParallax - Mouse Parallax Effect
```jsx
// hooks/useParallax.js
export function useParallax(intensity = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      setOffset({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);
  
  return offset;
}

// Usage:
function Background() {
  const { x, y } = useParallax(20);
  return <div style={{ transform: `translate(${x}px, ${y}px)` }} />;
}
```

#### useSceneState - Scene Configuration
```jsx
// hooks/useSceneState.js
export function useSceneState(initialConfig) {
  const [config, setConfig] = useState(initialConfig);
  
  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };
  
  const resetConfig = () => {
    setConfig(initialConfig);
  };
  
  return { config, updateConfig, resetConfig };
}
```

---

## 🎓 Interview Questions & Answers

**Q: What's the difference between useEffect with [] and without?**
> With `[]`: Runs once after mount (like componentDidMount)
> Without: Runs after every render

**Q: When do you use useRef vs useState?**
> `useState`: When you need re-renders on change (UI updates)
> `useRef`: When you don't need re-renders (DOM access, storing mutable values)

**Q: What's a memory leak in useEffect?**
> Forgetting to cleanup subscriptions, timers, or event listeners. The cleanup function prevents this.

**Q: Why use custom hooks?**
> Extract and reuse stateful logic between components. Keeps components clean and focused on UI.

**Q: What's the dependency array for?**
> Tells React when to re-run the effect. Only re-runs if any dependency changed since last render.
