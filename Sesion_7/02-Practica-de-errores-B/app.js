/* Práctica 02. */
console.log('02. Práctica de errores B.');

// "Debuggeando el rebote"
// 🧩 Hay errores de tipo, sintaxis, referencia y lógica.

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Propiedades de la pelota
let ball = {
    x: 100,
    y: 100,
    radius: 30,
    color: "tomato",
    speedX: 15,
    speedY: 15
};

// Función para dibujar la pelota
function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Función para actualizar la posición
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimiento de la pelota
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote en los bordes
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX *= -1;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY *= -1;
    }

    drawBall();
    requestAnimationFrame(update);
}

// Ejecutar animación
update();

/*
- Se corrigieron las asignaciones del tamaño del canvas: width/height con '='.
- Se agregó el elemento <canvas id="canvas"></canvas> en el HTML para evitar null en getContext.
- Se corrigieron los typos de la API de Canvas: beginPath(), fillStyle.
- Se corrigió requestAnimationFrame (antes estaba en minúsculas).
- Se ajustó la lógica de rebote para considerar el radio de la pelota y verificar ambos ejes por separado.
*/