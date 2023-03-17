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



async function onloadLogin() {

    await init();
    await pushAllContactsInBackEnd();
    //await pushAllUsersInBackEnd();
    await resetCurrentUser();
    hideLoader();

}




async function resetCurrentUser() {
    currentUser = [];
    activeUser = '';
    await backend.setItem('currentUser', JSON.stringify(''));
    

}




function loadAllUsers() {
    let allUsersAsString = localStorage.getItem('loginUsers');
    if (allUsersAsString) {
        loginUsers = JSON.parse(allUsersAsString);
    }
}


async function pushAllUsersInBackEnd() {
    loginUsersBackend = [];
    //await backend.setItem('loginUsersBackend', JSON.stringify(''));

    for (let i = 0; i < loginUsers.length; i++) {
        const thisUser = loginUsers[i];

        loginUsersBackend.push(thisUser);
        await backend.setItem('loginUsersBackend', JSON.stringify(loginUsersBackend));

    }

    //loginUsersBackend = JSON.parse(backend.getItem('loginUsersBackend')) || [];
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



async function guestLogin() {
    activeUser = 'guest';
    currentUser.push(activeUser);
    await backend.setItem('currentUser', JSON.stringify(currentUser));
    location.href = 'summary.html';
}


function replaceUserName() {
    let greeting = document.getElementById('board-greeting');
    if (currentUser == 'guest') {
        greeting.innerHTML = 'Guest';
    } else {
        greeting.innerHTML = currentUser[0].charAt(0).toUpperCase() + currentUser[0].slice(1);
    }
}


async function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let loginUser = loginUsersBackend.find(u => u.email == email.value && u.password == password.value);

    activeUser = loginUser.name;
    currentUser.push(activeUser);
    await backend.setItem('currentUser', JSON.stringify(currentUser));


    if (loginUser) {
        activeUser = loginUser;
        console.log('User gefunden');
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
    await pushAllUsersInBackEnd();
    //let loginUsersAsText = JSON.stringify(loginUsers);
    //saveInLocalStorage(loginUsersAsText);
    window.location.href = 'index.html';
}

async function saveUsers() {
    await backend.setItem('loginUsersBackend', JSON.stringify(loginUsersBackend));
}

function saveInLocalStorage(loginUsersAsText) {
    localStorage.setItem('loginUsers', loginUsersAsText)
}