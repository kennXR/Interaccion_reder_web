console.log("Sesion 5. Ejercicio01: Geometrias");
console.log("THREE: ", THREE);

// Objeto global mouse para evitar errores de referencia
window.mouse = {
    x: 0,
    y: 0,
    isDown: false,
    lerpNormalOffset: 0.1, // Factor de interpolación para normalizar offset del mouse
    normalizedX: 0,        // Posición X normalizada (-1 a 1)
    normalizedY: 0,        // Posición Y normalizada (-1 a 1)
    deltaX: 0,             // Delta X desde el último frame
    deltaY: 0,             // Delta Y desde el último frame
    scrollRotation: 0,     // Rotación de la cámara por scroll
    zoomDistance: 11.31    // Distancia actual de zoom (sqrt(8² + 8²))
};

// Wrapper para manejar errores
try {

// 1. Definir nuestro canvas
const canvas = document.getElementById("lienzo");
if (!canvas) {
    console.error("Canvas 'lienzo' no encontrado");
    throw new Error("Canvas 'lienzo' no encontrado");
}

// Configurar tamaño del canvas
function resizeCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resizeCanvas();

// El event listener de resize se moverá después de definir camera y renderer

// 4. Creamos nuestros elementos básicos
// Escena, escenario, Mesh, Camras
//escena
const scene = new THREE.Scene();

//camara
const camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 0.1, 1000);
camera.position.set(0, 8, 8); // Cámara elevada para ver todo el sistema centrado
console.log("camera", camera);


// Variables para control de scroll
let scrollAngleX = 0; // Ángulo horizontal
let scrollAngleY = 0; // Ángulo vertical

// Verificar que las variables estén definidas
console.log("Variables del scroll inicializadas:", { scrollAngleX, scrollAngleY });

// Eventos del mouse (solo para tracking, sin control de cámara)
canvas.addEventListener('mousemove', (event) => {
    // Calcular posiciones normalizadas (-1 a 1)
    window.mouse.normalizedX = (event.clientX / canvas.width) * 2 - 1;
    window.mouse.normalizedY = -((event.clientY / canvas.height) * 2 - 1);
    
    // Sincronizar con objeto global
    window.mouse.x = event.clientX;
    window.mouse.y = event.clientY;
});

// Evitar el menú contextual del botón derecho
canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Control de cámara con scroll (rotación + zoom)
canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    
    const delta = event.deltaY;
    const rotationSpeed = 0.02;
    const zoomSpeed = 0.5;
    
    // Calcular la posición actual de la cámara en coordenadas esféricas
    const radius = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2);
    const theta = Math.atan2(camera.position.z, camera.position.x);
    const phi = Math.acos(camera.position.y / radius);
    
    // Detectar si es zoom o rotación basado en teclas modificadoras
    if (event.ctrlKey || event.metaKey) {
        // Zoom in/out
        const newRadius = Math.max(3, Math.min(25, radius - delta * zoomSpeed));
        
        // Calcular nueva posición de la cámara con nueva distancia
        camera.position.x = newRadius * Math.sin(phi) * Math.cos(theta);
        camera.position.y = newRadius * Math.cos(phi);
        camera.position.z = newRadius * Math.sin(phi) * Math.sin(theta);
        
        // Actualizar tracking
        window.mouse.zoomDistance = newRadius;
    } else {
        // Rotación horizontal
        const newTheta = theta + delta * rotationSpeed;
        
        // Calcular nueva posición de la cámara
        camera.position.x = radius * Math.sin(phi) * Math.cos(newTheta);
        camera.position.y = radius * Math.cos(phi);
        camera.position.z = radius * Math.sin(phi) * Math.sin(newTheta);
        
        // Actualizar tracking
        window.mouse.scrollRotation = newTheta;
    }
    
    // Asegurar que la cámara mire al centro del sistema
    camera.lookAt(0, 0, 0);
});

// Control de zoom con teclas (opcional)
document.addEventListener('keydown', (event) => {
    const zoomSpeed = 1.0;
    const currentDistance = camera.position.length();
    
    if (event.key === '+' || event.key === '=') {
        // Acercar
        const newDistance = Math.max(5, currentDistance - zoomSpeed);
        camera.position.normalize().multiplyScalar(newDistance);
        camera.lookAt(0, 0, 0);
    } else if (event.key === '-' || event.key === '_') {
        // Alejarse
        const newDistance = Math.min(20, currentDistance + zoomSpeed);
        camera.position.normalize().multiplyScalar(newDistance);
        camera.lookAt(0, 0, 0);
    }
});

