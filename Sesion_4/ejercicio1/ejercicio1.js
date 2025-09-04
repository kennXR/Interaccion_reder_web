console.log("Sesion 4. Ejercicio01: Configuración de Escena 3D");
console.log(THREE);

// 1. Definir nuestro canvas
const canvas = document.getElementById("lienzo")
//const ctx = canvas.getContext("webgl")

// 2.Definir variables del tamaño de la ventana
var width = window.innerWidth;
var height = window.innerHeight;
console.log(canvas);

canvas.width = width;
canvas.height = height;

// 4. Código para configurar una escena

const renderer = new THREE.WebGLRenderer({canvas: canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({color: "000000", wireframe: true})
    
);



// Agregar nuestro objeto a la escena

scene.add(mesh);

//mover nuestro mesh en la escena
mesh.position.z = -5;

// Renderizar lo que esta viendo nuestra camara
renderer.render(scene, camera);




