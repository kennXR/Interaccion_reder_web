import * as THREE from 'three'
import gsap from 'gsap';

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

escene.add(objeto);

/**
 * Interacciones (Hover)
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let objetoEncima = false;
let colorClickActivo = false; // Mantener rosa tras click hasta otro click o salir del mesh

// Actualiza las coordenadas del mouse normalizadas
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / size.width) * 2 - 1;
    mouse.y = -(event.clientY / size.height) * 2 + 1;
});

// Asegura el reinicio cuando el puntero sale por completo del canvas
lienzo.addEventListener('mouseleave', () => {
    if (objetoEncima) {
        objetoEncima = false;
        lienzo.style.cursor = 'default';
        console.log('Mouse sale del canvas: restablecer escala');
        gsap.to(objeto.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    }
    // Al salir del canvas, considerar fuera del mesh: azul y desactivar click
    colorClickActivo = false;
});

// Si el mouse vuelve a entrar: borrar click; el bucle decidirá color
lienzo.addEventListener('mouseenter', (event) => {
    colorClickActivo = false;
    // No seteamos color aquí para evitar conflictos; el bucle lo hará
});

// Click global: manejar dentro/fuera del canvas en un solo listener
window.addEventListener('click', (event) => {
    const dentroDeCanvas = lienzo.contains(event.target);
    if (dentroDeCanvas) {
        const rect = lienzo.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hit = raycaster.intersectObject(objeto);
        if (hit.length > 0) {
            // Alternar estado de click persistente (rosa)
            colorClickActivo = !colorClickActivo;
            // El color lo establece el bucle según este flag
            console.log(colorClickActivo ? 'Click sobre mesh: activar rosa' : 'Click sobre mesh: desactivar rosa');
        }
    } else {
        // Click fuera del canvas: desactivar estado de click; el bucle pondrá el color
        colorClickActivo = false;
        console.log('Click fuera del canvas: desactivar rosa y aplicar color por estado');
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

    // Animar objetos
    objeto.position.y = Math.sin(tiempoTranscurrido * 2) * 0.1;

    // Raycast para detectar hover
    raycaster.setFromCamera(mouse, camera);
    const intersecciones = raycaster.intersectObject(objeto);

    if (intersecciones.length > 0 && !objetoEncima) {
        objetoEncima = true;
        lienzo.style.cursor = 'pointer';
        console.log('Mouse entra: hover sobre el mesh');
        gsap.to(objeto.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    } else if (intersecciones.length === 0 && objetoEncima) {
        objetoEncima = false;
        lienzo.style.cursor = 'default';
        console.log('Mouse sale: hover fuera del mesh');
        gsap.to(objeto.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    }

    // Colores:
    // - Si hay click activo y el mouse está sobre el mesh: rosa
    // - Si NO hay click activo y está sobre el mesh: naranja
    // - Si está fuera del mesh: azul
    if (intersecciones.length > 0) {
        if (colorClickActivo) {
            objeto.material.color.set('#ff66cc');
        } else {
            objeto.material.color.set('#ff6600');
        }
    } else {
        // Al salir del mesh, el color click deja de aplicarse pero mantenemos el flag
        // en falso por claridad de estado.
        colorClickActivo = false;
        objeto.material.color.set('#0066ff');
    }

    // Renderizar
    renderer.render(escene, camera);

    // Volver a llamar tick en el siguiente cuadro
    window.requestAnimationFrame(bucle);
}

bucle();