const frontLight = new THREE.PointLight("#ffffff", 400, 120);
frontLight.position.set(7, 3, 3);
scene.add(frontLight);

// === Luz de borde (rim light) ===
const rimLight = new THREE.PointLight("#0088ff", 150, 120);
rimLight.position.set(-7, -3, -7);
scene.add(rimLight);

// === Luz ambiental para rellenar sombras con tinte azul ===
const ambientLight = new THREE.AmbientLight("#4488ff", 0.4);
scene.add(ambientLight);
// === SISTEMA DE PARTÍCULAS PARA ESTRELLAS ===
const starCount = 1000;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);

// Generar posiciones aleatorias para las estrellas
for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    
    // Posiciones en una esfera grande
    const radius = 50 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i3 + 2] = radius * Math.cos(phi);
    
    // Tamaños aleatorios
    starSizes[i] = Math.random() * 2 + 0.5;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//mesh
/////Geometrias - Sol
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);

// Variables globales para el sol
let sunMesh;
let sunMaterial;
let glowMesh;

// Variables globales para los planetas
let planets = [];
let planetTextures = [];

// Luz del sol
const sunLight = new THREE.PointLight("#ffdd44", 5, 100); // Luz dorada muy intensa
sunLight.position.set(0, 0, 0); // Centrado en el origen
scene.add(sunLight);

//Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(canvas.width, canvas.height);

// Escuchar cambios de tamaño de ventana (después de definir camera y renderer)
window.addEventListener('resize', () => {
    resizeCanvas();
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
});

// === LoadingManager para texturas ===
const manager = new THREE.LoadingManager();
manager.onLoad = () => { 
    console.log("✅ Texturas cargadas"); 
    createSunMaterial(); 
    createPlanets();
    createOrbitalLines(); // Crear líneas orbitales después de los planetas
};
const loader = new THREE.TextureLoader(manager);

// Cargar texturas del sol
const sunTexture = loader.load('./tex/Sol2/space-cruiser-panels_albedo.png');
const sunNormalTexture = loader.load('./tex/Sol2/space-cruiser-panels_normal-ogl.png');
const sunMetallicTexture = loader.load('./tex/Sol2/space-cruiser-panels_metallic.png');
const sunRoughnessTexture = loader.load('./tex/Sol2/space-cruiser-panels_roughness.png');
const sunAOTexture = loader.load('./tex/Sol2/space-cruiser-panels_ao.png');

// Cargar texturas de los planetas
const planet1Texture = loader.load('./tex/Planeta1/worn-military-siding1_albedo.png');
const planet1NormalTexture = loader.load('./tex/Planeta1/worn-military-siding1_normal-ogl.png');

const planet2Texture = loader.load('./tex/Planeta2/coarse-loose-fabric_albedo.png');
const planet2NormalTexture = loader.load('./tex/Planeta2/coarse-loose-fabric_normal-dx.png');
const planet2RoughnessTexture = loader.load('./tex/Planeta2/coarse-loose-fabric_roughness.png');

const planet3Texture = loader.load('./tex/Planeta3/snow-packed12-Base_Color.png');
const planet3NormalTexture = loader.load('./tex/Planeta3/snow-packed12-Normal-ogl.png');

const planet4Texture = loader.load('./tex/Planeta4/alien-carniverous-plant_albedo.png');
const planet4NormalTexture = loader.load('./tex/Planeta4/alien-carniverous-plant_normal-dx.png');
const planet4RoughnessTexture = loader.load('./tex/Planeta4/alien-carniverous-plant_roughness.png');

const planet5Texture = loader.load('./tex/Planeta5/worn-military-siding1_albedo.png');
const planet5NormalTexture = loader.load('./tex/Planeta5/worn-military-siding1_normal-ogl.png');

function createSunMaterial() {
    // === MATERIAL DEL SOL ===
    sunMaterial = new THREE.MeshStandardMaterial({
        map: sunTexture, // Textura base (albedo)
        normalMap: sunNormalTexture, // Textura normal
        metalnessMap: sunMetallicTexture, // Textura de metalness
        roughnessMap: sunRoughnessTexture, // Textura de roughness
        aoMap: sunAOTexture, // Textura de ambient occlusion
        color: "#ffdd44", // Tinte dorado intenso
        emissive: "#ffaa00", // Emisión dorada brillante
        emissiveIntensity: 1.2, // Emisión muy intensa
        metalness: 1.0, // Máximo metalness
        roughness: 0.05, // Rugosidad mínima para máximo brillo
        envMapIntensity: 3.0 // Reflexiones muy intensas
    });

    // Crear el mesh del sol
    sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);
    sunMesh.position.z = 0; // Centrado en el origen
    sunMesh.position.x = 0;
    sunMesh.position.y = 0;

    // Crear un halo brillante alrededor del sol
    const glowGeometry = new THREE.SphereGeometry(1.1, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: "#ffdd44",
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
    });
    glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.copy(sunMesh.position);
    scene.add(glowMesh);

    // Actualizar la posición de la luz para que coincida con el sol
    sunLight.position.copy(sunMesh.position);
}

