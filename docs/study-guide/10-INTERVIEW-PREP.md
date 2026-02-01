# 10 - Interview Prep

> Common questions and how this app demonstrates your skills

## 🎯 How to Talk About This Project

### The Elevator Pitch
> "I built a 3D geometry visualization lab using React and Three.js. Users can create and customize 3D shapes with real-time controls for materials, colors, and animations. They can save their scenes to a database and load them later. The app has JWT authentication, is deployed on Vercel (frontend) and Render (backend), with MongoDB Atlas for data storage."

### Key Technical Highlights
1. **React hooks** for state management and side effects
2. **Context API** for global authentication state
3. **Three.js integration** with React lifecycle
4. **REST API** design with Express.js
5. **JWT authentication** flow
6. **Code splitting** with lazy loading
7. **Error boundaries** for graceful error handling
8. **Responsive design** with CSS modules

---

## 💬 Common Interview Questions

### React Questions

**Q: What are hooks and why do we use them?**
> Hooks let us use state and lifecycle features in function components. Before hooks, we needed class components. I use `useState` for local state, `useEffect` for side effects like API calls, and `useContext` for global state like authentication.

**Q: Explain the useEffect hook.**
> `useEffect` runs side effects after render. It takes a function and a dependency array. With empty deps `[]`, it runs once on mount. With deps `[x]`, it runs when `x` changes. It can return a cleanup function for things like event listeners.
>
> In my app, I use it for:
> - Fetching data when a page loads
> - Setting up Three.js animation loops
> - Adding/removing scroll event listeners

**Q: What's the difference between state and props?**
> Props are passed from parent to child and are read-only. State is managed within a component and can change. When state changes, the component re-renders.
>
> In my app, scene settings like `metalness` are state (changeable), while the `onSave` callback passed to a button is a prop.

**Q: How do you handle component communication?**
> - **Parent to child**: Props
> - **Child to parent**: Callback props
> - **Siblings**: Lift state to common parent
> - **Distant components**: Context API
>
> My app uses Context for auth state because NavBar, MyScenesPage, and ThreeScene all need user info.

**Q: What is the Context API?**
> Context provides a way to pass data through the component tree without prop drilling. I create a context with `createContext`, provide a value at a high level, and consume it with `useContext`.
>
> My `AuthContext` holds user, token, login, logout functions accessible anywhere in the app.

---

### State Management Questions

**Q: When would you use Context vs Redux?**
> Context is built-in and great for simple global state like auth, theme, or language. Redux is better for complex state with many actions, when you need middleware, or time-travel debugging.
>
> For my app, Context is sufficient - I only have auth state and scene configuration.

**Q: How do you avoid unnecessary re-renders?**
> - `React.memo` to memoize components
> - `useMemo` for expensive calculations
> - `useCallback` for callback functions
> - Keep state as local as possible
> - Split contexts to avoid re-rendering unrelated components

**Q: Explain immutable state updates.**
> React requires new object references to detect changes. Never mutate state directly.
> ```javascript
> // Wrong
> state.items.push(newItem);
> 
> // Right
> setState([...state.items, newItem]);
> ```

---

### Async/Loading Questions

**Q: How do you handle loading states?**
> I use the three states pattern: `isLoading`, `data`, `error`. While loading, show a spinner. On success, show data. On error, show error message with retry option.
>
> ```javascript
> if (isLoading) return <Spinner />;
> if (error) return <ErrorMessage />;
> return <DataDisplay data={data} />;
> ```

**Q: How do you handle errors in async code?**
> Try-catch in async functions. For React component errors, Error Boundaries. I also check HTTP status codes for specific error handling (401 = redirect to login, 400 = show validation error).

**Q: What is code splitting?**
> Loading JavaScript only when needed using dynamic `import()`. React's `lazy()` and `Suspense` make this easy.
>
> My ThreeScene component is large (includes Three.js), so I lazy load it - users on the homepage don't download 3D code until they enter the lab.

---

### Authentication Questions

**Q: Explain your authentication flow.**
> 1. User submits login form
> 2. Frontend calls POST /api/auth/login
> 3. Backend verifies password with bcrypt
> 4. Backend creates JWT with user ID
> 5. Frontend stores token in localStorage
> 6. Subsequent API calls include token in Authorization header
> 7. Backend middleware verifies token on protected routes

