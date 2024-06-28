import * as THREE from 'three';
import spheres from '/Users/waleedkhaliq/Desktop/Studium/4.Semester/GDV/project/computergraphics/src/cg/bird.json';

interface Light {
    intensity: number;
    position: [number, number, number];
}

// Utility function for ray-sphere intersection
function raySphereIntersect(rayOrigin: THREE.Vector3, rayDir: THREE.Vector3, sphereCenter: THREE.Vector3, sphereRadius: number): [number, number] {
    const oc = new THREE.Vector3().subVectors(rayOrigin, sphereCenter);
    const a = rayDir.dot(rayDir);
    const b = 2.0 * oc.dot(rayDir);
    const c = oc.dot(oc) - sphereRadius * sphereRadius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return [Infinity, Infinity];
    } else {
        const t1 = (-b - Math.sqrt(discriminant)) / (2.0 * a);
        const t2 = (-b + Math.sqrt(discriminant)) / (2.0 * a);
        return [t1, t2];
    }
}

// Function to get the closest intersecting sphere
function getClosestSphere(rayOrigin: THREE.Vector3, rayDir: THREE.Vector3, spheres: any[]): [any, number] {
    let closestSphere = null;
    let closestIntersection = Infinity;

    for (let i = 0; i < spheres.length; i++) {
        const sphere = spheres[i];
        const [t1, t2] = raySphereIntersect(rayOrigin, rayDir, new THREE.Vector3(sphere.center[0], sphere.center[1], sphere.center[2]), sphere.radius);

        if (t1 > 0 && t1 < closestIntersection) {
            closestIntersection = t1;
            closestSphere = sphere;
        }

        if (t2 > 0 && t2 < closestIntersection) {
            closestIntersection = t2;
            closestSphere = sphere;
        }
    }

    return [closestSphere, closestIntersection];
}

// Lighting function that accounts for shadows
function lightingWithShadows(surfacePosition: THREE.Vector3, surfaceNormal: THREE.Vector3, lights: Light[], spheres: any[]): number {
    let intensity = 0.0;

    for (let i = 0; i < lights.length; i++) {
        const lightPos = new THREE.Vector3(lights[i].position[0], lights[i].position[1], lights[i].position[2]);
        const lightDir = new THREE.Vector3().subVectors(lightPos, surfacePosition).normalize();

        const [shadowSphere, shadowIntersection] = getClosestSphere(surfacePosition, lightDir, spheres);

        // If in shadow, skip to next light:
        if (shadowSphere) {
            continue;
        }

        // Compute lighting as before:
        const dotP = surfaceNormal.dot(lightDir);

        if (dotP > 0) {
            intensity += lights[i].intensity * dotP;
        }
    }

    return intensity;
}

// Calculate the surface normal at a point on the sphere
function calculateSurfaceNormal(surfacePosition: THREE.Vector3, sphereCenter: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3().subVectors(surfacePosition, sphereCenter).normalize();
}

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x331111, 1);  // Set a slightly lighter dark red background color
renderer.shadowMap.enabled = true;  // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Use soft shadows
document.body.appendChild(renderer.domElement);

// Lights setup
const ambientLight = new THREE.AmbientLight(0x333333, 0.5);  // Dim ambient light
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);  // Strong directional light
directionalLight1.position.set(10, 20, 10);
directionalLight1.castShadow = true;  // Enable shadows for this light
directionalLight1.shadow.mapSize.width = 4096;  // Increase shadow map resolution
directionalLight1.shadow.mapSize.height = 4096;
directionalLight1.shadow.camera.near = 0.5;  // Adjust shadow camera parameters
directionalLight1.shadow.camera.far = 50;
directionalLight1.shadow.camera.left = -50;
directionalLight1.shadow.camera.right = 50;
directionalLight1.shadow.camera.top = 50;
directionalLight1.shadow.camera.bottom = -50;
directionalLight1.shadow.bias = -0.001;  // Fine-tune shadow bias to prevent artifacts
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);  // Additional directional light
directionalLight2.position.set(-10, 20, 10);
directionalLight2.castShadow = true;  // Enable shadows for this light
directionalLight2.shadow.mapSize.width = 4096;  // Increase shadow map resolution
directionalLight2.shadow.mapSize.height = 4096;
directionalLight2.shadow.camera.near = 0.5;  // Adjust shadow camera parameters
directionalLight2.shadow.camera.far = 50;
directionalLight2.shadow.camera.left = -50;
directionalLight2.shadow.camera.right = 50;
directionalLight2.shadow.camera.top = 50;
directionalLight2.shadow.camera.bottom = -50;
directionalLight2.shadow.bias = -0.001;  // Fine-tune shadow bias to prevent artifacts
scene.add(directionalLight2);

// Create a ground plane to receive shadows
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;  // Position it at the origin
ground.receiveShadow = true;  // Enable shadows on the ground
scene.add(ground);

// Create a group to hold the spheres
const birdGroup = new THREE.Group();

for (let i = 0; i < spheres.length; i++) {
    const sphereData = spheres[i];
    const geometry = new THREE.SphereGeometry(sphereData.radius);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`rgb(${sphereData.color[0]}, ${sphereData.color[1]}, ${sphereData.color[2]})`),
        metalness: 0.7,
        roughness: 0.1
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(sphereData.center[0], sphereData.center[1], sphereData.center[2]);
    sphere.castShadow = true;  // Ensure the sphere casts shadows
    sphere.receiveShadow = true;  // Ensure the sphere receives shadows
    birdGroup.add(sphere);
}

scene.add(birdGroup);

birdGroup.rotation.x = -Math.PI / 2;

const box = new THREE.Box3().setFromObject(birdGroup);
const boxCenter = box.getCenter(new THREE.Vector3());

birdGroup.position.y -= box.min.y;  // Ensure the lowest part of the bird model touches the ground

camera.position.z = 15;

// Main rendering loop
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    camera.position.x = 15 * Math.cos(time);
    camera.position.y = 0;
    camera.position.z = 15 * Math.sin(time);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);
}

animate();