// Función para obtener color especial basado en el nombre del planeta
function getSpecialColor(planetName) {
    const specialColors = {
        "Planeta1": "#FF6B35", // Naranja brillante
        "Planeta2": "#E91E63", // Rosa vibrante
        "Planeta3": "#00E5FF", // Cian brillante
        "Planeta4": "#76FF03", // Verde lima
        "Planeta5": "#FF1744"  // Rojo vibrante
    };
    return specialColors[planetName] || "#FFFFFF";
}

// Función para crear material especial con efectos adicionales
function createSpecialMaterial(data, originalMaterial) {
    let specialMaterial;
    
    if (data.roughnessTexture) {
        // Planeta con textura de roughness
        specialMaterial = new THREE.MeshStandardMaterial({
            map: data.texture,
            normalMap: data.normalTexture,
            roughnessMap: data.roughnessTexture,
            color: getSpecialColor(data.name),
            metalness: 0.8, // Más metálico
            roughness: 0.3,
            emissive: getSpecialColor(data.name),
            emissiveIntensity: 0.2 // Brillo especial
        });
    } else {
        // Planeta sin textura de roughness
        specialMaterial = new THREE.MeshStandardMaterial({
            map: data.texture,
            normalMap: data.normalTexture,
            color: getSpecialColor(data.name),
            metalness: 0.8, // Más metálico
            roughness: 0.3,
            emissive: getSpecialColor(data.name),
            emissiveIntensity: 0.2 // Brillo especial
        });
    }
    
    return specialMaterial;
}

function createOrbitalLines() {
    // Crear líneas orbitales para cada planeta
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        const userData = planet.userData;
        
        // Crear geometría de círculo usando puntos para líneas más finas
        const points = [];
        const segments = 64;
        
        for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2;
            const x = Math.cos(angle) * userData.distance;
            const z = Math.sin(angle) * userData.distance;
            points.push(new THREE.Vector3(x, 0, z));
        }
        
        // Crear geometría de línea
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Material para la línea orbital
        const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });
        
        // Crear el mesh de la línea orbital
        const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
        
        // Agregar a la escena
        scene.add(orbitLine);
        
        console.log(`✅ Línea orbital creada para ${planet.userData.originalColor} - Distancia: ${userData.distance}`);
    }
}

