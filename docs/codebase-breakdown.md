# Nexus Geom Lab — Codebase Breakdown

Full plain-English explanation of the codebase for interviews and reference.

---

## What the app is and what it does

Nexus Geom Lab is a browser-based 3D geometry playground with accounts, persistence, and a progression system. Users sign up, open a real-time 3D editor, and build scenes — choosing a geometric shape, how many of them appear, what material they have (color, metalness, emissive glow), how they animate, and what the background environment looks like. They can toggle a microphone so the shapes react to live audio in real time. When they like what they've built, they save it to a database. Saving scenes unlocks animated characters in a separate Showcase viewer — like a reward system in a game. Saved scenes can be revisited from a gallery and reloaded back into the editor.

Full stack: React + Vite on the frontend (deployed to Vercel), Express 5 + MongoDB Atlas on the backend (deployed to Render). The frontend proxies `/api` to `localhost:3000` in development so there are no CORS issues locally.

---

## Critical fact: it does NOT use React Three Fiber

React Three Fiber (R3F) is the popular declarative React wrapper for Three.js. This app does not use it. `ThreeScene.jsx` is a plain React component that creates a Three.js scene manually using `useRef` and `useEffect`. The renderer, camera, scene, and all mesh objects are stored in refs and manipulated imperatively.

Why: full control over when things get created and destroyed, no R3F reconciler overhead, and direct control over the animation loop. The tradeoff is more boilerplate — you have to manage cleanup, dependency arrays, and hook ordering yourself.

---

## The most important architectural decision: hook ordering

ThreeScene.jsx receives one large config object (scale, colors, objectCount, objectType, animationStyle, all lighting, etc.) and passes it to custom hooks that must run in a specific order:

1. **useSceneInitialization** — runs once on mount. Creates the Three.js scene, camera, WebGL renderer, attaches the canvas to the DOM. Nothing else can work until this exists.
2. **useObjectManager** — runs when `objectCount`, `objectType`, or shape-specific parameters change. Destroys all old meshes and creates new ones. Does NOT run on color or material changes.
3. **Visual effect hooks** (nebula particles, environment, spectral orbs) — add decorative elements once core objects exist.
4. **Property update hooks** (useMaterialUpdates, useLightingUpdates, useCameraController) — cheaply mutate existing Three.js objects when color/metalness/lighting sliders change.
5. **useAnimationLoop** — starts the requestAnimationFrame loop last, after everything else exists.

Without this ordering, hooks would try to update objects that don't exist yet, or the animation would start before geometry was created.

---

## The core performance decision

The key insight is separating geometry creation from material updates.

**The problem:** Creating 3D geometry is expensive. A complex shape allocates Float32Arrays for hundreds of vertex positions, normals, and UVs, runs through mathematical equations for each vertex, and merges multiple buffers. If this happened every time a user dragged a color slider, you'd drop to single-digit frame rates.

**The solution:** `useObjectManager`'s dependency array only includes `objectType`, `objectCount`, and shape-specific structural parameters. Color, metalness, emissiveIntensity, wireframeIntensity — everything the user tweaks constantly — is deliberately excluded. Those changes go through `useMaterialUpdates` instead, which just calls `material.color.set()` and `material.emissive.set()` — cheap in-place mutations of existing objects.

Geometry is created once per shape selection and reused for its entire lifetime. The animation loop runs against the same geometry 60 times per second with no React re-renders or rebuilds.

**Speed changes use a ref:** object speed is stored in a `useRef`, and the animation loop reads the ref directly every frame. This means speed changes don't trigger the hook to restart — the loop reads live ref values. Restarting the loop causes a brief visual discontinuity; this avoids it entirely.

---

## Every geometry type

The `createGeometry` function dispatches to 30+ specialized modules:

### Standard platonic solids
- **icosahedron** — 20-faced solid, the default shape. `THREE.IcosahedronGeometry`.
- **octahedron** — 8-faced solid. `THREE.OctahedronGeometry`.
- **tetrahedron** — 4-faced triangular pyramid. `THREE.TetrahedronGeometry`.
- **sphere** — basic sphere. `THREE.SphereGeometry`.

