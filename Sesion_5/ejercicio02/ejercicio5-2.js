console.log("Sesion 5. Ejercicio02: Materiales 3D");
console.log("THREE: ", THREE);

// 1. Definir nuestro canvas
const canvas = document.getElementById("lienzo")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 4. Creamos nuestros elementos básicos
// Escena, escenario, Mesh, Camras
//escena
const scene = new THREE.Scene();

//camara
const camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 0.1, 1000);

//mesh
/////Geometrias
const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshToonMaterial({
    flatShading: true,
    specular: "#ffffff",
    shininess: 100,
    color: "#ffff00"
});

/////Materiales



const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.z = -4;
mesh.rotation.x = 45;


//Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(canvas.width, canvas.height);

//Dar instrucciones de renderizar o imprimir nuestro primer frame
renderer.render(scene, camera);


// Tip para animar nuestro mesh:
function animate() {
    requestAnimationFrame(animate);
 
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
 
    renderer.render(scene, camera);
 }
 animate();

 // Tip para agregar luces a nuestra escena:
const topLight = new THREE.PointLight("#ffffff", 100, 100);
topLight.position.y = 5;
scene.add(topLight);

const frontLight = new THREE.PointLight("red", 10, 100);
frontLight.position.set(3,9,18);

//x, y, z//

scene.add(frontLight);




