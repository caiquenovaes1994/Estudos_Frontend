const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggle");
const icon = toggle.querySelector("use");
const links = document.querySelectorAll(".sidebar a:not(.logo)");

toggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    icon.setAttribute("href", open ? "#close" : "#menu");
    toggle.setAttribute("aria-expanded", open);
});

links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        links.forEach((l) => l.classList.remove("on"));
        link.classList.add("on");
    });
});