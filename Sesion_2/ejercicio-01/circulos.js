const canvas = document.getElementById("lienzo");
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const ctx = canvas.getContext('2d');



ctx.strokeStyle = "#fffbf8ff"; 
ctx.lineWidth = 3;


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

// 1.Escuchar que el mouse se mueve

window.addEventListener("mousemove", function (eventData) {
    // console.log('hola X', eventData.x,);
    // console.log('hola Y', eventData.y);
    
    //Limpiar el canvas
    //ctx.clearRect(x,y,width,height)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    //ctx.ellipse(x,y,radiousX,radiousY,rotation,startAngle,endAngle)
    ctx.beginPath();
    ctx.ellipse( eventData.x, eventData.y, 120, 120, 0, 0, Math.PI * 2);
    ctx.stroke();

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

});

//2. Escuchar el mouse presionado

window.addEventListener("mousedown", function (eventData) {
    //console.log("mouse down");

    //1. Actualizar los estilos
    ctx.strokeStyle = "#c0643899";

    //2.Renderizar otra vez las figuras

    //3. Limpiar el canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.ellipse( eventData.x, eventData.y, 120, 120, 0, 0, Math.PI * 2);
    ctx.stroke();

    //4. Renderizar las figuras
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
});

//3. Escuchar el mouse up

window.addEventListener("mouseup", function (eventData) {
    console.log("mouse up");

    //1. Actualizar los estilos
    ctx.strokeStyle = "#ffffff";

    //2.Renderizar otra vez las figuras

    //3. Limpiar el canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.ellipse( eventData.x, eventData.y, 120, 120, 0, 0, Math.PI * 2);
    ctx.stroke();

    //4. Renderizar las figuras
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
});

//1. Crear la referencia par< el botón de html
boton.addEventListener("mousedown", function () {
    console.log("mousedown");
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.rect(50, 100, 300, 50);
    ctx.stroke();
    ctx.fill();
});

//2. Agregar un "even listener" a ese botón

   //2.1. En el event listener