const card = document.querySelector(".card"),
navButtons = document.querySelectorAll(".card-nav button");

const selectView = view => {
    for (let button of navButtons) {
        button.classList.remove("active");

        if (button.classList.contains(view)) {
            button.classList.add("active");
        }
    }

    if (view === 'signin') {
        card.style.setProperty("--forms", "0");
        card.style.setProperty("--hero", "0");
        card.style.setProperty("--active", "33.33%");
    } else {
        card.style.setProperty("--forms", "-100%");
        card.style.setProperty("--hero", "-100%");
        card.style.setProperty("--active", "66.66%");
    }
};

let resizeTimer;

window.addEventListener("resize", () => {
    card.classList.add("resizing");
    
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => card.classList.remove("resizing"), 150);
});

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPass = input.type === "password";
    input.type = isPass ? "text" : "password";
    const icon = btn.querySelector("i");
    if (icon) {
        icon.className = isPass ? "ai-eye-open" : "ai-eye-closed";
    }
}