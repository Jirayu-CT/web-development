const fetchProfile = async () => {
    try {
        let token = getCookie('token');
        if (!token) {
            window.location.href = './login.html';
        }

        const res = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        document.getElementById('get-username').innerHTML = data.username;

    } catch (error) {
        console.error('Error fetch profile:', error);
        document.getElementById('get-username').innerHTML = 'Error loading username.';
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

fetchProfile();