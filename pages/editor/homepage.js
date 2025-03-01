import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Constants
const MIN_CLOUD_DISTANCE = 10;
const DEBUG_MODE = false;
const DISABLE_CLOUDS = false;
const NIGHT_MODE = false;

// Setup Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 5, 20);
camera.lookAt(0, 10, 0);

// Set the background color to a solid blue sky
scene.background = new THREE.Color(0x3597db);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

// Declare cityObject in the outer scope
let cityObject;
let clouds = [];  // Store cloud instances

// Cloud Class (using sprite for 2D cloud image)
class Cloud {
    constructor(sprite) {
        this.sprite = sprite;
        this.sprite.name = 'cloud';
    }

    update() {
        const cameraPosition = camera.position;
        const distance = this.sprite.position.distanceTo(cameraPosition);

        // Update opacity based on camera distance
        if (distance < MIN_CLOUD_DISTANCE || (DEBUG_MODE && DISABLE_CLOUDS)) {
            this.sprite.material.opacity = 0;
        } else {
            this.sprite.material.opacity = NIGHT_MODE ? 0.25 : 1;
        }
    }
}

// Load GLTF Model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    '/assets/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(-4, -5, 0);
        model.rotation.x = 0;
        model.rotation.y = 0;
        model.scale.set(0.75, 0.75, 0.75);
        scene.add(model);
        cityObject = model;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Create Clouds (Flat 2D Sprites with texture)
const cloudTexture = new THREE.TextureLoader().load('/assets/cloud.png'); // Path to cloud texture (ensure cloud.png exists)

// Create a fixed number of clouds
const cloudPositions = [
    { x: 0, y: 0, z: -5 },
    { x: 5, y: 4, z: 3 },
    { x: 3, y: 2, z: 1 },
    { x: -2, y: 2, z: -3 },
    { x: 6, y: -4, z: -4 },
    { x: 3, y: -4, z: 0 },
    { x: -8, y: 4, z: -1 },
    { x: 9, y: -4, z: 2},
    { x: -10, y: -3, z: 0 },
    { x: -4, y: -5, z: 0 }
];

// Create 7 clouds at fixed positions
cloudPositions.forEach(position => {
    const cloudMaterial = new THREE.SpriteMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 1,
    });

    const cloud = new THREE.Sprite(cloudMaterial);
    cloud.scale.set(2, 1.5, 2);  // Set fixed size for clouds
    cloud.position.set(position.x, position.y, position.z);  // Set fixed position

    scene.add(cloud);
    clouds.push(new Cloud(cloud));
});

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Disable rotation via dragging (we only want scroll wheel movement)
controls.enableRotate = false;
controls.enableZoom = false;

let targetRotationY = 0;
let rotationSpeed = 0.005;

window.addEventListener('wheel', (event) => {
    targetRotationY += event.deltaY * 0.002;
});

// Disable right-click context menu
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Disable Ctrl + Scroll for zooming
window.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
});
let cloudSpeed = 0.02;

// Animate Scene
function animate() {
    requestAnimationFrame(animate);

    // Smoothly interpolate rotation towards target rotation
    if (cityObject) {
        cityObject.rotation.y += (targetRotationY - cityObject.rotation.y) * rotationSpeed;
        
        clouds.forEach(cloud => {
            cloud.sprite.rotation.y += (targetRotationY - cloud.sprite.rotation.y) * rotationSpeed;
        });
    }

    // Update each cloud's opacity based on its distance to the camera
    clouds.forEach(cloud => {
        cloud.sprite.position.x += cloudSpeed;

        // If cloud moves beyond x = 12, reset to x = -12 (loop effect)
        if (cloud.sprite.position.x > 12) {
            cloud.sprite.position.x = -12;
        }

        cloud.update();
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Resize Handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
