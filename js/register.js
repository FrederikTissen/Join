let users = [{
    'name': 'felix',
    'email': 'felix@test.de',
    'password': 'test321'
},{
    'name': 'frederik',
    'email': 'frederik@test.de',
    'password': 'test123'
}]

function addUser() {
    let email = document.getElementById('register-email');
    let password = document.getElementById('register-password');
    users.push({email: email.value, password: password.value});
    email.value = '';
    password.value = '';
    window.location.href = 'log-in.html?msg=Du hast dich erfolgreich registriert';

    // user ins backend speichern
}