**Q: How do you protect routes?**
> A `ProtectedRoute` component checks if user is authenticated via Context. If not, redirect to login with the intended destination saved in location state.

**Q: Why JWT over sessions?**
> JWT is stateless - server doesn't store session data. Better for horizontal scaling. The token itself contains the user info (signed, not encrypted).

---

### Performance Questions

**Q: How did you optimize performance?**
> - **Code splitting**: Lazy load heavy components
> - **Proper cleanup**: Dispose Three.js resources, remove event listeners
> - **useRef for Three.js**: Avoid re-creating objects on re-render
> - **Memoization**: `useMemo` for expensive calculations
> - **Virtualization**: Would use for long lists (not needed in my current scene count)

**Q: How do you handle memory leaks?**
> Always return cleanup functions from useEffect:
> ```javascript
> useEffect(() => {
>   const handleScroll = () => {};
>   window.addEventListener('scroll', handleScroll);
>   return () => window.removeEventListener('scroll', handleScroll);
> }, []);
> ```
> For Three.js, dispose geometries, materials, and textures.

---

### Architecture Questions

**Q: How did you structure your React app?**
> Feature-based folder structure:
> - `features/auth` - all authentication code
> - `features/sceneControls` - 3D scene logic
> - `components` - reusable UI components
> - `services` - API communication
> - `hooks` - custom hooks
> - `context` - global state
>
> Related code stays together, making it easy to find and modify.

**Q: How does frontend communicate with backend?**
> Fetch API with async/await. Centralized in service files (`sceneApi.js`, `authApi.js`). 
> - Development: Vite proxy forwards `/api` to localhost:3000
> - Production: Direct calls to Render backend URL

---

### Deployment Questions

**Q: How did you deploy this app?**
> - **Frontend (Vercel)**: Connects to GitHub, auto-deploys on push
> - **Backend (Render)**: Also connects to GitHub from monorepo's backend folder
> - **Database (MongoDB Atlas)**: Cloud-hosted MongoDB
>
> Environment variables configured in each platform's dashboard.

**Q: What challenges did you face in deployment?**
> - **CORS**: Backend needed to allow Vercel domain
> - **Base paths**: Different for GitHub Pages vs Vercel
> - **Environment detection**: Used `process.env.VERCEL` to detect deployment target

---

## 🎤 Behavioral Questions + Technical Examples

**Q: Tell me about a challenging bug you fixed.**
> When navigating away from the 3D scene, the app crashed. The QuantumCursor effect was trying to access disposed Three.js objects. I fixed it by:
> 1. Checking if objects exist before accessing
> 2. Proper cleanup in useEffect return function
> 3. Using refs to track disposal state

**Q: How do you approach learning new technologies?**
> I built this app over 8 months, learning React, Three.js, Express, MongoDB, and deployment. I:
> 1. Built small features incrementally
> 2. Used AI assistance for guidance
> 3. Documented what I learned (this study guide!)
> 4. Fixed bugs as I encountered them

**Q: Describe a feature you're proud of.**
> The real-time 3D controls. React state (`metalness`, `color`) syncs with Three.js materials. User moves a slider → state updates → useEffect updates Three.js material → 3D object changes instantly. The challenge was bridging React's declarative model with Three.js's imperative API.

---

## 📝 Questions to Ask Interviewers

1. "What state management approach does your team use?"
2. "How do you handle code reviews for React components?"
3. "What's your testing strategy for frontend code?"
4. "How do you approach performance optimization?"
5. "What does your deployment pipeline look like?"

---

## 🎯 Key Concepts to Review

- [ ] React component lifecycle
- [ ] useState vs useReducer
- [ ] useEffect dependency array
- [ ] Context vs prop drilling
- [ ] Error boundaries
- [ ] React.memo, useMemo, useCallback
- [ ] Controlled vs uncontrolled components
- [ ] JWT authentication flow
- [ ] REST API design
- [ ] CORS and why it exists
- [ ] Git branching strategies
- [ ] CI/CD basics

---

## 💡 Final Tips

1. **Be specific**: Don't just say "I used React" - explain HOW you used it
2. **Show problem-solving**: Talk about bugs you fixed, not just features you built
3. **Know the why**: Why hooks over classes? Why Context over Redux?
4. **Admit what you don't know**: "I haven't used that, but I'd approach it by..."
5. **Reference your app**: "In my project, I handled this by..."
