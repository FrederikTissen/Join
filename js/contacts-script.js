let contacts = [{
    name: "Mayer",
    firstName: "Anton",
    mail: "antom@gmail.com",
    phone: "015137294741"
}, {
    name: "Schulz",
    firstName: "Anja",
    mail: "schulz@hotmail.com",
    phone: "015137294742"
}, {
    name: "Eisenberg",
    firstName: "David",
    mail: "davidberg@gmail.com",
    phone: "015137294743"
}, {
    name: "Ziegler",
    firstName: "Benedikt",
    mail: "benedikt@gmail.com",
    phone: "015137294744"
}, {
    name: "Fischer",
    firstName: "Eva",
    mail: "eva@gmail.com",
    phone: "015137294745"
}, {
    name: "Mauer",
    firstName: "Emanuel",
    mail: "emmanuelMa@gmail.com",
    phone: "015137294746"
}, {
    name: "Bauer",
    firstName: "Marcel",
    mail: "bauer@gmail.com",
    phone: "015137294747"
}, {
    name: "Wolf",
    firstName: "Tanja",
    mail: "wolf@gmail.com",
    phone: "015137294748"
}];

let createdContact = true;
let contactColor = true;


async function init() {
    await includeHTMLaddContact();
    document.getElementById('show-contact').innerHTML += ``;
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

/**
 * Pictures of the contacts will be randomly colored.
 * 
 * @param {param} i - 
 */
function setRandomColor(i) {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById(`contact-img${i}`).style = `background-color: ${randomColor};`;
}


/**
 * Render all contacts from JSON Array "contacts"
 * 
 */
function renderAllContacts() {
    let contactSection = document.getElementById('contact-list');

    contactSection.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstChar = contact['firstName'].charAt(0);
        let secondChar = contact['name'].charAt(0);

        contactSection.innerHTML += generateAllContactsHtml(contact, firstChar, secondChar, i);

        setRandomColor(i);
    }
}

/** 
 * returns generate HTML to showContact function
 * 
 * 
 * @returns
 */
function generateAllContactsHtml(contact, firstChar, secondChar, i, randomColor) {
    return `
    <div id="char-section${i}" class="first-char">${firstChar}</div>
    <div onclick="showContact(${i})" id="contact-card${i}" class="contact-card">
        <div id="contact-img${i}" class="contact-img" style.background-color="${randomColor}";>${firstChar} ${secondChar}</div>
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
function showContact(i) {
    let firstChar = contacts[i]['firstName'].charAt(0);
    let secondChar = contacts[i]['name'].charAt(0);
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let contactfield = document.getElementById('show-contact');

    contactfield.innerHTML = generateContactfield(i, firstChar, secondChar, randomColor);

}

/**
 * returns generate HTML to showContact function
 * 
 * 
 * @returns 
 */
function generateContactfield(i, firstChar, secondChar, randomColor) {
    return `
    <div class="show-contact-headline">
        <div id="contact-img${i}" class="contact-img-big" style="background-color:${randomColor}">${firstChar} ${secondChar}</div>
        <div class="show-contact-headline-right"> 
            <div>${contacts[i]['firstName']} ${contacts[i]['name']}</div>
            <div id="add-task" class="blue-font"> + Add Task </div>
        </div>
    </div>
    <div class="show-contact-middle">
        <span>Contact Information</span> 
        <div class="edit-contact" onclick="editContact()">
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

        document.getElementById('show-contact').innerHTML += includeHTMLaddContact();
        let showPopup = document.getElementById("popup-add");
        showPopup.classList.toggle("show");
    }
    createdContact = false;
}

/**
 * Pop-up window to edit a contact
 * 
 */
function editContact() {
    document.getElementById('show-contact').innerHTML += `
        <iframe id="popup-edit" src="./edit-contact.html">
    `;

    let editPopup = document.getElementById("popup-edit");
    editPopup.classList.toggle("show");
}

/**
 * cancel pop-up window
 * 
 */
function cancelPopupAdd() {
    document.getElementById('popup-add').classList.remove('show');
    document.getElementById('popup-add').classList.add('hide');
    
    createdContact = true;
}

function cancelPopupEdit() {
    document.getElementById('popup-edit').classList.add('hide');
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

    inputName.value = '';
    inputFirstName.value = '';
    inputMail.value = '';
    inputPhone.value = '';

    createdContact = true;
    renderAllContacts();
}

/*

function saveEditContact(i) { //edit currently shown contact
    let contact = contacts[i];
    //only change if input is not empty
    if (inputContainsValue('edit-input-lastname')) {
        contact['name'] = document.getElementById('name-input').value;
    }
    if (inputContainsValue('edit-input-firstname')) {
        contact['email'] = document.getElementById('email-input').value;
    }
    if (inputContainsValue('edit-input-mail')) {
        contact['phone'] = document.getElementById('phone-input').value;
    }
    if (inputContainsValue('edit-input-phone')) {
        contact['phone'] = document.getElementById('phone-input').value;
    }
}


function inputContainsValue(id) {
    document.getElementById(id).value != '';
}


function prepareEdit() { //load contact data and adjust onclick event of edit button
    let contact = contacts[getIndexOf(document.getElementById('name').textContent)];
    document.getElementById("name-input-edit").setAttribute('value', contact['name']);
    document.getElementById("email-input-edit").setAttribute('value', contact['email']);
    document.getElementById("phone-input-edit").setAttribute('value', contact['phone']);

    let i = getIndexOf(contact['name']);
    document.getElementById('edit-button').setAttribute('onclick', editContact(i))
}


function createBigSection(name, email, letter, color, firstLetter, i) {
    let contactList = document.getElementById(`contactLetter-${firstLetter}`);
    if (!contactList) {
        contactList = document.createElement('div');
        contactList.id = `contactLetter-${firstLetter}`;
        document.getElementById('contactList').appendChild(contactList);
    }
    if (!firstLetter || firstLetter == firstLetter) {
        let contactDiv = showContactDiv(name, email, letter, color, i);
        contactList.innerHTML += contactDiv;
    }
}

*/