
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
ctx.strokeStyle = "green";
ctx.lineWidth = 4;

//ctx.ellipse(x, y, radiousX, radiousY, rotation, startAngle, endAngle)
ctx.ellipse(100, 100, 60, 60, 0, 0, 2 * Math.PI);
ctx.stroke();

//5. Agrupar en una función
// son parametros para dibujar circulos en diferentes posiciones
// sin repetir todo el código
function dibujarCirculo(x,y){
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.ellipse(x, y, 60, 60, 0, 0, 2 * Math.PI);
    ctx.stroke();
}

dibujarCirculo(200, 100);//Para que dibuje la funcion y esté más al lado
dibujarCirculo(300, 100);
dibujarCirculo(400, 100);

const circulo = {
    colorLinea: "green",
    grosorLinea: 20,
    radio:100,
    rotacion:0,
    anguloInicial:0,
    anguloFinal:2*Math.PI,
    x:50,
    y:400,
    dibujar: function(x,y){
        ctx.beginPath();
        ctx.strokeStyle = circulo.colorLinea;
        ctx.lineWidth = circulo.grosorLinea;
        ctx.ellipse(x, y, circulo.radio, circulo.radio, circulo.rotacion, circulo.anguloInicial, circulo.anguloFinal);
        ctx.stroke();
    }

}

circulo.dibujar(500, 500);

//Crear evento 
window.addEventListener("mousedown", function(eventData){
    console.log(eventData);
    circulo.dibujar(eventData.clientX, eventData.clientY);
});