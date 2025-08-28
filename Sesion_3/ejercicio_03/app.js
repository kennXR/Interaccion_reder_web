
console.log("Ejercicio 003");
console.log(gsap);


window.addEventListener("mousedown", function(){
    gsap.to(
        ".rectangulo", 
        {
            x:500,
            duration: 5,
            ease: "circ.inOut"
        }
    );
});