let scene, camera, renderer, terrain, terrainMaterial;
import { makeNoise2D } from "./openSimplexNoise.js";

function createNoise(width, height, scale, seed, octaves, persistence, lacunarity) {
    scale = scale || 1;
    seed = seed || Date.now();
    octaves = octaves || 1;
    persistence = persistence || 0;
    lacunarity = lacunarity || 2.0;

    const noise2D = makeNoise2D(seed);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let amplitude = 1;
            let frequency = 1;
            let noiseValue = 0;

            for (let o = 0; o < octaves; o++) {
                noiseValue += amplitude * noise2D(x * frequency / scale, y * frequency / scale);
                amplitude *= persistence;
                frequency *= lacunarity;
            }

            const value = (noiseValue + 1) * 128; // Normalize noise to [0, 255]
            const index = (y * width + x) * 4;
            data[index] = value;     // Red
            data[index + 1] = value; // Green
            data[index + 2] = value; // Blue
            data[index + 3] = 255;   // Alpha
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
}

export function createRenderer(element){
    // Load height map and color map textures
    const heightMapUrl = "./Untitled.png"; // Replace with your heightmap file path
    const colorMapUrl = "./Untitled.png"; // Replace with your color map file path
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 330, 500);
    camera.lookAt(0, -20, 0);

    // Create the renderer
    renderer = new THREE.WebGLRenderer();
    const bounds = element.getBoundingClientRect()
    renderer.setSize(bounds.width, bounds.height);
    element.appendChild(renderer.domElement);

    // Create terrain geometry
    const terrainWidth = 512;
    const terrainHeight = 512;
    const terrainSegments = 511;

    
    

    //createMesh(256,256,heightMapUrl,colorMapUrl)
    
    animate();
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 100).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    let rotation = 0
    function animate() {
        requestAnimationFrame(animate);
        if(terrain!=null){rotation += 0.001;
            terrain.rotation.y = rotation
        }
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        const bounds = element.getBoundingClientRect()
        renderer.setSize(bounds.width, bounds.height);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = bounds.width / bounds.height;
        camera.updateProjectionMatrix();
    });
    animate()
}

export function createMesh(scale, heightMapCTX, colorMapCTX){
    

    const terrainSegments = 255;
    const geometry = new THREE.PlaneGeometry(scale, scale, terrainSegments, terrainSegments);
    geometry.rotateX(-Math.PI / 2);

        const ctx = heightMapCTX
        const heightData = ctx.getImageData(0, 0, terrainSegments+1, terrainSegments+1).data;
        for(let i = 0; i < geometry.attributes.position.count; i++) {
            const x = i % (terrainSegments + 1);
            const z = Math.floor(i / (terrainSegments + 1));
            
            const height = heightData[Math.floor((x+((z)*(terrainSegments+1)))*4)] / 255;

            geometry.attributes.position.setY(i, (height * 40*(scale/200))-(scale/10))
        }

        geometry.computeVertexNormals(); // Recompute normals for proper lighting
        // After height map is loaded and terrain is updated, load color map and apply material
        const colorMap = new THREE.TextureLoader().load(colorMapCTX.canvas.toDataURL(), () => {
            terrainMaterial = new THREE.MeshPhongMaterial({
                map: colorMap,
                side: THREE.DoubleSide,
                flatShading: true,
                shininess: 0,
            });

            // Create the terrain mesh
            scene.remove(terrain)
            terrain = new THREE.Mesh(geometry, terrainMaterial);
            scene.add(terrain)          
        });
    //});
}