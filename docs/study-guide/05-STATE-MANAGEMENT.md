# 05 - State Management

> How state is organized and shared across components

## 🗂️ Types of State

### 1. Local State (Component State)
State that only one component needs.

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // Only this component cares
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 2. Lifted State (Shared Between Siblings)
State that siblings need to share - lifted to parent.

```jsx
function Parent() {
  const [selected, setSelected] = useState(null);  // Lifted state
  
  return (
    <>
      <List items={items} onSelect={setSelected} />
      <Details item={selected} />
    </>
  );
}
```

### 3. Global State (App-Wide)
State that many components across the app need.

```jsx
// Using Context
<AuthProvider>  {/* user state available everywhere */}
  <App />
</AuthProvider>
```

---

## 🎯 State in This App

### Local State Examples

```jsx
// LoginPage.jsx - Form state only needed here
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
const [isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
```

```jsx
// Controls.jsx - UI state only needed here
const [expandedSection, setExpandedSection] = useState('geometry');
const [showAdvanced, setShowAdvanced] = useState(false);
```

### Lifted State Examples

```jsx
// ThreeScene.jsx lifts scene config to share with Controls
function ThreeScene() {
  const [metalness, setMetalness] = useState(0.5);
  const [roughness, setRoughness] = useState(0.3);
  
  return (
    <>
      <Canvas3D metalness={metalness} roughness={roughness} />
      <Controls 
        metalness={metalness} 
        onMetalnessChange={setMetalness}
        roughness={roughness}
        onRoughnessChange={setRoughness}
      />
    </>
  );
}
```

### Global State (Context)

```jsx
// AuthContext - User state needed everywhere
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Used in NavBar, MyScenesPage, ThreeScene, etc.
```

---

## 🔄 Lifting State Up

### When to Lift State
When two or more components need to reflect the same changing data.

### Before (Broken)
```jsx
// Each has its own count - they don't sync!
function ButtonA() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>A: {count}</button>;
}

function ButtonB() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>B: {count}</button>;
}

function Display() {
  // Can't access count from ButtonA or ButtonB!
  return <div>Total: ???</div>;
}
```

### After (Fixed)
```jsx
function Parent() {
  const [count, setCount] = useState(0);  // Single source of truth
  
  return (
    <>
      <ButtonA count={count} onIncrement={() => setCount(count + 1)} />
      <ButtonB count={count} onIncrement={() => setCount(count + 1)} />
      <Display count={count} />
    </>
  );
}

function ButtonA({ count, onIncrement }) {
  return <button onClick={onIncrement}>A: {count}</button>;
}

function ButtonB({ count, onIncrement }) {
  return <button onClick={onIncrement}>B: {count}</button>;
}

function Display({ count }) {
  return <div>Total: {count}</div>;
}
```

---

## 🌐 Context API Deep Dive

### The Pattern

```jsx
// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook (best practice)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
```

### AuthContext in This App

```jsx
// context/AuthContext.jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await authApi.getCurrentUser(token);
          setUser(userData);
        } catch {
          // Token invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [token]);
  
  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    return response;
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const signup = async (username, email, password) => {
    const response = await authApi.signup(username, email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    return response;
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading,
      login, 
      logout, 
      signup 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Using Auth Throughout the App

```jsx
// NavBar.jsx
function NavBar() {
  const { user, logout } = useAuth();
  
  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

// MyScenesPage.jsx
function MyScenesPage() {
  const { user, token } = useAuth();
  const [scenes, setScenes] = useState([]);
  
  useEffect(() => {
    if (token) {
      sceneApi.getScenes(token).then(setScenes);
    }
  }, [token]);
  
  if (!user) return <Navigate to="/login" />;
  
  return <ScenesList scenes={scenes} />;
}

// ThreeScene.jsx
function ThreeScene() {
  const { token } = useAuth();
  
  const handleSave = async (sceneData) => {
    if (!token) {
      alert('Please login to save');
      return;
    }
    await sceneApi.saveScene(sceneData, token);
  };
}
```

---

## 📊 State Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   AuthProvider                          │ │
│  │     user, token, login(), logout(), signup()           │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│     ┌─────────────────────┼─────────────────────┐           │
│     ▼                     ▼                     ▼            │
│ ┌────────┐          ┌──────────┐         ┌──────────┐       │
│ │ NavBar │          │ HomePage │         │ThreeScene│       │
│ │        │          │          │         │          │       │
│ │ user ◄─┼──────────┼── user ◄─┼─────────┼── token ◄│       │
│ │logout()│          │          │         │          │       │
│ └────────┘          └──────────┘         └──────────┘       │
│                                                ▲             │
│                                    ┌───────────┴───────────┐│
│                                    │    Local State:       ││
│                                    │  metalness, roughness ││
│                                    │  baseColor, geometry  ││
│                                    └───────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 🚫 Common Mistakes

### 1. Unnecessary Global State
```jsx
// ❌ Don't put everything in context
<AppProvider>
  {/* formData only used in LoginPage - shouldn't be global */}
  value={{ user, token, formData, modalOpen, tooltipText }}
</AppProvider>

// ✅ Only global what's needed everywhere
<AuthProvider>
  value={{ user, token, login, logout }}
</AuthProvider>
```

### 2. Mutating State
```jsx
// ❌ Direct mutation
const [items, setItems] = useState([1, 2, 3]);
items.push(4);  // Mutates existing array - no re-render!

// ✅ Create new array
setItems([...items, 4]);
```

### 3. Stale Closures
```jsx
// ❌ Using stale state in async
const [count, setCount] = useState(0);
const handleClick = () => {
  setTimeout(() => {
    setCount(count + 1);  // count is stale!
  }, 1000);
};

// ✅ Use functional update
const handleClick = () => {
  setTimeout(() => {
    setCount(prev => prev + 1);  // Always latest
  }, 1000);
};
```

---

## 🎓 Interview Talking Points

1. **"I use local state for component-specific data"** - Form inputs, UI toggles, loading states

2. **"I lift state when siblings need to share data"** - Parent becomes single source of truth

3. **"Context for truly global state"** - Auth, theme, language - things needed everywhere

4. **"I avoid prop drilling with Context"** - No passing props through intermediate components

5. **"State is immutable in React"** - Always create new objects/arrays, never mutate
