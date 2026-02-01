# 08 - Authentication Flow

> How user authentication works from login to protected routes

## 🔐 Authentication Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. User submits login form                                   │
│         │                                                     │
│         ▼                                                     │
│  2. Frontend sends POST /api/auth/login                       │
│         │                                                     │
│         ▼                                                     │
│  3. Backend verifies credentials against MongoDB              │
│         │                                                     │
│         ▼                                                     │
│  4. Backend creates JWT token                                 │
│         │                                                     │
│         ▼                                                     │
│  5. Frontend receives { token, user }                         │
│         │                                                     │
│         ▼                                                     │
│  6. Frontend stores token in localStorage                     │
│         │                                                     │
│         ▼                                                     │
│  7. AuthContext updates with user data                        │
│         │                                                     │
│         ▼                                                     │
│  8. Protected routes become accessible                        │
│         │                                                     │
│         ▼                                                     │
│  9. Future API calls include token in Authorization header    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎫 JWT (JSON Web Token) Explained

### What is a JWT?
A signed token that proves identity. Three parts separated by dots:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
│                                      │                                              │
└──────── HEADER ──────────────────────┴──────── PAYLOAD ─────────────────────────────┴── SIGNATURE ──┘
```

- **Header**: Algorithm used (HS256) and token type (JWT)
- **Payload**: Data (userId, expiration, etc.) - NOT encrypted, just encoded
- **Signature**: Hash of header + payload + secret key

### Why JWT?
- **Stateless**: Server doesn't need to store session
- **Self-contained**: Contains user info
- **Secure**: Can't be tampered with (signature verification)

---

## 🖥️ Frontend Implementation

### AuthContext (State Management)

```jsx
// features/auth/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import * as authApi from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  
  // Check existing token on app load
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Verify token is still valid
          const userData = await authApi.getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          // Token expired or invalid
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    
    verifyToken();
  }, []);
  
  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    
    // Store token
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
    
    return response;
  };
  
  const signup = async (username, email, password) => {
    const response = await authApi.signup(username, email, password);
    
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
    
    return response;
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };
  
  // Don't render children until we've checked auth
  if (isLoading) {
    return <FullPageSpinner />;
  }
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading,
      login, 
      logout, 
      signup,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### API Service

```jsx
// features/auth/services/authApi.js
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://nexus-geom-lab-backend-sn7k.onrender.com' 
  : '';

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
};

export const signup = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }
  
  return response.json();
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Token invalid');
  }
  
  return response.json();
};
```

### Login Page

```jsx
// features/auth/pages/LoginPage/LoginPage.jsx
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');  // Clear error on input
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/my-scenes');  // Redirect on success
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## 🔒 Protected Routes

```jsx
// components/ProtectedRoute.jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <FullPageSpinner />;
  }
  
  if (!isAuthenticated) {
    // Redirect to login, save intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

// Usage in App.jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUpPage />} />
  
  {/* Protected routes */}
  <Route 
    path="/my-scenes" 
    element={
      <ProtectedRoute>
        <MyScenesPage />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/lab" 
    element={
      <ProtectedRoute>
        <ThreeScene />
      </ProtectedRoute>
    } 
  />
</Routes>
```

---

## 🖥️ Backend Implementation

### Auth Routes

```javascript
// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    
    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me (verify token)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

### Auth Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add userId to request
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

---

## 🔑 Using Token for API Calls

```jsx
// services/sceneApi.jsx
export const saveScene = async (sceneData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/scenes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Include token!
    },
    body: JSON.stringify(sceneData),
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Please login again');
    }
    throw new Error('Failed to save scene');
  }
  
  return response.json();
};

// Usage in component
function SaveButton() {
  const { token } = useAuth();
  
  const handleSave = async () => {
    try {
      await saveScene(sceneData, token);
      showToast('Saved!');
    } catch (error) {
      if (error.message === 'Please login again') {
        navigate('/login');
      }
    }
  };
}
```

---

## 🛡️ Security Considerations

### 1. Token Storage
```jsx
// localStorage is convenient but vulnerable to XSS
localStorage.setItem('token', token);

// For higher security, use httpOnly cookies (requires backend support)
// But localStorage is acceptable for most apps
```

### 2. Password Hashing
```javascript
// NEVER store plain passwords
const hashedPassword = await bcrypt.hash(password, 10);

// Compare securely
const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
```

### 3. Token Expiration
```javascript
// Set reasonable expiration
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }  // 7 days
);
```

### 4. HTTPS Only
- Production should always use HTTPS
- Vercel and Render provide this automatically

---

## 🎓 Interview Talking Points

1. **"JWT is stateless"** - Server doesn't store sessions, just verifies signature

2. **"bcrypt for password hashing"** - One-way hash with salt, can't be reversed

3. **"Token in Authorization header"** - `Bearer <token>` pattern is standard

4. **"Protected routes redirect to login"** - Check auth state before rendering

5. **"localStorage for token storage"** - Persists across sessions, cleared on logout

6. **"Context for global auth state"** - Any component can check if user is logged in
