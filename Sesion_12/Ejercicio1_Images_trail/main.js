console.log('main.js');

/* 
1.Definir en una constante el espacio mínimo que deseamos entre cada imagen.
2.Crear una variable tipo objeto para guardar la posición de la última imagen creada y poder medir la distancia al mouse.
3. En el evento “mousemove” donde estamos invocando la función para crear imágenes, vamos a definir la condición para crear la imagen:
    - Primero calculamos la distancia en X y Y entre la posición de la última imagen y el mouse actualmente.
    - Si la distancia calculada es mayor a nuestro espacio mínimo, solo entonces creamos la imagen.
    - Finalmente, actualizamos el registro de la posición de la última imagen ya que creamos una nueva.
*/

const minDistance = 70;
var lastPos = {
    x: 0,
    y: 0,
};

// 04. Mostrarlas en ciclo.
/*
    1.Crear una lista con la ubicación de las imágenes a renderizar.
    2.Actualizar nuestra función para que lea un valor de esta lista para renderizar nuestra imagen.
    3.Definir una variable “índice” que nos indique qué imagen debe renderizar nuestra función.
    4.Avanzar 1 posición el valor del índice cada vez que creamos una imagen.
    5.Usar este índice para definir qué valor en la lista queremos leer.
    6.Reiniciar el índice al alcanzar el máximo.

*/
var imagesList = [
    "assets/p1.jpg",
    "assets/p2.jpg",
    "assets/p3.jpg",
    "assets/p4.jpg",
    "assets/p5.jpg",
    "assets/p6.jpg",
];

var index = 0;
// 01. Renderizar 1 imagen.
/* 
    1.Crear etiqueta <img> virtual.
    2.Cargar imagen desde una fuente (src).
    3.Definir su estilo / apariencia (CSS).
        - ancho / alto.
        - posición (x / y).
        - otros: esquinas redondeadas, bordes, sombra proyectada, etc.
    4.Agregarla al <Documento>.
    5.Agrupar estas instrucciones en una función.
*/
function createFloatingImage(posX, posY){
    //console.log(posX, posY);
    const img = document.createElement('img');
    img.src = imagesList[index];
    img.style.width = "227px";
    img.style.height = "150px";
    img.style.top = `${posY- (150/2)}px`;
    img.style.left = posX - (113.5) + "px";
    img.style.position = "absolute";
    img.style.opacity = 0;
    img.style.zIndex = Math.round(Math.random() * 10);
    document.body.appendChild(img);

    gsap.to(img, {
        opacity: 1,
        y: "-60px",
        duration: 1,
        ease: "power3.inOut",
    });

    index = index + 1;
    if (index >= imagesList.length) {
        index = 0;
    }


    
    setTimeout(function() {
        gsap.to(img, {
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            onComplete: function() {
                img.remove();
            }
            
        });
    }, 1000);
    
}




// 02. Renderizar “n” imágenes.

window.addEventListener('mousemove', function (eventData){
    //console.log('mouse is moving');
    //console.log(eventData);
    //Calcular la distancia entre el mouse y la ultima imagen
    //dibujada para evaluar nuestra condición de renderizar o no

    //1.Calcular distancia
    var dx = eventData.clientX - lastPos.x;
    dx = Math.abs(dx);

    var dy = eventData.clientY - lastPos.y;
    dy = Math.abs(dy);

    if (dx >= minDistance || dy >= minDistance) {
        createFloatingImage(eventData.clientX, eventData.clientY);
        lastPos.x = eventData.clientX;
        lastPos.y = eventData.clientY;             
        
        
    }
});
