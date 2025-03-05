const logout = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            document.cookie = "token=";
            alert('Logout successful');
            window.location.href = './index.html';
        } else {
            alert('Logout failed');
        }
    }
    catch(err){
        console.log(err)
        alert(`API logout error: ${err}`);
    }
    
}