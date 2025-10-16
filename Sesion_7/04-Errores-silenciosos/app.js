/* 04. Errores silenciosos. */
console.log('04. Errores silenciosos.');

// --- CONFIGURACIÓN ---
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 300;

// Pelota
let ball = {
    x: 250,
    y: 50,
    radius: 25,
    color: 'green'
};

// Velocidad y gravedad
let speed = { x: 4, y: 0 };
let gravity = 0.5;
let bounceFactor = 1.0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function updateBall() {
    // Movimiento
    ball.x += speed.x;
    ball.y += speed.y;

    // Gravedad
    speed.y += gravity;

    // Rebote en el piso
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        speed.y *= -bounceFactor;
    }
    // Rebote en el techo
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        speed.y *= -bounceFactor;
    }

    // Rebote en los lados
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        speed.x *= -1;
    }
}

function animate() {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateBall();
    drawBall();
    requestAnimationFrame(animate);
}

animate();

/*
Correcciones realizadas:
- Se cambió el selector del canvas a getElementById('lienzo') para evitar null.
- Se separaron colisiones de piso y techo, ajustando posición y velocidad.
- Se corrigió el rebote lateral para no acelerar (factor -1 en lugar de -1.5).
*/

/*
Detalle de la lógica de colisiones:
- Piso y techo por separado:
  - Piso: cuando el borde inferior de la pelota (y + radius) supera la altura
    del canvas, se corrige la posición a (canvas.height - radius) y se invierte
    la velocidad vertical con amortiguación: speed.y *= -bounceFactor.
  - Techo: cuando el borde superior (y - radius) es menor que 0, se fija la
    posición en y = radius y también se invierte speed.y con el mismo factor.
  - Separarlas evita que una condición única mezcle casos y deje la pelota
    dentro del límite o “vibrando”.

- Corrección de posición (snap) antes de invertir velocidad:
  - Ubicar exactamente el centro en el borde impide que la pelota permanezca
    parcialmente dentro del muro por inercia y gravedad, estabilizando el rebote.

- Factor de rebote (bounceFactor):
  - < 1 amortigua (pierde energía), = 1 rebote elástico, > 1 añade energía
    (generalmente no deseado). Se aplica igual para piso y techo por coherencia.

- Colisiones laterales usando el radio:
  - Condición: (x + radius > canvas.width) || (x - radius < 0).
  - Inversión de velocidad horizontal: speed.x *= -1 para conservar magnitud
    y solo cambiar dirección (evitamos acelerar con -1.5).
*/