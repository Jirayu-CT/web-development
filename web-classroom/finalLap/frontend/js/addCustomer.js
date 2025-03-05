document.getElementById('addCustomerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const FullName = document.getElementById('fullName').value;
    const CustomerType = document.getElementById('customerType').value;

    try {
        let token = getCookie('token');
        if (!token) {
            console.log('You are not logged in. Please log in first.');
            alert('You are not logged in. Please log in first.');
            window.location.href = './login.html';
            return;
        }

        const response = await fetch('http://localhost:3000/customer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                FullName,
                CustomerType
            }),
            credentials: 'include'
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log('Customer added successfully');
            alert('Customer added successfully');
            window.location.href = './index.html';
        } else {
            alert('Failed to add customer: ' + data.message);
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