const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width, canvas.height);

ctx.lineWidth = 2;
ctx.strokeStyle = "#000000";

ctx

