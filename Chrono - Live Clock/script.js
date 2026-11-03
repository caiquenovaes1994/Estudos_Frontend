const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const hand = document.querySelector("#hand");

let use24 = true;

const pad = (value) => {
    return String(value).padStart(2, "0");
};

function tick() {
const now = new Date();
let hours = now.getHours();

    if (!use24) {
    hours = hours % 12 || 12;
    }

hoursEl.textContent = pad(hours);
minutesEl.textContent = pad(now.getMinutes());
secondsEl.textContent = pad(now.getSeconds());

const sweep = now.getSeconds() + now.getMilliseconds() / 1000;
const angle = sweep * 6;
hand.style.transform = `rotate(${angle}deg)`;

requestAnimationFrame(tick);
}

tick();

const dateEl = document.querySelector("#date");
const zoneEl = document.querySelector("#zone");
const dateFormat = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

dateEl.textContent = dateFormat.format(new Date());
zoneEl.textContent = zone.replaceAll("/", " ");

const modeBtn = document.querySelector("#modeBtn");
modeBtn.addEventListener("click", () => {
    use24 = !use24;
    modeBtn.textContent = use24 ? "24H MODE" : "12H MODE";
    modeBtn.setAttribute("aria-pressed", String(!use24));
});