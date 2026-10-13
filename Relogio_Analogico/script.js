function updateClock() {
    const now = new Date();
    const h = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
    const m = now.getMinutes() * 6;
    const s = now.getSeconds() * 6;

    document.getElementById('hourHand').style.transform = `rotate(${h}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${m}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${s}deg)`;
}

updateClock();
setInterval(updateClock, 1000);