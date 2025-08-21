//1 .Obtener referencia en canvas
const canvas = document.getElementById("lienzo");
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

//2. Definir si es 2D o 3D
const ctx = canvas.getContext('2d');

//3.Definir los estilos de la línea más delgada (primera)
ctx.strokeStyle = "#c4aaf3ff"; //Color de la línea
ctx.lineWidth = 2; //Ancho de la línea

//4. Dibujar puntos que hacem la línea
ctx.moveTo(190, 144);
ctx.lineTo(600, 144);

//5.Renderizar la línea
ctx.stroke();

//6. Definir estilos del rectángulo (línea media)
ctx.beginPath(); //Iniciar figura
ctx.strokeStyle = "#e3e1e8ff"; //Color de relleno
ctx.lineWidth = 3; //Ancho de la línea
ctx.fillStyle = "#c6b1fcff"; //Color de relleno

//7. Definir el rectángulo
//ctxt.rect(x, y, width, height);
ctx.rect(450, 10, 300, 600);

//8.Renderizar el rectángulo
ctx.stroke();
ctx.fill();

//9.Sintaxis de una elipse o círsulo (línea media)
ctx.beginPath(); //Iniciar figura
ctx.strokeStyle = "#442a76ff"; //Color de la línea
ctx.fillStyle = "#a287e6ff"; //Color de relleno
ctx.lineWidth = 3; //Ancho de la línea

//10.Defnir la línea
//ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
ctx.ellipse(150, 350, 100, 100, 0, 0, Math.PI * 2); // Ángulo final cambiado para cerrar el elipse

//11.Renderizar la elipse
ctx.fill();
ctx.stroke();



