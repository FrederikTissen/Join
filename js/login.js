const urlparams = new URLSearchParams(window.location.search);
const msg = urlparams.get('msg');

let users = [{
    'name': 'felix',
    'email': 'felix@test.de',
    'password': 'test321'
},{
    'name': 'frederik',
    'email': 'frederik@test.de',
    'password': 'test123'
}];
let activeUser;

if (msg) {
    document.getElementById('msgBox').innerHTML = msg;
} else {
    document.getElementById('msgBox').classList.add('d-none');
}

function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);

    if (user) {
        console.log('User gefunden');
    }
}