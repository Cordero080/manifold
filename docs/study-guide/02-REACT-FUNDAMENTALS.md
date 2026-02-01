# 02 - React Fundamentals

> How React differs from traditional HTML/JS and why we use it

## 🆚 Traditional HTML vs React

### Traditional HTML/JS Approach
```html
<!-- index.html -->
<div id="counter">0</div>
<button onclick="increment()">Add</button>

<script>
  let count = 0;
  function increment() {
    count++;
    document.getElementById('counter').innerText = count;  // Manual DOM update
  }
</script>
```

**Problems:**
- You manually track state (`let count`)
- You manually update the DOM (`innerText = count`)
- As app grows, tracking what updates what becomes nightmare
- No component reusability

### React Approach
```jsx
function Counter() {
  const [count, setCount] = useState(0);  // React tracks state
  
  return (
    <div>
      <div>{count}</div>  {/* React auto-updates when state changes */}
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
```

**Benefits:**
- React tracks state for you
- React auto-updates DOM when state changes (reconciliation)
- Components are reusable
- Predictable data flow

---

## 🧩 Components: The Building Blocks

### What is a Component?
A function that returns JSX (HTML-like syntax).

```jsx
// Simple component
function Greeting() {
  return <h1>Hello World</h1>;
}

// Component with props (inputs)
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}

// Usage
<Greeting name="Pablo" />  // Renders: <h1>Hello Pablo</h1>
```

### In This App:
```
src/components/
├── layout/
│   └── NavBar/          # Navigation bar component
├── pages/
│   ├── HomePage/        # Full page components
│   ├── MyScenesPage/
│   └── Showcase/
└── ui/
    ├── BeamScanButton/  # Reusable button
    ├── Modals/          # Popup dialogs
    └── Effects/         # Visual effects (cursor, backgrounds)
```

---

## 📦 Props: Passing Data Down

Props are how parent components send data to children.

```jsx
// Parent
function App() {
  const username = "pablo";
  return <NavBar username={username} />;
}

// Child receives props
function NavBar({ username }) {
  return <nav>Welcome, {username}</nav>;
}
```

### Props are Read-Only
```jsx
function BadComponent({ count }) {
  count = 5;  // ❌ WRONG - never mutate props
}

function GoodComponent({ count }) {
  // ✅ Use props as read-only
  return <div>{count}</div>;
}
```

---

## 🔄 State: Data That Changes

State is data that can change over time. When state changes, React re-renders.

```jsx
function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

### In This App - Scene Controls:
```jsx
// From ThreeScene.jsx
const [metalness, setMetalness] = useState(0.5);
const [roughness, setRoughness] = useState(0.3);
const [baseColor, setBaseColor] = useState('#ff00ff');

// When user moves slider:
<input 
  type="range" 
  value={metalness} 
  onChange={(e) => setMetalness(e.target.value)} 
/>
// This triggers re-render, which updates the 3D object
```

---

## 🎭 JSX: HTML in JavaScript

JSX looks like HTML but it's JavaScript.

### Key Differences:

| HTML | JSX |
|------|-----|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `onclick="..."` | `onClick={...}` |
| `style="color: red"` | `style={{ color: 'red' }}` |

### JavaScript Expressions in JSX
```jsx
function Profile({ user }) {
  return (
    <div>
      {/* Variables */}
      <h1>{user.name}</h1>
      
      {/* Expressions */}
      <p>{user.age * 2}</p>
      
      {/* Conditionals */}
      {user.isAdmin && <span>Admin</span>}
      
      {/* Ternary */}
      {user.isLoggedIn ? <LogoutBtn /> : <LoginBtn />}
      
      {/* Mapping arrays */}
      {user.skills.map(skill => (
        <li key={skill}>{skill}</li>
      ))}
    </div>
  );
}
```

---

## 🔁 Re-rendering: How React Updates

### The Render Cycle:
1. State changes (via `setState`)
2. React calls your component function again
3. React compares new JSX to old JSX (diffing)
4. React updates only what changed in DOM (reconciliation)

```jsx
function Example() {
  const [count, setCount] = useState(0);
  
  console.log('Component rendered!');  // Logs every time state changes
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### Why This Matters:
- Expensive operations in render = slow app
- That's why we use `useMemo`, `useCallback`, `React.memo`
- That's why we put side effects in `useEffect`, not in render

---

## 📁 File Structure Patterns

### Feature-Based (What This App Uses):
```
src/
├── features/
│   ├── auth/           # Everything related to authentication
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── sceneControls/  # Everything related to 3D scene
│       ├── components/
│       ├── hooks/
│       └── utils/
├── components/
│   ├── layout/         # App-wide layout (NavBar)
│   ├── pages/          # Page-level components
│   └── ui/             # Reusable UI components
└── hooks/              # Shared custom hooks
```

### Why Feature-Based?
- Related code stays together
- Easy to find things
- Features can be developed independently
- Scales well as app grows

---

## 🎯 Interview Talking Points

1. **"React uses a virtual DOM"** - React keeps a JS representation of the DOM, diffs it, and updates only what changed

2. **"Components are reusable"** - Write once, use many times with different props

3. **"One-way data flow"** - Data flows down through props, events flow up through callbacks

4. **"Declarative vs Imperative"** - You describe WHAT you want, React figures out HOW to update the DOM

5. **"JSX compiles to JavaScript"** - `<div>` becomes `React.createElement('div')`
