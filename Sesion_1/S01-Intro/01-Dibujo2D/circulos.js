const canvas = document.getElementById("lienzo");
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const ctx = canvas.getContext('2d');



ctx.strokeStyle = "#fffbf8ff"; 
ctx.lineWidth = 3;
ctx.noFill;

const numcirculo = 11;
const offset = 15; //Offset es la distancia entre los círculos
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;
const totalHeight = numcirculo * offset;// altura total del conjunto de elipses
const Y = centroY - totalHeight / 2; // punto inicial para centrar todo


for (let i = 0; i <= numcirculo; i++) { //Empezamos a contar desde 0; i= numero de iteración; iteración=  cantidad de círculos
    //Si, i es igual a 0 e igaul o menor que numcirculo, entonces: se le agragará un offset a la posición del círculo

ctx.beginPath();
ctx.ellipse(
    centroX, 
    Y + i * offset, //Se le agrega un offset a la posición Y del círculo
    100, 
    100, 
    0,
    0,
    Math.PI * 2);

ctx.stroke();

}
ctx.noFill();