document.getElementById('editPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const response = await fetch('http://localhost:3000/api/edit-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldPassword,
            newPassword
        }),
        credentials: 'include'
    });
    const data = await response.json();
    if (response.ok) {
        alert('Password updated successfully');
        window.location.href = './index.html';
    } else {
        alert('Password update failed');
    }
});