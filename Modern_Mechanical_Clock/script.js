const markersContainer = document.querySelector('.markers');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

for (let i = 0; i < 60; i++) {
    const marker = document.createElement('span');
    marker.className = 'marker';

    if (i % 5 === 0) {
        marker.classList.add('major');
    }
    if (i % 15 === 0) {
        marker.classList.add('cardinal');
    }

    marker.style.setProperty('--i', i);
    markersContainer.appendChild(marker);
}

function update() {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    hour.style.rotate = `${hours * 30}deg`;
    minute.style.rotate = `${minutes * 6}deg`;
    second.style.rotate = `${seconds * 6}deg`;

    requestAnimationFrame(update);
}

update();