### Hypercube/tesseract family (4D objects projected into 3D)
- **box / cpdtesseract** — the main tesseract. A tesseract is a 4D hypercube. In 3D it's represented as an outer cube and inner cube connected by six trapezoidal frustum faces — one for each cube face. Built by combining a `BoxGeometry` outer shell, a smaller inner `BoxGeometry`, and six `CylinderGeometry` objects (different top and bottom radii, so they look like truncated pyramids) rotated into position to bridge each face pair. All merged into one buffer.
- **cpd-megatesseract through cpd-megatesseract-4** — five increasingly elaborate multi-layer tesseract variants.
- **simplecpdhypercube, compoundpolychoron** — further compound variants.

### 4D cell polytopes (hand-built from mathematical vertex data)
- **120cell** — a regular 4D polytope with 120 dodecahedral cells. 3D projection uses icosahedral geometry layers.
- **24cell** — a 4D polytope with 24 octahedral cells.
- **16cell** — the 4D cross-polytope, the dual of the tesseract.
- **600cell** — the most complex; 600 tetrahedral cells.
- Compound versions of each of the above.

### Manifolds
- **quantummanifold** — a twisted toroidal parametric surface built with `ParametricGeometry`.
- **compoundquantummanifold** — multiple combined.
- **mobiussphere** — the most complex geometry in the codebase. Combines: a nested 3-sphere core, a Klein-Möbius hybrid parametric surface with fractal width modulation, a counter-rotating secondary Möbius band, 12 icosahedral vertex anchors, 21 Fibonacci spiral-distributed anchor spheres, 12 Lorenz-attractor-influenced orbital spheres plus 36 micro-orbital particles, 8 trefoil knot elements, 3 multi-layer tori with Hopf fibration rotations, 6 hyperbolic paraboloid saddle points, and 8 golden spiral cylinder threads — all merged into one `BufferGeometry`. The comment in the code calls it "version 4.0-ULTIMATE."

### Hessian polychoron
Creates 5 compounds of 3 nested icosahedra each (15 total shells). Each compound is rotated 72° (360°/5, pentagonal symmetry) around Y, then rotated by arctan(2) (~63.43°) around X for icosahedral orientation. The result is a shape with 5-fold icosahedral symmetry — nested, interpenetrating icosahedra at multiple orientations.

---

## What geometry helpers and factories are

### Geometry helpers (`geometryHelpers.js`)
Math utilities shared across multiple geometry builders:
- **createTesseractWithFaces** — canonical tesseract construction (outer box + inner box + 6 frustums). Shared so it doesn't get copy-pasted into every tesseract variant.
- **nearestVertexIndex** — given a geometry and a 3D point, finds the closest vertex index. Used by the thick wireframe system.
- **updateThickWireframeCylinders** — repositions each wireframe cylinder every frame by reading the current world positions of its two endpoint vertices and computing the cylinder's midpoint, length, and orientation. Pre-allocates `Vector3` and `Matrix4` objects once (`__UP`, `__Q`, `__TMP`, `__A`, `__B`, `__M`, `__Inv`) and reuses them every call. If these were created inside the function, you'd allocate new objects every frame for every cylinder, causing garbage collection pressure and frame drops.

### Geometry factories (`objects/factories/`)
Assemble complete scene-ready objects from raw geometry:
- **objectFactory.js** — the main orchestrator. Calls `createGeometry`, gets a material from the cache, creates the solid mesh, optionally adds a rotated duplicate, creates wireframe and hyperframe layers, positions everything (centered for single objects, circular for multiple), returns an object with all mesh references.
- **materialFactory.js** — creates `MeshStandardMaterial` instances (PBR materials). Solid material opacity = `1 - wireframeIntensity/100`. Wireframe material opacity = `wireframeIntensity/100`. Wireframe uses `polygonOffset` to prevent z-fighting. `depthWrite: false` on the wireframe lets the solid show through.
- **materialCache.js** — reuses material instances when geometry type and config are identical. Without it, every object creation would allocate a new material even when settings are the same.
- **wireframeAssembler.js** — decides what kind of wireframe to build. Simple geometries get Three.js's built-in wireframe mode. Complex ones get thick cylinder wireframes — actual `CylinderGeometry` meshes along each edge that respond to lighting and look dramatically better than thin lines. Tradeoff: they must be repositioned every frame.
- **hyperframeAssembler.js** — creates the glowing inner dimensional framework — `THREE.Line` and `THREE.LineLoop` objects with their own color control, separate from the base material.

