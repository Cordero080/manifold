# 06 - Loading & Error Handling

> How to handle async operations, loading states, and errors gracefully

## 🔄 The Async Challenge

In traditional HTML/JS:
```html
<script>
  // Page waits for everything to load
  const data = fetchSync('/api/data');  // Blocks everything
  document.getElementById('app').innerHTML = data;
</script>
```

In React (async):
```jsx
function App() {
  // Component renders BEFORE data arrives
  // You need to handle: loading, success, error states
}
```

---

## 📊 The Three States Pattern

Every async operation has three states:

```jsx
function DataComponent() {
  const [data, setData] = useState(null);      // SUCCESS state
  const [isLoading, setIsLoading] = useState(true);  // LOADING state
  const [error, setError] = useState(null);     // ERROR state
  
  useEffect(() => {
    fetchData()
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);
  
  // Render based on current state
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}
```

---

## 🎯 Loading Patterns in This App

### 1. Page-Level Loading (MyScenesPage)

```jsx
// MyScenesPage.jsx
function MyScenesPage() {
  const { token } = useAuth();
  const [scenes, setScenes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchScenes = async () => {
      try {
        setIsLoading(true);
        setError(null);  // Clear previous errors
        const data = await sceneApi.getScenes(token);
        setScenes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);  // Always runs
      }
    };
    
    if (token) {
      fetchScenes();
    }
  }, [token]);
  
  // Conditional rendering based on state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading your scenes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }
  
  if (scenes.length === 0) {
    return <EmptyState message="No scenes yet. Create your first!" />;
  }
  
  return <SceneGrid scenes={scenes} />;
}
```

### 2. Button Loading State

```jsx
// LoginPage.jsx
function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Show loading
    
    try {
      await login(email, password);
      navigate('/my-scenes');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);  // Hide loading
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* ... inputs ... */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner size="small" />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}
```

### 3. Auth Loading (Initial App Load)

```jsx
// AuthContext.jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Start loading
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authApi.getCurrentUser(token);
          setUser(userData);
        } catch {
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);  // Done checking
    };
    
    checkAuth();
  }, []);
  
  // Don't render app until we know auth state
  if (isLoading) {
    return <FullPageSpinner />;
  }
  
  return (
    <AuthContext.Provider value={{ user, isLoading, ... }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## ❌ Error Handling Patterns

### 1. Try-Catch in Async Functions

```jsx
const handleSave = async () => {
  try {
    await sceneApi.saveScene(sceneData, token);
    showToast('Saved successfully!');
  } catch (error) {
    // Handle specific error types
    if (error.status === 401) {
      logout();
      navigate('/login');
    } else if (error.status === 400) {
      setError('Invalid scene data');
    } else {
      setError('Something went wrong. Please try again.');
    }
  }
};
```

### 2. Error Boundaries (Catch React Errors)

Error boundaries catch JavaScript errors in child components.

```jsx
// ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Send to error tracking service
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage in App.jsx
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* ... */}
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}
```

### 3. API Error Handling

```jsx
// services/authApi.js
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    // Check if response is OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // Network error or JSON parse error
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;  // Re-throw API errors
  }
};
```

---

## ⏳ React Suspense (Modern Approach)

React Suspense lets you "suspend" rendering while waiting for something.

```jsx
// With lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### In This App (Route-Level Code Splitting)

```jsx
// App.jsx
const ThreeScene = lazy(() => import('./features/sceneControls/ThreeScene'));
const MyScenesPage = lazy(() => import('./components/pages/MyScenesPage'));
const ShowcaseGallery = lazy(() => import('./components/pages/Showcase'));

function App() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Not lazy - landing page */}
        <Route path="/lab" element={<ThreeScene />} />  {/* Lazy loaded */}
        <Route path="/my-scenes" element={<MyScenesPage />} />
        <Route path="/showcase" element={<ShowcaseGallery />} />
      </Routes>
    </Suspense>
  );
}
```

**Why lazy load?**
- 3D scene (ThreeScene) is huge - don't load it on homepage
- Faster initial page load
- User only downloads what they need

---

## 🎨 Loading UI Components

### Spinner Component
```jsx
function Spinner({ size = 'medium' }) {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }[size];
  
  return (
    <div className={`spinner ${sizeClass}`}>
      <div className="spinner-ring" />
    </div>
  );
}
```

### Skeleton Loading
```jsx
function SceneCardSkeleton() {
  return (
    <div className="scene-card skeleton">
      <div className="skeleton-image" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
}

function MyScenesPage() {
  if (isLoading) {
    return (
      <div className="scene-grid">
        {[1, 2, 3, 4].map(i => <SceneCardSkeleton key={i} />)}
      </div>
    );
  }
  // ...
}
```

### Progress Indicator
```jsx
function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

---

## 🔁 Retry Pattern

```jsx
function useRetry(asyncFn, maxRetries = 3) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const execute = async () => {
    try {
      const result = await asyncFn();
      setData(result);
      setError(null);
    } catch (err) {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setTimeout(execute, 1000 * (retryCount + 1));  // Exponential backoff
      } else {
        setError(err);
      }
    }
  };
  
  return { data, error, retry: execute };
}
```

---

## 🎓 Interview Talking Points

1. **"I use the three states pattern"** - loading, success, error for every async operation

2. **"Error boundaries for unexpected errors"** - Catch and display gracefully, don't crash the app

3. **"Optimistic updates for better UX"** - Update UI immediately, rollback if API fails

4. **"Code splitting with lazy/Suspense"** - Faster initial load, only download what's needed

5. **"Graceful degradation"** - App should still work if non-critical features fail

6. **"finally for cleanup"** - Always set loading to false, even if error occurs
