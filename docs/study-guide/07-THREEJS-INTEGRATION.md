# 07 - Three.js Integration

> How 3D rendering works with React in this app

## 🎮 What is Three.js?

Three.js is a JavaScript library that makes WebGL (3D graphics in the browser) accessible.

**Without Three.js:** Write hundreds of lines of WebGL shaders, buffers, matrices
**With Three.js:** Create 3D scenes with intuitive objects like `Scene`, `Camera`, `Mesh`

---

## 🏗️ Three.js Core Concepts

### The Three.js Trinity

```javascript
// 1. SCENE - The container for all 3D objects
const scene = new THREE.Scene();

// 2. CAMERA - The viewpoint
const camera = new THREE.PerspectiveCamera(
  75,                           // Field of view (degrees)
  window.innerWidth / window.innerHeight,  // Aspect ratio
  0.1,                          // Near clipping plane
  1000                          // Far clipping plane
);
camera.position.z = 5;

// 3. RENDERER - Draws the scene to canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

### Creating Objects (Meshes)

```javascript
// Mesh = Geometry + Material

// GEOMETRY - The shape
const geometry = new THREE.IcosahedronGeometry(1, 1);

// MATERIAL - How it looks
const material = new THREE.MeshStandardMaterial({
  color: 0xff00ff,
  metalness: 0.5,
  roughness: 0.3
});

// MESH - Geometry + Material combined
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### The Render Loop

```javascript
function animate() {
  requestAnimationFrame(animate);  // Call again next frame
  
  mesh.rotation.x += 0.01;  // Animate
  mesh.rotation.y += 0.01;
  
  renderer.render(scene, camera);  // Draw
}
animate();  // Start the loop
```

---

## ⚛️ React + Three.js Integration

### The Challenge

Three.js is **imperative** (you tell it what to do step by step):
```javascript
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.rotation.x = 0.5;  // Directly mutate
```

React is **declarative** (you describe what you want):
```jsx
<Mesh rotation={[0.5, 0, 0]} />  // Describe the state
```

### Our Approach: Vanilla Three.js with React Lifecycle

```jsx
// ThreeScene.jsx
function ThreeScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  
  // React state that controls Three.js
  const [metalness, setMetalness] = useState(0.5);
  const [baseColor, setBaseColor] = useState('#ff00ff');
  
  // Initialize Three.js (runs once)
  useEffect(() => {
    // Create scene, camera, renderer
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, ...);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    
    // Create mesh
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial();
    meshRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(meshRef.current);
    
    // Add to DOM
    containerRef.current.appendChild(rendererRef.current.domElement);
    
    // Start animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      meshRef.current.rotation.x += 0.01;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();
    
    // Cleanup on unmount
    return () => {
      rendererRef.current.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);  // Empty deps = run once
  
  // Update material when React state changes
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.metalness = metalness;
      meshRef.current.material.color.set(baseColor);
    }
  }, [metalness, baseColor]);  // Run when these change
  
  return (
    <>
      <div ref={containerRef} className="canvas-container" />
      <Controls 
        metalness={metalness}
        onMetalnessChange={setMetalness}
        baseColor={baseColor}
        onBaseColorChange={setBaseColor}
      />
    </>
  );
}
```

---

## 🎨 Materials in This App

### MeshStandardMaterial (PBR)

Physically-Based Rendering - realistic lighting.

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xff00ff,         // Base color
  metalness: 0.5,          // 0 = plastic, 1 = metal
  roughness: 0.3,          // 0 = mirror, 1 = matte
  emissive: 0x220022,      // Self-illumination color
  emissiveIntensity: 0.5,  // How bright the glow
  wireframe: false,        // Show edges only
  transparent: true,       // Allow transparency
  opacity: 0.9,            // How see-through
});
```

### Updating Material from React

```jsx
// When user moves slider:
useEffect(() => {
  if (meshRef.current?.material) {
    const mat = meshRef.current.material;
    mat.metalness = metalness;
    mat.roughness = roughness;
    mat.color.set(baseColor);  // color.set() for colors
    mat.emissive.set(emissiveColor);
    mat.needsUpdate = true;  // Sometimes needed
  }
}, [metalness, roughness, baseColor, emissiveColor]);
```

---

## 📐 Geometries in This App

### Built-in Geometries

```javascript
// Sphere-ish
new THREE.IcosahedronGeometry(radius, detail);
new THREE.DodecahedronGeometry(radius, detail);
new THREE.OctahedronGeometry(radius, detail);

