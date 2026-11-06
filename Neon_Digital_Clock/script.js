const clock = document.querySelector("#clock");
const clockReflection = document.querySelector("#clock-reflection");

// 7-segment display mapping for digits 0 to 9
// Segments: a (top), b (top-right), c (bottom-right), d (bottom), e (bottom-left), f (top-left), g (middle)
const digitMap = [
    'abcdef',   // 0
    'bc',       // 1
    'abdeg',    // 2
    'abcdg',    // 3
    'bcfg',     // 4
    'acdfg',    // 5
    'acdefg',   // 6
    'abc',      // 7
    'abcdefg',  // 8
    'abcdfg'    // 9
];

const segmentsList = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function buildClockHTML(timeStr) {
    let html = '';
    for (let i = 0; i < timeStr.length; i++) {
        // Colons after HH (i = 2) and after MM (i = 4)
        if (i === 2 || i === 4) {
            html += `
                <div class="separator" aria-hidden="true">
                    <span class="dot on dot-top"></span>
                    <span class="dot on dot-bottom"></span>
                </div>
            `;
        }

        const digitChar = timeStr[i];
        const activeSegments = digitMap[Number(digitChar)] || '';

        const segsHTML = segmentsList.map(seg => {
            const isOn = activeSegments.includes(seg);
            return `<i class="seg ${seg} ${isOn ? 'on' : ''}"></i>`;
        }).join('');

        html += `<div class="digit" data-digit="${digitChar}">${segsHTML}</div>`;
    }
    return html;
}

function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}${minutes}${seconds}`;

    const clockHTML = buildClockHTML(timeStr);
    if (clock) {
        clock.innerHTML = clockHTML;
    }
    if (clockReflection) {
        clockReflection.innerHTML = clockHTML;
    }
}

update();
setInterval(update, 1000);