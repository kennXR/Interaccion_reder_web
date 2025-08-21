console.log('Ejercicio 02, render Imagen 2D');

const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width, canvas.height);


function drawSunIcon() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const circleRadius = 50;
    const lineLength = 80;
    

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 6;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    const angles = [0, 45, 90, 135, 180, 225, 270, 315]; 
    
    angles.forEach(angle => {
        const radian = (angle * Math.PI) / 180;
        const startX = centerX + (circleRadius + 10) * Math.cos(radian);
        const startY = centerY + (circleRadius + 10) * Math.sin(radian);
        const endX = centerX + (circleRadius + lineLength) * Math.cos(radian);
        const endY = centerY + (circleRadius + lineLength) * Math.sin(radian);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    });
}

drawSunIcon();