// Hamburger menu toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navContentMobile = document.getElementById('mobile-menu');
    const siteTitle = document.getElementById('site-title');
    navContentMobile.classList.toggle('hidden');
    siteTitle.classList.toggle('mx-auto');
});

const togglePasswordVisibility = (inputId, buttonId) => {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(buttonId);

    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // เปลี่ยน icon (ถ้าต้องการ)
    toggleButton.querySelector('i').classList.toggle('fa-eye');
    toggleButton.querySelector('i').classList.toggle('fa-eye-slash');
};