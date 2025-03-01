import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, controls;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
const speed = 5; // Movement speed
const clock = new THREE.Clock(); // To track delta time

const dropOverlay = document.getElementById('dropOverlay');
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');

init();
animate();
setupDragAndDrop();
setupFileUpload();
setupControls();

function init() {
  scene = new THREE.Scene();
  const canvas = document.querySelector("#canvas");

  renderer = new THREE.WebGLRenderer({ canvas });
  scene.background = new THREE.Color(0x3597db);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 2, 10);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(50, 100, 50).normalize();
      scene.add(light);


  controls = new PointerLockControls(camera, document.body);
  document.addEventListener('click', () => {
    controls.lock();
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // Update delta time
  velocity.set(0, 0, 0); // Reset velocity on each frame

  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction); // Get the forward direction of the camera

  // Handle WASD controls relative to the camera's orientation
  if (moveForward) velocity.addScaledVector(direction, speed * delta); // Move forward
  if (moveBackward) velocity.addScaledVector(direction, -speed * delta); // Move backward

  // To move left and right, we need a right vector which is perpendicular to the forward vector
  const right = new THREE.Vector3();
  right.crossVectors(camera.up, direction); // Get the right direction of the camera

  if (moveLeft) velocity.addScaledVector(right, speed * delta); // Move left
  if (moveRight) velocity.addScaledVector(right, -speed * delta); // Move right

  // Apply the movement to the camera's position
  camera.position.add(velocity);

  renderer.render(scene, camera);
  
}

function setupDragAndDrop() {
  window.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropOverlay.classList.add('active');
  });

  window.addEventListener('dragleave', () => {
    dropOverlay.classList.remove('active');
  });

  window.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
    dropOverlay.classList.remove('active');
  });
}

function setupFileUpload() {
  uploadButton.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  });
}

function handleFileUpload(files) {
  const file = files[0];
  const filename = file.name.toLowerCase();
  
  if (filename.endsWith('.gltf') || filename.endsWith('.glb')) {
    const url = URL.createObjectURL(file);
    const loader = new GLTFLoader();
    
    loader.load(url, (gltf) => {
      gltf.scene.scale.set(0.1, 0.032, 0.1);
      gltf.scene.position.set(0, 0, 0);
      scene.add(gltf.scene);
      URL.revokeObjectURL(url);
      dropOverlay.style.display = 'none';
    }, undefined, (error) => {
      console.error("Error loading model:", error);
    });
  } else {
    alert("Unsupported file type. Please upload a .gltf or .glb file.");
  }
}

function setupControls() {
  // Event listeners for keyboard controls (WASD)
  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW': // Move forward
        moveForward = true;
        break;
      case 'KeyS': // Move backward
        moveBackward = true;
        break;
      case 'KeyA': // Move left
        moveLeft = true;
        break;
      case 'KeyD': // Move right
        moveRight = true;
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW': // Stop moving forward
        moveForward = false;
        break;
      case 'KeyS': // Stop moving backward
        moveBackward = false;
        break;
      case 'KeyA': // Stop moving left
        moveLeft = false;
        break;
      case 'KeyD': // Stop moving right
        moveRight = false;
        break;
    }
  });
}
