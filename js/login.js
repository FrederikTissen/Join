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
let activeUser = {};


/*
if (msg) {
    document.getElementById('msgBox').classList.remove('d-none');
    document.getElementById('msgBox').innerHTML = msg;
} else {
    document.getElementById('msgBox').classList.add('d-none');
}
*/

async function onloadLogin() {
    await init();
    saveUsers();
}

function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    

    if (user) {
        activeUser = user;
        console.log('User gefunden');
        
    }
}

async function saveUsers() {
    
    await backend.setItem('users', JSON.stringify(users));
}