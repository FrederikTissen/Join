let contacts = [{
    name: "Mayer",
    firstName: "Anton",
    mail: "antom@gmail.com",
    phone: "015137294741",
    color: "#0038FF"
}, {
    name: "Schulz",
    firstName: "Anja",
    mail: "schulz@hotmail.com",
    phone: "015137294742",
    color: "#E201BE"
}, {
    name: "Eisenberg",
    firstName: "David",
    mail: "davidberg@gmail.com",
    phone: "015137294743",
    color: "#FF8A01"
}, {
    name: "Ziegler",
    firstName: "Benedikt",
    mail: "benedikt@gmail.com",
    phone: "015137294744",
    color: "#29D300"
}, {
    name: "Fischer",
    firstName: "Eva",
    mail: "eva@gmail.com",
    phone: "015137294745",
    color: "#FF0100"
}, {
    name: "Mauer",
    firstName: "Emanuel",
    mail: "emmanuelMa@gmail.com",
    phone: "015137294746",
    color: "#8BA4FF"
}, {
    name: "Bauer",
    firstName: "Marcel",
    mail: "bauer@gmail.com",
    phone: "015137294747",
    color: "#0038FF"
}, {
    name: "Wolf",
    firstName: "Tanja",
    mail: "wolf@gmail.com",
    phone: "015137294748",
    color: "#E201BE"
}];
let createdContact = true;
let contactColor = true;

/*
    blue = #0038FF
    pink = #E201BE
    orange = #FF8A01
    green = #29D300
    red = #FF0100
    turquoise = #8BA4FF
*/


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function includeHTMLaddContact() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function addUser() {
    users.push(x);
    backend.setItem('users', JSON.stringify(users))
}

/**
 * Pictures of the contacts will be randomly colored.
 * 
 * @param {param} i - 
 * 
 */
function setRandomColor() {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}


/**
 * Render all contacts from JSON Array "contacts"
 * 
 */
function renderAllContacts() {
    let contactSection = document.getElementById('contact-list');
    contactSection.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let color = contacts[i]['color'];
        let contact = contacts[i];
        let firstChar = contact['firstName'].charAt(0);
        let secondChar = contact['name'].charAt(0);
        contactSection.innerHTML += generateAllContacts(contact, firstChar, secondChar, i, color);
    }
}

/** 
 * returns generate HTML to showContact container
 *
 * @returns
 */
function generateAllContacts(contact, firstChar, secondChar, i, color) {
    return `
    <div id="char-section${i}" class="first-char">${firstChar}</div>
    <div onclick="showContact(${i}, '${color}')" id="contact-card${i}" class="contact-card">
        <div id="contact-img${i}" class="contact-img" style='background-color: ${color};'>${firstChar} ${secondChar}</div>
        <div id="contactInfo${i}" class="contact-info">
            <span>${contact['firstName']}  ${contact['name']}</span>
            <p>${contact['mail']}</p>
        </div>
    </div>`
}

/**
 * Show chosen contact bigger and fully detailed in the right section. 
 * 
 * 
 */
function showContact(i, color) {
    let firstChar = contacts[i]['firstName'].charAt(0);
    let secondChar = contacts[i]['name'].charAt(0);
    let contactfield = document.getElementById('show-contact');
    contactfield.innerHTML = generateContactfield(i, firstChar, secondChar, color);
}

/**
 * returns generate HTML to showContact function
 * 
 * 
 * @returns 
 */
function generateContactfield(i, firstChar, secondChar, color) {
    return `
    <div class="show-contact-headline">
        <div id="contact-img${i}" class="contact-img-big" style="background-color:${color}">${firstChar} ${secondChar}</div>
        <div class="show-contact-headline-right"> 
            <div>${contacts[i]['firstName']} ${contacts[i]['name']}</div>
            <div id="add-task" class="blue-font"> + Add Task </div>
        </div>
    </div>
    <div class="show-contact-middle">
        <span>Contact Information</span> 
        <div class="edit-contact" onclick="editContact(${i}, '${color}')">
            <img style="width: 30px; height: 30px; object-fit: contain;" src="./assets/img/pen.png"><p> Edit Contact</p>
        </div>
    </div>
    <div style="display: flex; flex-direction: column;">
        <span style="font-size: 16px; font-weight: 700; padding-bottom: 15px;">Email</span>
        <span class="blue-font" style="padding-bottom: 22px;">${contacts[i]['mail']}</span>
        <span style="font-size: 16px; font-weight: 700; padding-bottom: 15px;">Phone</span>
        <span>${contacts[i]['phone']}</span>
    </div> `
}


