document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const signupBtn = document.querySelector('.show-signup');
    const loginBtn = document.querySelector('.show-login');

    // Flip card to Sign Up
    if (signupBtn && card) {
        signupBtn.addEventListener('click', event => {
            event.preventDefault();
            card.classList.add('signup-mode');
        });
    }

    // Flip card to Login
    if (loginBtn && card) {
        loginBtn.addEventListener('click', event => {
            event.preventDefault();
            card.classList.remove('signup-mode');
        });
    }

    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const box = btn.closest('.password-box');
            const input = box ? box.querySelector('input') : null;
            if (!input) return;

            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');

            const eyeOpen = btn.querySelectorAll('.eye-open');
            const eyeClosed = btn.querySelectorAll('.eye-closed');

            eyeOpen.forEach(el => el.style.display = isPassword ? 'none' : 'block');
            eyeClosed.forEach(el => el.style.display = isPassword ? 'block' : 'none');
        });
    });
});