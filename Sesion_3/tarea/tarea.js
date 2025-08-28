console.log("Tarea");
console.log(gsap);

window.addEventListener("mousedown", function(){
    // Animación del sol
    let tl = gsap.timeline({ease: "circ.Out"});
    
        tl.to(".sol", {
            x: 500,
            y: -200,
            duration: 3,
            backgroundColor: "yellow",
        });

        tl.to(".sol", {
            x: 1100,
            y: 0,
            duration: 3,
            backgroundColor: "#7e8700",
    });


    //Color del pasto
    gsap.to(".pasto", {
        duration: 6,      
        backgroundColor: "#004d04",
        ease: "none"          
    });

    //Color del pasto
    gsap.to(".cielo", {
        duration: 7,      
        backgroundColor: "#005e87",
        ease: "none"          
    });

});