const degree = 6;
const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");

setInterval(() => {
    const day = new Date();
    const hh = day.getHours() * 30;
    const mm = day.getMinutes() * degree;
    const ss = day.getSeconds() * degree;

    hr.style.transform = `rotate(${hh + mm/12}deg)`;
    mn.style.transform = `rotate(${mm}deg)`;
    sc.style.transform = `rotate(${ss}deg)`;
}, 1000);