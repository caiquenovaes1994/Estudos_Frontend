const characters = ["Bowser", "Bowser Jr.", "Captain Falcon", "Daisy", "Donkey Kong", "Falco", "Fox", "Ganondorf", "Ice Climbers", "Jigglypuff", "Kazuya", "Kirby", "Link", "Luigi", "Mario", "Mewtwo", "Ness", "Peach", "Pikachu", "Roy", "Samus", "Sheik", "Sonic", "Terry", "Villager", "Yoshi", "Zelda"];

const dropdown = document.querySelector("#dropdown"),
    input = document.querySelector("#input"),
    menu = document.querySelector("#menu"),
    clearButton = document.querySelector(".clear-btn");

let currentFocusIndex = -1;
let menuItems = [];

const hasValue = () => input.value.length > 0;

const toggleMenu = (
    forceOpen = null,
    {browse = false} = {},
) => {
    const nextOpen =
    forceOpen !== null
    ? forceOpen
    : !dropdown.classList.contains("open");
    const open = nextOpen && (browse || hasValue());

    dropdown.classList.toggle("open", open);

    if (open) {
        currentFocusIndex = -1;
        input.setAttribute("aria-expanded", "true");
        if (!menu.children.length && hasValue()) {
            renderMenuItems(input.value);
        }
    } else {
        input.setAttribute("aria-expanded", "false");
        menu.innerHTML = "";
    }
};

const oninput = (e) => {
    const { value } = e.target;
    input.classList.toggle("has-value", value.length);
    currentFocusIndex = -1;

    if (value.length) renderMenuItems(value);

    toggleMenu(hasValue());
};

const updateMenuFocus = () => {
    menuItems.forEach((item, index) => {
        if (index === currentFocusIndex) {
            item.classList.add("focused");
            item.setAttribute("aria-selected", "true");
        } else {
            item.classList.remove("focused");
            item.setAttribute("aria-selected", "false");
        }
    });
};

const selectItem = (button) => {
    input.value = button.textContent;
    input.classList.add("has-value");
    input.focus();
    toggleMenu(false);
};

const onMenuItemClick = (e) => {
    e.preventDefault();
    selectItem(e.target);
};

const renderMenuItems = (keyword) => {
    const filteredCharacters = characters.filter((c) => !keyword.length ? true : c.toLowerCase().includes(keyword.toLowerCase()));

    filteredCharacters.sort();
    let items = "";

    if (filteredCharacters.length) {
        for (let character of filteredCharacters) {
            items += `<button type="button" role="option" aria-selected="false" tabindex="-1">${character}</button>`;
        }
    } else {
        items = "<p role='status'>No characters found</p>";
    }

    menu.innerHTML = items;

    menuItems = Array.from(menu.querySelectorAll("button"));

    menuItems.forEach((button) => {
        button.addEventListener("click", onMenuItemClick);
        button.addEventListener("mouseenter", () => {
            currentFocusIndex = menuItems.indexOf(button);
            updateMenuFocus();
        });
    });
};

const onDocumentClick = (e) => {
    if (!dropdown.contains(e.target)) {
        toggleMenu(false);
    }
};

clearButton.addEventListener("click", () => {
    input.value = "";
    input.classList.remove("has-value");
    toggleMenu(false);
    input.focus();
});

input.addEventListener("keydown", (e) => {
    if (!dropdown.classList.contains("open") && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        if (hasValue()) {
            toggleMenu(true);
            return;
        }
    }

    if (!menuItems.length) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentFocusIndex = (currentFocusIndex + 1) % menuItems.length;
        updateMenuFocus();
        menuItems[currentFocusIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        currentFocusIndex = (currentFocusIndex - 1 + menuItems.length) % menuItems.length;
        updateMenuFocus();
        menuItems[currentFocusIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
        if (currentFocusIndex >= 0 && menuItems[currentFocusIndex]) {
            e.preventDefault();
            selectItem(menuItems[currentFocusIndex]);
        }
    } else if (e.key === "Escape") {
        toggleMenu(false);
    }
});

input.addEventListener("focus", () => toggleMenu(true));
input.addEventListener("input", oninput);
document.addEventListener("click", onDocumentClick);

if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
}