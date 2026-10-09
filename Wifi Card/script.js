const img = document.querySelector('img');
const ssid = document.querySelector('.ssid');
const password = document.querySelector('.password');
const button = document.querySelector('button');
const qrContainer = document.querySelector('.qr-container');

function update() {
    const wifi = `WIFI:T:WPA;S:${ssid.value};P:${password.value};;`;
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${encodeURIComponent(wifi)}`;

    qrContainer.style.transform = 'scale(0.92)';
    setTimeout(() => {
        qrContainer.style.transform = 'scale(1)';
    }, 150);
}

ssid.addEventListener('input', update);
password.addEventListener('input', update);

button.addEventListener('click', () => {
    window.print();
});

update();