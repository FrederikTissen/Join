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

async function onloadLogin() {
    await init();
    pushAllUsersInBackEnd();
    //loadAllUsers();
    
    
    

}

function loadAllUsers() {
    let allUsersAsString = localStorage.getItem('loginUsers');
    if (allUsersAsString) {
        loginUsers = JSON.parse(allUsersAsString);
    }
}


async function pushAllUsersInBackEnd() {


    for (let i = 0; i < loginUsers.length; i++) {
        const thisUser = loginUsers[i];

        loginUsersBackend.push(thisUser);
        await backend.setItem('loginUsersBackend', JSON.stringify(loginUsersBackend));
        loginUsersBackend = JSON.parse(backend.getItem('loginUsersBackend')) || [];

    }
}


function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let loginUser = loginUsers.find(u => u.email == email.value && u.password == password.value);


    if (loginUser) {
        activeUser = loginUser;
        console.log('User gefunden');
        window.location.href = 'summery.html';
        localStorage.removeItem('loginUsers');
    } else {
        //popup User not found
    }


}





async function addUser() {
    let lastName = document.getElementById('register-last-name');
    let name = document.getElementById('register-name');
    let email = document.getElementById('register-email');
    let password = document.getElementById('register-password');

    let newUser = {
        'name': name.value,
        'email': email.value,
        'password': password.value,
    };

    loginUsers.push(newUser);
    let loginUsersAsText = JSON.stringify(loginUsers);
    saveInLocalStorage(loginUsersAsText);
    window.location.href = 'index.html';


    //console.log('User angelegt!');
    /*lastName.value = '';
    name.value = '';
    email.value = '';
    password.value = '';*/


    //backend.setItem('users', JSON.stringify(users));
}

async function saveUsers() {
    await backend.setItem('loginUsersBackend', JSON.stringify(loginUsersBackend));
}

function saveInLocalStorage(loginUsersAsText) {
    localStorage.setItem('loginUsers', loginUsersAsText)
}






