const dropdown = document.getElementById("dropdown");
const trigger = document.getElementById("trigger") || dropdown.querySelector(".trigger");
const menu = document.getElementById("menu");
const pages = document.getElementById("pages");

const goTo = (name) => {
    pages.querySelectorAll(".page").forEach((page) => {
        const current = page.dataset.page === name;
        
        page.classList.toggle("is-active", current);
        page.setAttribute("aria-hidden", !current);

        if (current) menu.style.setProperty("--h", `${page.offsetHeight}px`);
    });
};

const setOpen = (open) => {
    dropdown.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", open);
    if (!open) goTo("root");
};

dropdown.addEventListener("click", ({ target }) => {
    const drill = target.closest("[data-open]");
    if (target.closest("#trigger, .trigger")) setOpen(!dropdown.classList.contains("open"));
    else if (drill) goTo(drill.dataset.open);
    else if (target.closest("[data-back]")) goTo("root");
});

document.addEventListener("click", ({ target }) => {
    if (!target.closest(".dropdown")) setOpen(false);
});

goTo("root");