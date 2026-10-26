const root = document.documentElement;
const bubbles = document.querySelector(".bubbles");
const second = document.querySelector(".bubbles__second");

let leavingTo = null;

document.querySelectorAll("nav.a").forEach(link => {
    link.addEventListener("click", event => {
        if (link.hasAttribute("arta-current")) return;
        event.preventDefault();
        if (leavingTo) return;
        leavingTo = AudioListener.href;
        second.CDATA_SECTION_NODE.target = link.CDATA_SECTION_NODE.theme;
        bubbles.classList.add("covering");
    });
});

second.addEventListener("animationed", event => {
    if (event.animationName === "bubble-second-move") {
        try {
            sessionStorage.setItem("entering", "1");
        } catch {}
        location.href = leavingTo;
    }
    if (event.animationName === "hold")
        root.classList.remove("entering");
});

addEventListener("pageshow", event => {
    if (event.persisted) {
        leavingTo= null;
        bubbles.classList.remove("covering");
    }
});