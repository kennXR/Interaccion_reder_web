console.log("Tarea: Amanecer a Atardecer");
console.log(gsap);

window.addEventListener("mousedown", function(){

    // Sol recorriendo el cielo con ease suave
    gsap.fromTo(".sol", 
        { 
            x: -120, 
            y: 400, 
            backgroundColor: "#ff4500" // Amanecer
        },
        { 
            duration: 12,
            ease: "power2.inOut",  // suaviza el arco
            keyframes: [
                { x: window.innerWidth * 0.2, y: 200, backgroundColor: "#ffa500", duration: 3 },  // Amanecer
                { x: window.innerWidth * 0.5, y: 80,  backgroundColor: "yellow", duration: 3 },   // Mediodía
                { x: window.innerWidth * 0.8, y: 200, backgroundColor: "#ff8c00", duration: 3 },  // Atardecer
                { x: window.innerWidth + 120, y: 400, backgroundColor: "#ff4500", duration: 3 }   // Desaparece
            ]
        }
    );

    // Cielo en transiciones
    gsap.to(".cielo", {
        duration: 12,
        ease: "none",
        keyframes: [
            { backgroundColor: "#0b0033", duration: 3 },   // Noche
            { backgroundColor: "#87ceeb", duration: 3 },   // Día
            { backgroundColor: "#ff9966", duration: 3 },   // Atardecer
            { backgroundColor: "#0b0033", duration: 3 }    // Vuelve a noche
        ]
    });

    // Pasto
    gsap.to(".pasto", {
        duration: 12,      
        ease: "none",
        keyframes: [
            { backgroundColor: "#003d00", duration: 3 },   // Oscuro al amanecer
            { backgroundColor: "#228B22", duration: 3 },   // Verde brillante al día
            { backgroundColor: "#355e3b", duration: 3 },   // Verde apagado al atardecer
            { backgroundColor: "#001a00", duration: 3 }    // Oscuro en la noche
        ]          
    });
});