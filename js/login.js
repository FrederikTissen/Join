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

let userName;
let activeUser;
let currentUser = [];


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
    await backend.setItem('currentUser', JSON.stringify(''));

    await init();
    await pushAllContactsInBackEnd();

    await pushAllUsersInBackEnd();

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


function checkTime() {
    let date = new Date();
    let hours = date.getHours();
    let timeGreet = document.getElementById('board-time');

    if (hours <= 11) {
        timeGreet.innerHTML = 'Good Morning,';
    } else if (hours < 18) {
        timeGreet.innerHTML = 'Good Afternoon,';
    } else {
        timeGreet.innerHTML = 'Good Evening,';
    }
}


// function guestLogin() {
//     userName = 'guest';
//     saveVariable(userName);
//     location.href = 'summary.html';
// }

async function guestLogin() {
    activeUser = 'guest';
    currentUser.push(activeUser);
    //localStorage.setItem('currentUser', currentUser);
    await backend.setItem('currentUser', JSON.stringify(currentUser));
    location.href = 'summary.html';
}


async function saveVariable() {
    //let userNameAsText = JSON.stringify(userName);
    //localStorage.setItem('UserName', userNameAsText);
    //localStorage.setItem('UserName', userName);
    await backend.setItem('UserName', JSON.stringify(userName));

}


function replaceUserName() {
    let greeting = document.getElementById('board-greeting');
    //currentUser = backend.getItem('currentUser');
    if (currentUser == 'guest') {
        greeting.innerHTML = 'Guest';
    } else {
        greeting.innerHTML = currentUser[0].charAt(0).toUpperCase() + currentUser[0].slice(1);
    }
    //localStorage.removeItem('currentUser');
}


async function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let loginUser = loginUsers.find(u => u.email == email.value && u.password == password.value);

    activeUser = loginUser.name;
    currentUser.push(activeUser);
    //await backend.setItem('currentUser', currentUser);
    await backend.setItem('currentUser', JSON.stringify(currentUser));


    if (loginUser) {
        activeUser = loginUser;
        console.log('User gefunden');

        //backend.removeItem('loginUsers');
        location.href = 'summary.html';
    } else {
        alert('User not found');
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