function createPlanets() {
    // Array con datos de los planetas
    const planetData = [
        {
            name: "Planeta1",
            texture: planet1Texture,
            normalTexture: planet1NormalTexture,
            color: "#8B4513", // Marrón militar
            size: 0.35, // Aumentado de 0.2
            distance: 2.0, // Órbita más cercana al sol
            velocity: 0.04, // Velocidad orbital rápida
            position: 0 // Posición inicial
        },
        {
            name: "Planeta2", 
            texture: planet2Texture,
            normalTexture: planet2NormalTexture,
            roughnessTexture: planet2RoughnessTexture,
            color: "#4B0082", // Púrpura
            size: 0.4, // Aumentado de 0.25
            distance: 3.2, // Órbita intermedia
            velocity: 0.025, // Velocidad orbital media
            position: Math.PI / 5 // 36 grados de diferencia
        },
        {
            name: "Planeta3",
            texture: planet3Texture,
            normalTexture: planet3NormalTexture,
            color: "#FFFFFF", // Blanco nieve
            size: 0.38, // Aumentado de 0.22
            distance: 4.5, // Órbita intermedia
            velocity: 0.018, // Velocidad orbital media-lenta
            position: Math.PI * 2 / 5 // 72 grados de diferencia
        },
        {
            name: "Planeta4",
            texture: planet4Texture,
            normalTexture: planet4NormalTexture,
            roughnessTexture: planet4RoughnessTexture,
            color: "#228B22", // Verde alienígena
            size: 0.45, // Aumentado de 0.3
            distance: 6.0, // Órbita lejana
            velocity: 0.012, // Velocidad orbital lenta
            position: Math.PI * 3 / 5 // 108 grados de diferencia
        },
        {
            name: "Planeta5",
            texture: planet5Texture,
            normalTexture: planet5NormalTexture,
            color: "#DC143C", // Rojo militar
            size: 0.32, // Aumentado de 0.18
            distance: 8.0, // Órbita más lejana
            velocity: 0.008, // Velocidad orbital muy lenta
            position: Math.PI * 4 / 5 // 144 grados de diferencia
        }
    ];

    // Ciclo for para crear los planetas
    for (let i = 0; i < planetData.length; i++) {
        const data = planetData[i];
        
        // Geometría del planeta
        const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
        
        // Material del planeta
        let planetMaterial;
        if (data.roughnessTexture) {
            // Planeta con textura de roughness
            planetMaterial = new THREE.MeshStandardMaterial({
                map: data.texture,
                normalMap: data.normalTexture,
                roughnessMap: data.roughnessTexture,
                color: data.color,
                metalness: 0.1,
                roughness: 0.8
            });
        } else {
            // Planeta sin textura de roughness
            planetMaterial = new THREE.MeshStandardMaterial({
                map: data.texture,
                normalMap: data.normalTexture,
                color: data.color,
                metalness: 0.1,
                roughness: 0.8
            });
        }
        
        // Crear el mesh del planeta
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        
        // Agregar propiedades de órbita al mesh
        planetMesh.userData = {
            distance: data.distance,
            velocity: data.velocity,
            angle: data.position,
            rotationSpeed: data.velocity * 3, // Velocidad de rotación propia basada en velocidad orbital
            originalColor: data.color, // Color original del planeta
            specialColor: getSpecialColor(data.name), // Color especial cuando X < 0
            originalMaterial: planetMaterial, // Material original
            specialMaterial: createSpecialMaterial(data, planetMaterial), // Material especial
            isUsingSpecialColor: false // Estado del color actual
        };
        
        // Posicionar el planeta en su órbita inicial (centrado en el origen)
        planetMesh.position.x = Math.cos(data.position) * data.distance;
        planetMesh.position.z = Math.sin(data.position) * data.distance; // Centrado en el origen
        planetMesh.position.y = 0;
        
        // Agregar a la escena y al array de planetas
        scene.add(planetMesh);
        planets.push(planetMesh);
        
        console.log(`✅ ${data.name} creado - Distancia: ${data.distance}, Velocidad: ${data.velocity}`);
    }
}

// Tip para animar nuestro mesh:
function animate() {
    requestAnimationFrame(animate);
 
    // Animación del sol y su halo
    if (sunMesh) {
        sunMesh.rotation.x += 0.01;
        sunMesh.rotation.y += 0.01;
        
        // El halo rota más lento para crear un efecto dinámico
        if (glowMesh) {
            glowMesh.rotation.x += 0.005;
            glowMesh.rotation.y += 0.005;
        }
    }

    // Animación orbital de los planetas usando Math.sin() y Math.cos()
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        const userData = planet.userData;
        
        // Actualizar el ángulo orbital usando la velocidad guardada
        userData.angle += userData.velocity;
        
        // Calcular nueva posición orbital en círculo usando Math.cos() y Math.sin()
        // X = cos(ángulo) * distancia
        planet.position.x = Math.cos(userData.angle) * userData.distance;
        // Z = sin(ángulo) * distancia (órbita en el plano XZ)
        planet.position.z = Math.sin(userData.angle) * userData.distance;
        // Y permanece en 0 (órbita plana)
        planet.position.y = 0;
        
        // Cambiar color/material basado en posición X
        if (planet.position.x < 0 && !userData.isUsingSpecialColor) {
            // Cambiar a color/material especial
            planet.material = userData.specialMaterial;
            userData.isUsingSpecialColor = true;
            console.log(`${userData.originalColor} cambió a color especial ${userData.specialColor}`);
        } else if (planet.position.x >= 0 && userData.isUsingSpecialColor) {
            // Regresar a color/material original
            planet.material = userData.originalMaterial;
            userData.isUsingSpecialColor = false;
            console.log(`${userData.specialColor} regresó a color original ${userData.originalColor}`);
        }
        
        // Rotación del planeta sobre sí mismo con velocidad individual
        planet.rotation.y += userData.rotationSpeed;
        planet.rotation.x += userData.rotationSpeed * 0.3; // Rotación adicional en X
    }

    // Animación de parpadeo de estrellas
    const time = Date.now() * 0.0005;
    starMaterial.opacity = 0.5 + Math.sin(time) * 0.3;

    camera.lookAt(0, 0, 0); // Mirar siempre al centro del sistema
 
    renderer.render(scene, camera);
 }
 animate();

} catch (error) {
    console.error("Error en el sistema solar:", error);
    console.error("Stack trace:", error.stack);
}
