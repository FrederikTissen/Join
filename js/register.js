function addUser() {
    let email = document.getElementById('register-email');
    let password = document.getElementById('register-password');
    users.push({email: email.value, password: password.value});
    window.location.href = 'log-in.html?msg=Du hast dich erfolgreich registriert';
    email.value = '';
    password.value = '';
    backend.setItem('users', JSON.stringify(users));
}