---

## The animation loop and animation styles

`startAnimationLoop` uses `requestAnimationFrame` at ~60fps. Each frame calculates `t = currentTime * 0.001 * objectSpeed`, then applies the selected animation style to every object:

- **rotate** — constant rotation on X and Y. Simple.
- **rotatePulse** — rotation plus sine-wave scale pulsing.
- **floatRotate** — floating position offset on all three axes using sin/cos at different frequencies, plus rotation.
- **wobble** — rotation speed modulated by sine functions — organic, uneven spinning.
- **float** — gentle floating translation with minimal rotation.
- **omniIntel** — the most complex. A 5-phase cycle: Phase 1 (0-18%) awakening with elastic ease-in; Phase 2 (18-38%) quick darting motions; Phase 3 (38-58%) figure-8 swooping paths; Phase 4 (58-82%) triumphant helical upward spiral; Phase 5 (82-100%) lerps back to origin. Objects 0-3 each get different `cycleTime`, `orbitSize`, and `reactionSpeed` so they have distinct personalities.

Mouse drag interaction is layered on top via raycasting — clicking an object sets a rotation delta which the loop applies each frame while exponentially decaying it.

---

## The audio system

### useAudioAnalyzer
Creates a Web Audio API pipeline. When audio is toggled on, calls `getUserMedia` with echo cancellation, noise suppression, and auto gain control all disabled — you want the raw signal. Creates an `AnalyserNode` with `fftSize: 512` and `smoothingTimeConstant: 0` (zero temporal smoothing — instant response to transients, so the visuals react tight to the beat). Runs its own `requestAnimationFrame` loop calling `analyzer.getByteFrequencyData()` every frame. Maps 256 frequency bins to:
- **bass** — 20-250 Hz, weighted 70% sub-bass + 30% mid-bass (kick drums hit harder in sub-bass)
- **mids** — 250-2000 Hz
- **highs** — 2000-8000 Hz

### useAudioReactive
Consumes those values and applies them to 3D objects every frame. Thresholds filter ambient noise (0.45 for bass, 0.35 for mids). Above the threshold: bass drives scale pulsing, Z-position movement, and X-axis rotation velocity; mids drive Y and Z rotation velocity. Friction of 0.5 decays velocity each frame — objects spin up fast on a beat then slow quickly. Color cycling steps the hue around the color wheel in 8 equal increments, advancing every 3 rotations and lerping with `color.lerp()` at 10% per frame, preserving the user's saturation/brightness aesthetic.

---

## State management and localStorage

### AuthContext
Stores: user object, JWT token, `isAuthenticated`, `unlockedAnimations` array, `unlockedNoetechs` array.

On login, both React state and localStorage get written. On every app load, a `useEffect` reads localStorage and restores state — this is why you stay logged in across refreshes. On new unlocks, the arrays are merged using a Set (for deduplication), state is updated, and the user object is written back to localStorage — no extra API call needed.

### SceneContext
Stores: `currentSceneId`, `sceneOwner`, `sceneName`, `sceneDescription`, `isPublic`, `sceneMode`, `loadedConfig`.

The three scene modes:
- **fresh** — new unsaved scene. No ID.
- **loaded** — your own saved scene. Saving overwrites it.
- **remixed** — someone else's scene. Saving creates a new scene under your account, not overwriting theirs.

`loadedConfig` is the raw config object from the database. When the editor loads it, it hydrates all sliders back to saved state.

---

## The backend and unlock progression

