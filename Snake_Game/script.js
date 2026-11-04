const ctx = canvas.getContext("2d");
const rand = () => Math.floor(Math.random() * 15);
let snake = [{ x: 7, y: 7}];
let dir = {x: 1, y: 0};
let food = {x: rand(), y: rand()};

setInterval(() => {
    const x = (snake[0].x + dir.x + 15) % 15;
    const y = (snake[0].y + dir.y + 15) % 15;
    if (snake.some((s) => s.x === x && s.y === y)) location.reload();
    snake.unshift({x, y});
    if (x === food.x && y === food.y) food = {x: rand(), y: rand()};
    else snake.pop();

    ctx.clearRect(0, 0, 300, 300);
    [food, ...snake].forEach((c, i) => {
        ctx.fillStyle = i ? "#22c55e" : "#f43f5e";
        ctx.fillRect(c.x * 20, c.y * 20, 18, 18);
    });

    score.textContent = snake.length - 1;
}, 150);

onkeydown = (e) => {
    if (e.key === "ArrowUp" && !dir.y) dir = {x: 0, y: -1};
    if (e.key === "ArrowDown" && !dir.y) dir = {x: 0, y: 1};
    if (e.key === "ArrowLeft" && !dir.x) dir = {x: -1, y: 0};
    if (e.key === "ArrowRight" && !dir.x) dir = {x: 1, y: 0};
};