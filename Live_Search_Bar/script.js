const search = document.getElementById('search');
const items = document.querySelectorAll('#item-list li');

search.addEventListener('input', () => {
    const query = search.value.toLowerCase().trim();
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});