### Auth
JWT tokens with 7-day expiry. Protected routes run `authMiddleware` which extracts the Bearer token, verifies it, queries the database for that user (excluding the password field), and attaches the user document to `req.user`. Invalid or expired tokens return 401.

Passwords: bcryptjs with 10 salt rounds in a Mongoose pre-save hook. Login uses `bcrypt.compare()`.

### Scene config schema
Every editor setting is stored: `scale`, `metalness`, `emissiveIntensity`, `baseColor`, `wireframeIntensity`, `hyperframeColor`, `hyperframeLineColor`, `cameraView`, `environment`, `environmentHue`, `objectCount`, `animationStyle`, `objectType`, `objectSpeed`, `orbSpeed`, and all ambient/directional light values.

### Unlock progression
`UNLOCK_PROGRESSION` is an array of milestone objects. Save 1 → Icarus-X, save 2 → Vectra, save 3 → Nexus, save 4 → She-Tech, save 5 → Phoenix Dive animation. On every `POST /api/scenes`, the route increments `user.scenesSaved`, iterates the milestones, appends newly unlocked items, saves the user document, and returns the unlocks in the response. The frontend shows the unlock modal.

Security: Helmet for HTTP headers, rate limiting (300 req/15min global, 20 req/15min on auth routes), CORS allows localhost, GitHub Pages, and any Vercel app URL.

---

## The technically interesting decisions

**1. Separating expensive and cheap update paths.**
If geometry creation and material updates shared the same hook, every color slider drag would rebuild geometry. Separate hooks with separate dependency arrays means the expensive path only runs when shape or count changes.

**2. Speed via useRef.**
Object speed stored in a ref and read directly by the animation loop means the loop never restarts when speed changes. Restarting causes a visible hitch; this avoids it.

**3. Pre-allocated vector objects.**
The `__UP`, `__Q`, `__TMP` etc. at the top of `geometryHelpers.js` are single instances reused every frame. Without this, every frame would allocate new `THREE.Vector3` and `THREE.Matrix4` objects — the garbage collector would run periodically and cause frame drops.

**4. mergeGeometries for compound shapes.**
Combining multiple geometries into one buffer means one draw call instead of many. The Hessian polychoron's 15 icosahedral shells are one draw call, not 15. Fewer draw calls = better GPU throughput.

**5. Thick cylinder wireframes.**
Real `CylinderGeometry` meshes for each edge instead of built-in wireframe mode. They have volume, respond to lighting, look dramatically better. Cost: they must be repositioned every frame.

**6. Zero-smoothing audio for beat accuracy.**
`smoothingTimeConstant: 0` prioritizes instant response to transients. This is why the scene reacts tight to the beat instead of smearing the response over time.

---

## Honest interview answers

### What's genuinely complex or impressive
The geometry library is the real achievement. Hand-building 4D polytope projections (120-cell, 600-cell, 24-cell, tesseract with frustum faces), the Möbius sphere with Lorenz attractor orbital math and Fibonacci spiral anchors — these require real mathematical understanding. The hook ordering and separation of expensive/cheap update paths are genuine architectural decisions with real performance consequences. The audio pipeline with threshold filtering and per-frame FFT analysis is legitimately sophisticated.

### What's simpler than it sounds
Many geometry names are exotic but use straightforward Three.js classes underneath. An "octahedron" is `new THREE.OctahedronGeometry()`. Many "compound" shapes are a loop that rotates a base geometry and pushes it into `mergeGeometries`. The unlock system is a simple array comparison with a counter — not technically complex, but cleanly structured.

### Tradeoffs to know
The thick wireframe cylinder repositioning runs every frame for every cylinder on every complex object — this scales poorly with object count, which is why `objectCount` is capped at 24. `SceneContext.saveScene()` has a mock implementation that was scaffolded but not wired to the backend — the real save logic lives in `saveButtonHandlers.js` and goes directly to the API. The speed `useRef` pattern means if someone reads the hook and sees speed missing from a dependency array, they might think it's a bug — it's intentional, but you'd need to explain it.
