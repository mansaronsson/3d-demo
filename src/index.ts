import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene
const scene = new THREE.Scene();
// fov, aspect ratio, near, far
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load models
let table_model: THREE.Group;
const loader = new GLTFLoader();
loader.load(
    'assets/models/table.glb',
    (gltf) => {
        table_model = gltf.scene;
        table_model.position.set(-.5, 0, -.5);
        scene.add(table_model);
    },
    undefined,
    (error) => { console.error(error); }
);
let lamps_model: THREE.Group;
loader.load(
    'assets/models/lamp.glb',
    (gltf) => {
        lamps_model = gltf.scene;
        lamps_model.scale.set(0.1, 0.1, 0.1);
        lamps_model.position.set(0.5, -0.2, .5);
        scene.add(lamps_model);
    },
    undefined,
    (error) => { console.error(error); }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Do something

    renderer.render(scene, camera);
}
animate();
