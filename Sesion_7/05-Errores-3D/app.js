/* 05. Errores 3D. */
console.log('05. Errores 3D.');

// --- ESCENA, CÁMARA Y RENDERER ---
const canvas = document.getElementById('lienzo');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(canvas.width, canvas.height);
document.body.appendChild(renderer.domElement);

camera.position.z = 25;

// --- LUCES ---
const ambientLight = new THREE.AmbientLight("blue", 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("red", 1);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// --- OBJETOS ---
const cubeGeo = new THREE.BoxGeometry();
const cubeMat = new THREE.MeshStandardMaterial({ color: "white" });
const cube = new THREE.Mesh(cubeGeo, cubeMat);
scene.add(cube);

const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: "white" });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// --- INTERACCIÓN CON MOUSE ---
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / canvas.width) * 2 - 1;
    mouse.y = -((event.clientY / canvas.height) * 2 - 1);
});

// --- ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

    // Rotaciones
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    const rotationSpeed = 0.01;
    sphere.rotation.y += rotationSpeed;

    // Movimiento de la esfera según mouse
    sphere.position.x = mouse.x * 5;
    sphere.position.y = mouse.y * 5;

    renderer.render(scene, camera);
}

animate();

/*
Correcciones realizadas:
- Se cargó Three.js antes de app.js y se ubicó el <canvas> dentro del body.
- Aspect ratio corregido: window.innerWidth / window.innerHeight.
- Propiedad correcta del renderer: domElement (no domElement).
- Añadir pointLight a la escena para iluminar MeshStandardMaterial.
- Se definió rotationSpeed antes de usarlo.
- Verificar el id del canvas ('lienzo') y su tamaño a pantalla completa.
- Confirmar el orden de carga de scripts en el HTML para evitar referencias nulas.
- Ajuste pequeños detalles de texto/estilo según tus necesidades.
*/