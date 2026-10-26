const card = document.querySelector('.card');
const input = document.querySelector('.input');
const line2 = document.querySelector('.line2');

document.querySelector('.form').addEventListener('submit', (e) => {
    input.blur();
    card.classList.add('saving');
    e.preventDefault();
});

line2.addEventListener('animationend', function (e) {
    setTimeout(() => {
        card.classList.add('done');
    }, 1000);
});