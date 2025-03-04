const fetchProfile = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        document.getElementById('get-username').innerHTML = data.user.username;
        document.getElementById('get-password').innerHTML = data.user.password;

    } catch (error) {
        console.error('Error fetch profile:', error);
        document.getElementById('get-username').innerHTML = 'Error loading username.';
    }
}

fetchProfile();