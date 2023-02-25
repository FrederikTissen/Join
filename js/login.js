const urlparams = new URLSearchParams(window.location.search);
const msg = urlparams.get('msg');

let loginUsers = [{
    'name': 'felix',
    'email': 'felix@test.de',
    'password': 'test321'
}, {
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

/*async function onloadLogin() {
    await init();
    saveUsers();
}*/

function onloadLogin() {
    init();
    pushAllUsersInBackEnd();
}


async function pushAllUsersInBackEnd() {

    if (loginUsers.length == 0) {
        for (let i = 0; i < loginUsers.length; i++) {
            const thisUser = loginUsers[i];

            loginUsers.push(thisUser);
            await backend.setItem('loginUsers', JSON.stringify(loginUsers));

        }
    }
}

function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let loginUser = loginUsers.find(u => u.email == email.value && u.password == password.value);


    if (loginUser) {
        activeUser = loginUser;
        console.log('User gefunden');
    }
}

function addUser() {
    let lastName = document.getElementById('register-last-name');
    let name = document.getElementById('register-name');
    let email = document.getElementById('register-email');
    let password = document.getElementById('register-password');

    let newUser = {
        'name': name.value,
        'email': email.value,
        'password': password.value,
    };

    saveUsers(newUser);
    
    console.log('User angelegt!');
    //window.location.href = 'log-in.html?msg=Du hast dich erfolgreich registriert';
    lastName.value = '';
    name.value = '';
    email.value = '';
    password.value = '';

    
    //backend.setItem('users', JSON.stringify(users));
}

async function saveUsers(newUser) {
    loginUsers.push(newUser);
    await backend.setItem('loginUsers', JSON.stringify(loginUsers));
}




