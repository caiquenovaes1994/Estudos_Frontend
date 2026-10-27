const page = document.querySelector(".page");
const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.querySelector("#collapse-btn");
const themeBtn = document.querySelector("#theme-btn");
const searchContainer = document.querySelector(".search");
const searchInput = document.querySelector(".search input");

const setOpen = (open) => {
    sidebar.classList.toggle("open", open);
    collapseBtn.setAttribute("aria-expanded", open);
    collapseBtn.setAttribute("aria-label", open ? "Collapse sidebar" : "Expand sidebar");
};

// Toggle sidebar on collapse button click
collapseBtn.addEventListener("click", () => setOpen(!sidebar.classList.contains("open")));

// Expand sidebar when clicking search box in collapsed mode
searchContainer?.addEventListener("click", () => {
    if (!sidebar.classList.contains("open")) {
        setOpen(true);
        setTimeout(() => searchInput?.focus(), 250);
    }
});

// Toggle dark theme
themeBtn.addEventListener("click", () => {
    const dark = page.classList.toggle("dark");
    themeBtn.setAttribute("aria-pressed", dark);
});

// Initialize icons and initial states
setOpen(sidebar.classList.contains("open"));
lucide.createIcons();