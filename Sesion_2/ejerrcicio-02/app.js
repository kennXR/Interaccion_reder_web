console.log('Ejercicio 02, render Imagen 2D');

//1. Configurar canvas
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//2. Cargar imagen
var imagen = new Image();

//2.1. Especificar cuál es la imagen
var path = './img/ejemplo.png';
imagen.src = path;

//3. Encontrar el evento de carga "load"
imagen.onload = function() {
    console.log('cargó imagen');

    //4. Renderizar imagen
    //ctx.drawImage(img,x,y,w,h);
    ctx.drawImage(imagen,200,50,550,700);
}

