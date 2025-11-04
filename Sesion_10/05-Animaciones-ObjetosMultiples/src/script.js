import * as THREE from 'three'
import gsap from 'gsap';
console.log(gsa

/**
 * Base
 */

// Lienzo (Canvas)
const lienzo = document.querySelector('canvas.webgl');

// Escena
const escene = new THREE.Scene();

/**
 * Tamaños
 */
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Objetos
 */
const objeto = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 8, 8),
	new THREE.MeshBasicMaterial({ color: '#ff6600', wireframe: true })
);

// Segundo mesh
const objeto2 = new THREE.Mesh(
	new THREE.BoxGeometry(0.7, 0.7, 0.7),
	new THREE.MeshBasicMaterial({ color: '#00cc99', wireframe: true })
);
objeto.position.x = -1.0;
objeto2.position.x = 1.0;

escene.add(objeto);
escene.add(objeto2);

// Lista de objetos interactuables
const objetos = [objeto, objeto2];

/**
 * Interacciones (Hover)
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let meshHoverActual = null;
let colorClickActivo = false; // Solo aplica al círculo (objeto)
let colorClickActivoCubo = false; // Solo aplica al cubo (objeto2)

// Actualiza las coordenadas del mouse normalizadas
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / size.width) * 2 - 1;
    mouse.y = -(event.clientY / size.height) * 2 + 1;
});

// Asegura el reinicio cuando el puntero sale por completo del canvas
lienzo.addEventListener('mouseleave', () => {
	if (meshHoverActual) {
		gsap.to(meshHoverActual.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
		meshHoverActual = null;
	}
	lienzo.style.cursor = 'default';
	colorClickActivo = false;
	colorClickActivoCubo = false;
});

// Si el mouse vuelve a entrar: borrar click; el bucle decidirá color
lienzo.addEventListener('mouseenter', (event) => {
    colorClickActivo = false;
    // No seteamos color aquí para evitar conflictos; el bucle lo hará
});

// Click global: manejar dentro/fuera del canvas en un solo listener
window.addEventListener('click', (event) => {
	const dentroDeCanvas = lienzo.contains(event.target);
	if (!dentroDeCanvas) return;

	const rect = lienzo.getBoundingClientRect();
	mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
	mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	const hits = raycaster.intersectObjects(objetos);
	if (hits.length > 0) {
		const target = hits[0].object;
		// Rotar solo el mesh clicado
		gsap.to(target.rotation, { y: target.rotation.y + Math.PI * 4, duration: 1.2, ease: 'power2.inOut', overwrite: 'auto' });

		// Toggle de color solo si clicamos el círculo
		if (target === objeto) {
			colorClickActivo = !colorClickActivo;
		}

		// Toggle de color solo si clicamos el cubo
		if (target === objeto2) {
			colorClickActivoCubo = !colorClickActivoCubo;
		}
	}
});


window.addEventListener('resize', () => {
    // Actualizar tamaños
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    // Actualizar cámara
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    // Actualizar renderizador
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


/**
 * Cámara
 */
// Cámara base
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 3;
escene.add(camera);


/**
 * Renderizador
 */
const renderer = new THREE.WebGLRenderer({
    canvas: lienzo
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


/**
 * Animación
 */
const reloj = new THREE.Clock();

const bucle = () => {
    const tiempoTranscurrido = reloj.getElapsedTime();

    // Animar objetos (suave vaivén)
    objeto.position.y = Math.sin(tiempoTranscurrido * 2) * 0.1;
    objeto2.position.y = Math.sin((tiempoTranscurrido + 0.5) * 2) * 0.1;

    // Raycast para detectar hover sobre cualquiera
    raycaster.setFromCamera(mouse, camera);
    const intersecciones = raycaster.intersectObjects(objetos);

    const nuevoHover = intersecciones.length > 0 ? intersecciones[0].object : null;
    if (nuevoHover !== meshHoverActual) {
    	// Salida del anterior
    	if (meshHoverActual) {
    		gsap.to(meshHoverActual.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    	}
    	// Entrada al nuevo
    	if (nuevoHover) {
    		gsap.to(nuevoHover.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    		lienzo.style.cursor = 'pointer';
    	} else {
    		lienzo.style.cursor = 'default';
    	}
    	meshHoverActual = nuevoHover;
    }

    // Colores del círculo (objeto) según estado
    const hoverSobreObjeto = meshHoverActual === objeto;
    if (hoverSobreObjeto) {
    	if (colorClickActivo) {
    		objeto.material.color.set('#ff66cc');
    	} else {
    		objeto.material.color.set('#ff6600');
    	}
    } else {
    	colorClickActivo = false;
    	objeto.material.color.set('#0066ff');
    }

    // Colores del cubo (objeto2) con paleta distinta
    const hoverSobreObjeto2 = meshHoverActual === objeto2;
    if (hoverSobreObjeto2) {
    	if (colorClickActivoCubo) {
    		objeto2.material.color.set('#66ffcc'); // cian verdoso al click
    	} else {
    		objeto2.material.color.set('#ffd166'); // amarillo al hover
    	}
    } else {
    	colorClickActivoCubo = false;
    	objeto2.material.color.set('#9933ff'); // morado al estar fuera
    }

    // Renderizar
    renderer.render(escene, camera);

    // Volver a llamar tick en el siguiente cuadro
    window.requestAnimationFrame(bucle);
}

bucle();