/**
 * Pop-up window to create a new contact
 * 
 */
function addNewContact() {
    if (createdContact) {
        document.getElementById('show-contact').innerHTML = `
        <div w3-include-html="add-contact.html"></div>`;
    }
    includeHTMLaddContact();
    createdContact = false;
}

/**
 * Pop-up window to edit a contact
 * 
 */
async function editContact(i, color) {
    if (createdContact) {
        document.getElementById('show-contact').innerHTML = `
        <div w3-include-html="edit-contact.html"></div>`;
        await includeHTMLaddContact();
    }
    editContactValues(i, color);
    createdContact = false;
}

function editContactValues(i, color) {
    let editLastname = document.getElementById(`edit-input-lastname`);
    let editFirstname = document.getElementById(`edit-input-firstname`);
    let editMail = document.getElementById(`edit-input-mail`);
    let editPhone = document.getElementById(`edit-input-phone`);
    let editImage = document.getElementById(`edit-img`);
    let firstChar = contacts[i]['firstName'].charAt(0);
    let secondChar = contacts[i]['name'].charAt(0);


    editLastname.value = contacts[i]['name'];
    editFirstname.value = contacts[i]['firstName'];
    editMail.value = contacts[i]['mail'];
    editPhone.value = contacts[i]['phone'];
    editImage.innerHTML += `${firstChar} ${secondChar}`;
    editImage.style = `background-color:${color};`;
}

async function saveEditContact(i) {
    let editLastname = document.getElementById(`edit-input-lastname`);
    let editFirstname = document.getElementById(`edit-input-firstname`);
    let editMail = document.getElementById(`edit-input-mail`);
    let editPhone = document.getElementById(`edit-input-phone`);
    
    
    
    // let changedContact = {
    //     name: editLastname.value,
    //     firstName: editFirstname.value,
    //     mail: editMail.value,
    //     phone: editPhone.value
    // }

    // contacts.push(changedContact);
    
    await backend.setItem('contacts', JSON.stringify(changedContact));
}

/**
 * cancel pop-up window
 * 
 */
function cancelPopupAdd() {
    document.getElementById('w3-add').classList.remove('show');
    document.getElementById('w3-add').classList.add('d-none');

    createdContact = true;
}

function cancelPopupEdit() {
    document.getElementById('w3-edit').classList.remove('show');
    document.getElementById('w3-edit').classList.add('d-none');

    createdContact = true;
}

function cancelButtonSuccessfully() {
    document.getElementById('myModal').classList.add('d-none');
}

/**
 * create the new contact
 * 
 */
function createContact() {
    let inputName = document.getElementById('input-name');
    let inputFirstName = document.getElementById('input-first-name');
    let inputMail = document.getElementById('input-email');
    let inputPhone = document.getElementById('input-phone');
    let newContact = {
        name: inputName.value,
        firstName: inputFirstName.value,
        mail: inputMail.value,
        phone: inputPhone.value
    }
    contacts.push(newContact);
    createdContact = true;
    renderAllContacts();
    clearInputfields(inputName, inputFirstName, inputMail, inputPhone)
    addContactToBackend(newContact);
    showSuccessBtn();
}

function showSuccessBtn() {
    let btnSuccess = document.getElementById('btn-successfully');
    let modal = document.getElementById('myModal');
    btnSuccess.classList.remove('d-none');
    modal.style.display = 'block';
}

function clearInputfields(inputName, inputFirstName, inputMail, inputPhone) {
    inputName.value = '';
    inputFirstName.value = '';
    inputMail.value = '';
    inputPhone.value = '';
}

async function addContactToBackend(newContact) {
    contacts.push(newContact);
    await backend.setItem('contacts', JSON.stringify(contacts));
}

function loadLetters() {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        let name = users[activeUser]['contacts'][i]['contactName'];
        let firstLetter = name.charAt(0);
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
            letters.sort();
        }
    }
}


// async function deleteUser(name) {
//     await backend.deleteItem('users');
// }


// function sortJsonAlphabetically(contacts) {
//     contacts.sort(function (a, b) {
//         if (a['name'] < b['name']) {
//             return -1;
//         }
//         if (a['name'] > b['name']) {
//             return 1;
//         }
//         return 0;
//     });
//     return contacts;
// }