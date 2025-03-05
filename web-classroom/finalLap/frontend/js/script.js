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

const fetchProfile = async () => {
    try {
        let token = getCookie('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const tokenDecode = decodeJwt(token);
        document.getElementById('username-show').innerHTML = tokenDecode.username;
        document.getElementById('nav-login-singup-mobile').style.display = 'none';
        document.getElementById('nav-login-singup').style.display = 'none';

        const nav_logout_mobile = document.getElementById('nav-logout-mobile');
        nav_logout_mobile.classList.toggle('hidden');
        
    } catch (error) {
        console.log('Error fetch profile:', error.message);
        document.getElementById('nav-logout-mobile').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'none';

        document.getElementById('add-publisher').style.display = 'none';
        document.getElementById('add-publisher-mobile').style.display = 'none';

        document.getElementById('add-customer').style.display = 'none';
        document.getElementById('add-customer-mobile').style.display = 'none';

        document.getElementById('username-show').innerHTML = 'Error loading username.';
    }
};

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function decodeJwt(token) {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1])); // ถอดรหัส Payload (Base64)
}

fetchProfile();