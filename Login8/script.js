gsap.registerPlugin(Draggable);

const root = document.documentElement;
const body = document.body;
const loginForm = document.getElementById("loginForm");

const cordBead = document.querySelector(".cord-bead");
const cordLine = document.querySelector(".cord-line");
const hitArea = document.querySelector(".cord-hit");
const togglePasswordBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

let isOn = false;
const PULL_THRESHOLD = 22;

function playSwitchSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(380, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.045);

        gain.gain.setValueAtTime(0.7, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.045);
    } catch (e) {}
}

function toggleLight() {
    isOn = !isOn;
    playSwitchSound();

    body.setAttribute("data-on", isOn.toString());
    root.style.setProperty("--on", isOn ? "1" : "0");
}

function resetCord() {
    gsap.to(hitArea, {
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1.2, 0.35)",
    });

    gsap.to(cordBead, {
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1.2, 0.35)",
    });

    gsap.to(cordLine, {
        attr: { y2: 185 },
        duration: 0.65,
        ease: "elastic.out(1.2, 0.35)",
    });
}

function animateClickPull() {
    gsap.to([hitArea, cordBead], {
        y: 32,
        duration: 0.14,
        ease: "power2.in",
        onComplete: () => {
            toggleLight();
            resetCord();
        },
    });

    gsap.to(cordLine, {
        attr: { y2: 185 + 32 },
        duration: 0.14,
        ease: "power2.in",
    });
}

Draggable.create(hitArea, {
    type: "y",
    bounds: {
        minY: 0,
        maxY: 55,
    },

    onDrag() {
        gsap.set(cordBead, {
            y: this.y,
        });

        gsap.set(cordLine, {
            attr: {
                y2: 185 + this.y,
            },
        });
    },

    onRelease() {
        if (this.y >= PULL_THRESHOLD) {
            toggleLight();
        }
        resetCord();
    },

    onClick() {
        animateClickPull();
    },
});

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
        const isPassword = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPassword ? "text" : "password");

        const icon = togglePasswordBtn.querySelector("i");
        if (icon) {
            icon.className = isPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = loginForm.querySelector(".btn-submit");
        if (submitBtn) {
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Acesso Permitido!</span>';
            submitBtn.style.background = "#10b981";
            submitBtn.style.color = "#ffffff";

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = "";
                submitBtn.style.color = "";
            }, 2500);
        }
    });
}