// Seletores e elementos principais
const header = document.querySelector('header');
const profileTrigger = document.getElementById('profile-trigger');
const dropdown = document.getElementById('dropdown');
const nav = document.querySelector('.dropdown nav');

const ROWS = '.menu-item, .accent-item, .sign-out-row';
let active = null;

// Dados dos itens do menu para renderização dinâmica
const menuItems = [
    {
        type: 'profile',
        name: 'Caique Novaes',
        email: 'caique.novaes@exemplo.com',
        avatar: 'avatar.png'
    },
    { type: 'divider' },
    {
        type: 'menu-item',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
               </svg>`,
        label: 'Meu Perfil',
        shortcuts: ['⇧', 'P']
    },
    {
        type: 'menu-item',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
               </svg>`,
        label: 'Configurações',
        shortcuts: ['⌘', ',']
    },
    {
        type: 'menu-item',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M7 16h10"></path>
               </svg>`,
        label: 'Atalhos de Teclado',
        shortcuts: ['⌘', 'K']
    },
    {
        type: 'dark-toggle',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
               </svg>`,
        label: 'Modo Escuro'
    },
    { type: 'divider' },
    {
        type: 'accent-item',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
               </svg>`,
        label: 'Upgrade para PRO',
        badge: '50% OFF'
    },
    { type: 'divider' },
    {
        type: 'sign-out-row',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
               </svg>`,
        label: 'Sair da Conta',
        shortcuts: ['⌥', 'Q']
    }
];

// Renderiza a estrutura interna do dropdown
function renderDropdownContent() {
    nav.innerHTML = '';

    // Placa dinâmica deslizante (Dynamic Plate)
    const plate = document.createElement('div');
    plate.className = 'dm-plate';
    plate.setAttribute('aria-hidden', 'true');
    nav.appendChild(plate);

    // Itens do menu
    menuItems.forEach((item) => {
        if (item.type === 'profile') {
            const profileDiv = document.createElement('div');
            profileDiv.className = 'dropdown-profile';
            profileDiv.innerHTML = `
                <img src="${item.avatar}" alt="${item.name}" class="dropdown-profile_avatar">
                <div class="dropdown-profile_info">
                    <span class="dropdown-profile_name">${item.name}</span>
                    <span class="dropdown-profile_email">${item.email}</span>
                </div>
            `;
            nav.appendChild(profileDiv);
        } else if (item.type === 'divider') {
            const divider = document.createElement('div');
            divider.className = 'dropdown_divider';
            divider.setAttribute('role', 'separator');
            nav.appendChild(divider);
        } else if (item.type === 'menu-item') {
            const btn = document.createElement('button');
            btn.className = 'menu-item';
            btn.setAttribute('role', 'menuitem');
            
            const shortcutsHtml = item.shortcuts
                ? `<span class="menu-item_shortcut">
                    ${item.shortcuts.map(key => `<span class="menu-item_key">${key}</span>`).join('')}
                   </span>`
                : '';

            btn.innerHTML = `
                ${item.icon}
                <span class="menu-item_label">${item.label}</span>
                ${shortcutsHtml}
            `;
            nav.appendChild(btn);
        } else if (item.type === 'dark-toggle') {
            const row = document.createElement('div');
            row.className = 'menu-item';
            row.setAttribute('role', 'menuitem');
            row.innerHTML = `
                ${item.icon}
                <span class="menu-item_label">${item.label}</span>
                <label class="toggle-switch" aria-label="Alternar modo escuro">
                    <input type="checkbox" id="dark-mode-checkbox">
                    <span class="toggle-switch_knob"></span>
                </label>
            `;
            nav.appendChild(row);
        } else if (item.type === 'accent-item') {
            const btn = document.createElement('button');
            btn.className = 'accent-item';
            btn.setAttribute('role', 'menuitem');
            btn.innerHTML = `
                ${item.icon}
                <span class="menu-item_label">${item.label}</span>
                <span class="accent-badge">${item.badge}</span>
            `;
            nav.appendChild(btn);
        } else if (item.type === 'sign-out-row') {
            const btn = document.createElement('button');
            btn.className = 'sign-out-row';
            btn.setAttribute('role', 'menuitem');
            const shortcutsHtml = item.shortcuts
                ? `<span class="menu-item_shortcut">
                    ${item.shortcuts.map(key => `<span class="menu-item_key">${key}</span>`).join('')}
                   </span>`
                : '';
            btn.innerHTML = `
                ${item.icon}
                <span class="menu-item_label">${item.label}</span>
                ${shortcutsHtml}
            `;
            nav.appendChild(btn);
        }
    });

    initDarkMode();
}

// Lógica de cálculo de deslocamento da placa deslizante
function moveTo(row) {
    if (!row) return;
    const rows = [...nav.querySelectorAll(ROWS)];
    const from = rows.indexOf(active);
    const to = rows.indexOf(row);
    if (to === -1) return;
    
    const steps = from < 0 ? 0 : Math.abs(to - from);
    const delay = Math.min(steps, 4) * 45;
    const plate = nav.querySelector('.dm-plate');
    if (!plate) return;

    plate.style.transform = `translate(${row.offsetLeft}px, ${row.offsetTop}px)`;
    plate.style.width = row.offsetWidth + 'px';
    plate.style.height = row.offsetHeight + 'px';
    plate.classList.add('on');

    active?.classList.remove('is-active');
    row.style.setProperty('--dm-ink-delay', delay + 'ms');
    row.classList.add('is-active');
    active = row;
}

// Oculta a placa ao sair da área de navegação
function resetPlate() {
    const plate = nav.querySelector('.dm-plate');
    if (plate) plate.classList.remove('on');
    active?.classList.remove('is-active');
    active = null;
}

// Eventos de movimento do mouse e foco acessível
nav.addEventListener('pointerover', (e) => {
    const row = e.target.closest(ROWS);
    if (row) moveTo(row);
});

nav.addEventListener('pointerleave', () => {
    resetPlate();
});

nav.addEventListener('focusin', (e) => {
    const row = e.target.closest(ROWS);
    if (row?.matches(':focus-visible')) moveTo(row);
});

// Abertura e fechamento do dropdown
function openDropdown() {
    dropdown.classList.add('is-open');
    profileTrigger.setAttribute('aria-expanded', 'true');
}

function closeDropdown() {
    dropdown.classList.remove('is-open');
    profileTrigger.setAttribute('aria-expanded', 'false');
    resetPlate();
}

profileTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('is-open');
    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
});

// Fechar ao clicar fora
document.addEventListener('pointerdown', (e) => {
    if (!header.contains(e.target)) {
        closeDropdown();
    }
});

// Fechar com a tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
        closeDropdown();
        profileTrigger.focus();
    }
});

// Inicialização do Modo Escuro
function initDarkMode() {
    const toggle = document.getElementById('dark-mode-checkbox');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('nexus_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    if (isDark) {
        document.body.classList.add('dark');
        toggle.checked = true;
    } else {
        document.body.classList.remove('dark');
        toggle.checked = false;
    }

    toggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('nexus_theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('nexus_theme', 'light');
        }
    });
}

// Inicializa tudo ao carregar
renderDropdownContent();