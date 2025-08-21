//Ejercicio rectánfulo

const canvas = document.getElementById("lienzo");
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const ctx = canvas.getContext('2d');

ctx.beginPath();

ctx.strokeStyle = "#fffbf8ff"; 
ctx.lineWidth = 3;
ctx.fillStyle = "#e4bcecff"; 

var anchoRec= 150;
var altoRec= 200;
ctx.rect(
    canvas.width / 2 - anchoRec / 2, 
    canvas.height / 2 - altoRec / 2, 
    anchoRec, 
    altoRec);

ctx.stroke();
ctx.fill();

