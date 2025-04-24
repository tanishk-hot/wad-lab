document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            dob: document.getElementById('dob').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            password: document.getElementById('password').value
        };

        try {
            await simulateAjaxPost('/api/register', userData);
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful!');
            window.location.href = 'login.html';
        } catch (error) {
            alert('Registration failed: ' + error.message);
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