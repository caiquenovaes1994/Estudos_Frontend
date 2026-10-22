const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
let angle = 0;

const count = 650;
const radius = 160;

function resize() {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Particle {
    constructor(index) {
        const y = 1 - (index / (count - 1)) * 2;
        const ring = Math.sqrt(1 - y * y);
        const theta = index * Math.PI * (3 - Math.sqrt(5));

        this.tx = Math.cos(theta) * ring * radius;
        this.ty = y * radius;
        this.tz = Math.sin(theta) * ring * radius;
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = (Math.random() - 0.5) * 600;
    }

    update() {
        this.x += (this.tx - this.x) * 0.018;
        this.y += (this.ty - this.y) * 0.018;
        this.z += (this.tz - this.z) * 0.018;
    }

    draw() {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos - this.z * sin;
        const z = this.z * cos + this.x * sin;
        const perspective = 500 / (500 - z);
        const screenX = width / 2 + x * perspective;
        const screenY = height / 2 + this.y * perspective;
        const size = Math.max(0.5, 2.2 * perspective);
        const alpha = Math.max(0.2, Math.min(1, (z + radius) / (radius * 2)));
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60, 230, 255, ${alpha})`;
        ctx.fill();
    }
}

for (let i = 0; i < count; i++) {
    particles.push(new Particle(i));
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.003;
    for (const particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animate);
}

animate();