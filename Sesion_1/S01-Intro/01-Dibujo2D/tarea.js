const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Colores
const colorRect = "#c0b989ff";
const colorLinea = "#2e3129ff";
const colorCirculo = "#d1461fff";

// Rectángulo principal
const anchoRect = 550;
const altoRect = 700;
const xRect = canvas.width / 2 - anchoRect / 2;
const yRect = canvas.height / 2 - altoRect / 2;

// Parámetros de líneas
const espacio = 22;
const angulo = Math.PI / 6;
const grosorInicial = 1;
const incrementoGrosor = 0.4;
const tanA = Math.tan(angulo);
const dx = altoRect * tanA;

function dibujarRectangulo() {
  ctx.beginPath();
  ctx.strokeStyle = colorRect;
  ctx.lineWidth = 3;
  ctx.fillStyle = colorRect;
  ctx.rect(xRect, yRect, anchoRect, altoRect);
  ctx.stroke();
  ctx.fill();
}

function dibujarLineas() {
  ctx.save();
  ctx.beginPath();
  ctx.rect(xRect, yRect, anchoRect, altoRect);
  ctx.clip();

  let contador = 0;
  for (let i = -altoRect; i < anchoRect + altoRect; i += espacio) {
    const xTop = xRect + i;
    const xBottom = xTop + dx;
    const lw = grosorInicial + contador * incrementoGrosor;

    ctx.beginPath();
    ctx.strokeStyle = colorLinea;
    ctx.lineCap = "square";
    ctx.lineWidth = lw;
    ctx.moveTo(xTop, yRect);
    ctx.lineTo(xBottom, yRect + altoRect);
    ctx.stroke();

    contador++;
  }
  ctx.restore();
}

function dibujarCirculoRecortado() {
  ctx.save();

  // Recorte diagonal alineado al patrón
  ctx.beginPath();
  ctx.moveTo(xRect, yRect + altoRect * 0.75); 
  ctx.lineTo(xRect + anchoRect, yRect + altoRect * 0.45); 
  ctx.lineTo(xRect + anchoRect, yRect + altoRect);
  ctx.lineTo(xRect, yRect + altoRect);
  ctx.closePath();
  ctx.clip();

  // Círculo
  const radioCirculo = anchoRect * 1.1;
  const xCirculo = xRect + anchoRect * 1.18;
  const yCirculo = yRect + altoRect * 1.36;

  ctx.beginPath();
  ctx.fillStyle = colorCirculo;
  ctx.ellipse(xCirculo, yCirculo, radioCirculo, radioCirculo, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.restore();
}

// Dibujo final
dibujarRectangulo();
dibujarLineas();
dibujarCirculoRecortado();