console.log("Sesion 5. Ejercicio03: MapCaps");
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
const material = new THREE.MeshNormalMaterial({
    flatShading: true
});

/////Materiales

///////////CONFIGURACIÖN DE MATCAPS///////////
// Ayuda.
// Material.
const textureLoader = new THREE.TextureLoader();
var matcapmaterial;
var mesh;
var matcapMap = textureLoader.load(
   // Textura URL
   './texturas/matcap1.png',
   // on Load callback
   function (texture) {
       matcapmaterial = new THREE.MeshMatcapMaterial( { matcap: texture } );
       // Mesh.
       mesh = new THREE.Mesh( geometry, matcapmaterial );
       // 3. Poner objeto en la escena.
       scene.add(mesh);
       mesh.position.z = -8;
       // 4. Activar animación.
       animate();
   },
   // on Progress (no funciona por ahora)
   undefined,
   // on Error callback
   function (error) { console.error("Algo salio mal con la textura,", error); }
);





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
 //animate();




