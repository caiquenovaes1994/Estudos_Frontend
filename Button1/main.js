const selectors = document.querySelectorAll(".selector");

selectors.forEach((selector) => {
    const knob = selector.querySelector(".knob");
    const radios = selector.querySelectorAll('input[type="radio"]');
    const glowRing = selector.querySelector(".glow-ring");

    const angles = {
        "back": 300,
        "home": 0,
        "search": 60,
        "star": 120,
        "more": 180,
        "refresh": 240
    };

    let currentAngle = 120;

    function setAngle(targetAngle) {
        let diff = (targetAngle - (currentAngle % 360) + 540) % 360 - 180;
        currentAngle += diff;
        selector.style.setProperty("--angle", `${currentAngle}deg`);
        if (glowRing) {
            glowRing.style.background = `conic-gradient(from ${currentAngle - 65}deg, transparent 0deg, rgba(235, 60, 130, 0.18) 35deg, rgba(255, 95, 50, 0.32) 65deg, transparent 95deg)`;
        }
    }

    radios.forEach((radio) => {
        if (radio.checked) {
            const val = radio.value;
            if (angles[val] !== undefined) {
                currentAngle = angles[val];
                setAngle(currentAngle);
            }
        }

        radio.addEventListener("change", () => {
            if (radio.checked) {
                const val = radio.value;
                if (angles[val] !== undefined) {
                    setAngle(angles[val]);
                }
            }
        });
    });

    if (knob) {
        knob.addEventListener("click", () => {
            const radioList = Array.from(radios);
            const currentIndex = radioList.findIndex((r) => r.checked);
            const nextIndex = (currentIndex + 1) % radioList.length;
            radioList[nextIndex].checked = true;
            radioList[nextIndex].dispatchEvent(new Event("change"));
        });
    }
});