// Basic shapes
new THREE.BoxGeometry(width, height, depth);
new THREE.SphereGeometry(radius, widthSegments, heightSegments);
new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);
```

### Switching Geometry

```jsx
const [geometryType, setGeometryType] = useState('icosahedron');

useEffect(() => {
  // Dispose old geometry
  if (meshRef.current) {
    meshRef.current.geometry.dispose();
    
    // Create new geometry based on type
    let newGeometry;
    switch (geometryType) {
      case 'icosahedron':
        newGeometry = new THREE.IcosahedronGeometry(1, 1);
        break;
      case 'dodecahedron':
        newGeometry = new THREE.DodecahedronGeometry(1, 0);
        break;
      case 'torus':
        newGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      // ... more cases
    }
    
    meshRef.current.geometry = newGeometry;
  }
}, [geometryType]);
```

---

## 💡 Lighting

```javascript
// Ambient light - illuminates everything evenly
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Point light - like a light bulb
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Directional light - like the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

// Spotlight - focused cone of light
const spotlight = new THREE.SpotLight(0xffffff, 1);
spotlight.position.set(0, 5, 0);
spotlight.angle = Math.PI / 6;
scene.add(spotlight);
```

---

## 🎬 Animation Patterns

### Basic Rotation
```javascript
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
```

### Speed Control from React
```jsx
const [rotationSpeed, setRotationSpeed] = useState(1);
const speedRef = useRef(rotationSpeed);

// Keep ref in sync
useEffect(() => {
  speedRef.current = rotationSpeed;
}, [rotationSpeed]);

// Animation loop uses ref (doesn't need to restart)
useEffect(() => {
  let animationId;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    mesh.rotation.x += 0.01 * speedRef.current;
    renderer.render(scene, camera);
  };
  animate();
  return () => cancelAnimationFrame(animationId);
}, []);  // Only run once
```

### GSAP Integration (Smooth Animations)
```javascript
import gsap from 'gsap';

// Smooth rotation
gsap.to(mesh.rotation, {
  x: Math.PI * 2,
  duration: 2,
  ease: 'power2.inOut',
  repeat: -1  // Infinite
});

// Animate on state change
useEffect(() => {
  gsap.to(mesh.scale, {
    x: scale,
    y: scale,
    z: scale,
    duration: 0.3,
    ease: 'back.out'
  });
}, [scale]);
```

---

## 🖼️ Responsive Canvas

```jsx
useEffect(() => {
  const handleResize = () => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  window.addEventListener('resize', handleResize);
  handleResize();  // Initial size
  
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

## 🧹 Memory Management

Three.js doesn't garbage collect automatically. You must dispose!

```jsx
useEffect(() => {
  // Create resources
  const geometry = new THREE.IcosahedronGeometry(1, 1);
  const material = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  
  // CLEANUP when component unmounts
  return () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    
    // Remove textures if any
    if (material.map) material.map.dispose();
    
    // Remove from scene
    scene.remove(mesh);
  };
}, []);
```

---

## 🎓 Interview Talking Points

1. **"Three.js is imperative, React is declarative"** - I use refs to hold Three.js objects and useEffect to sync React state to Three.js

2. **"Memory management is critical"** - Must dispose geometries, materials, textures to prevent memory leaks

3. **"requestAnimationFrame for smooth 60fps"** - Browser-optimized animation loop

4. **"PBR materials for realistic rendering"** - MeshStandardMaterial uses physically-based rendering

5. **"Refs prevent re-initialization"** - Three.js objects persist in refs, only update when needed

6. **"Cleanup on unmount"** - Always return cleanup function from useEffect to dispose resources
