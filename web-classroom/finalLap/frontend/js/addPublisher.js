document.getElementById('addPublisherForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const PublisherName = document.getElementById('publisherName').value;
    const Province = document.getElementById('province').value;

    try {
        let token = getCookie('token');
        if (!token) {
            alert('You are not logged in. Please log in first.');
            window.location.href = './login.html';
        }

        const response = await fetch('http://localhost:3000/api/add-publisher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                PublisherName,
                Province
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert('Publisher added successfully');
            window.location.href = './index.html';
        } else {
            alert('Failed to add publisher: ' + data.message);
        }
    } catch (error) {
        console.log('Error:', error.message);
        alert('An error occurred. Please try again later.');
    }
});

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