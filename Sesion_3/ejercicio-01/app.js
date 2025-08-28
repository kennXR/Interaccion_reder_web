
console.log("Sesion 3 - Ejercicio 01");

// 1.Referencia a <canvas>
const canvas = document.getElementById("lienzo");
console.log(canvas);

// 2.Definir contexto
const ctx = canvas.getContext("2d");
console.log(ctx);

//3. Definir resolución
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//4. Instrucciones para dibujar un circulo

ctx.beginPath();
ctx.strokeStyle = "yellow";
ctx.lineWidth = 4;

//ctx.ellipse(x, y, radiousX, radiousY, rotation, startAngle, endAngle)
ctx.ellipse(100, 100, 60, 60, 0, 0, 2 * Math.PI);
ctx.stroke();

//5. Agrupar en una función
// son parametros para dibujar circulos en diferentes posiciones
// sin repetir todo el código
function dibujarCirculo(x,y){
    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.ellipse(x, y, 60, 60, 0, 0, 2 * Math.PI);
    ctx.stroke();
}

dibujarCirculo(200, 100);//Para que dibuje la funcion y esté más al lado
dibujarCirculo(300, 100);
dibujarCirculo(400, 100);

//6. Escuchar los movimientos del mouse
window.addEventListener("mousemove", function(eventData) {
    dibujarCirculo(eventData.x, eventData.y);
});