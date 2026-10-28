const palette = document.querySelector("#palette");
const message = document.querySelector("#message");

function randomColor() {
    const digits = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += digits[Math.floor(Math.random() * 16)
        ];
    }

    return color;
}

function generatePalette() {
    palette.innerHTML = "";
    message.textContent = "";

    for (let i = 0; i < 5; i++) {
        const color = randomColor();

        const card = document.createElement("div");
        card.className = "color-card";

        const swatch = document.createElement("button");
        swatch.className = "swatch";
        swatch.style.backgroundColor = color;
        swatch.style.border = "none";
        swatch.setAttribute("aria-label", "Copy color" + color);
        swatch.title = "Click to copy " + color;

        swatch.addEventListener("click", () => copyColor(color));

        const hex = document.createElement("span");
        hex.className = "hex";
        hex.textContent = color;
        hex.title = "Click to copy " + color;
        hex.addEventListener("click", () => copyColor(color));

        card.appendChild(swatch);
        card.appendChild(hex);
        palette.appendChild(card);
    }
}

async function copyColor(color) {
    try {
        await navigator.clipboard.writeText(color);
        message.textContent = color + " copied!";
    } catch (error) {
        message.textContent = "Your HEX code is " + color + " - copy it manually.";
    }
}

generatePalette();