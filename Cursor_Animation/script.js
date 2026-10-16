const cursor = document.querySelector('.cursor');
let x = innerWidth / 2;
let y = innerHeight / 2;

let cx = x;
let cy = y;


document.addEventListener("mousemove", (e) => {
    x = e.pageX;
    y = e.pageY;

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.color = `hsl(${280 + Math.random() * 60} 100% 65%)`;
    dot.style.setProperty('--dx', (Math.random() - 0.5) * 80 + 'px');
    dot.style.setProperty('--dy', (Math.random() - 0.5) * 80 + 'px');
    document.body.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());

});

function follow() {
    cx += (x - cx) * 0.15;
    cy += (y - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(follow);
}

follow();