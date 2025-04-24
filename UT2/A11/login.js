document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            // Simulate AJAX POST request
            await simulateAjaxPost('/api/login', { email, password });
            
            // Check credentials in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'users.html';
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });
});

function simulateAjaxPost(url, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('AJAX POST to:', url, 'Data:', data);
            resolve({ success: true });
        }, 1000);
    });
}