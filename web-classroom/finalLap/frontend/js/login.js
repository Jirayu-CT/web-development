document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        }),
        credentials: 'include'
    });
    const data = await response.json();

    if (response.ok) {
        
        document.cookie = `token=${data.token}`;
        alert('Login successful');
        window.location.href = './index.html';
    } else {
        alert('Login failed');
    }
});