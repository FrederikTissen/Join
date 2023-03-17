
let dataContacts = [{
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
    color: "#E200BE"
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
    color: "#00F2F0"
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
    color: "#E200BE"
}];


let createdContact = true;
let contact = true;
let initials = [];
let editedContact = false;
let sortContacts = [];
let contacts = [];
let currentLetter = [];
let saveBtn;

async function onloadContacts() {

    await init();
    await filterByLetters();
    hideLoader();
}


async function init() {
    await downloadFromServer();
    loginUsersBackend = JSON.parse(backend.getItem('loginUsersBackend')) || [];
    //allLoginUsers = JSON.parse(backend.getItem('allLoginUsers')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    activeUser = JSON.parse(backend.getItem('activeUser')) || [];
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allCategories = JSON.parse(backend.getItem('allCategories')) || [];
    allContacts = JSON.parse(backend.getItem('allContacts')) || [];
    selectedContacts = JSON.parse(backend.getItem('selectedContacts')) || [];
    allSubTasks = JSON.parse(backend.getItem('allSubTasks')) || [];
    todoCount = JSON.parse(backend.getItem('todoCount')) || [];
    inprogressBoxCount = JSON.parse(backend.getItem('inprogressBoxCount')) || [];
    feedbackBoxCount = JSON.parse(backend.getItem('feedbackBoxCount')) || [];
    doneBoxCount = JSON.parse(backend.getItem('doneBoxCount')) || [];
    urgentTasksCount = JSON.parse(backend.getItem('urgentTasksCount')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
}


async function leadToLogIn() {
    await resetCurrentUser();
    window.location.href = 'index.html';
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}


function hideLoader() {
    let loader = document.getElementById('loader').classList;
    loader.add("d-none");
}


function removeBlur() {
    let main = document.getElementById('contact-list');
    main.style.filter = '';
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

async function pushAllContactsInBackEnd() {
    await backend.setItem('contacts', JSON.stringify(''));
    contacts = JSON.parse(backend.getItem('contacts')) || [];

    if (contacts.length == 0) {
        for (let i = 0; i < dataContacts.length; i++) {
            const thisContact = dataContacts[i];

            contacts.push(thisContact);
        }
        await backend.setItem('contacts', JSON.stringify(contacts));

    }
}


function showContact(firstName, color) {
    currentcontact = contacts.filter(t => t['firstName'] == firstName);
    let i = contacts.findIndex(x => x['firstName'] === firstName);
    let firstChar = currentcontact['0']['firstName'].charAt(0).toUpperCase();
    let secondChar = currentcontact['0']['name'].charAt(0).toUpperCase();
    let firstname = currentcontact['0']['firstName'];
    let fullFirstname = firstname.charAt(0).toUpperCase() + firstName.slice(1);
    let name = currentcontact['0']['name'];
    let fullName = name.charAt(0).toUpperCase() + name.slice(1);
    let mail = currentcontact['0']['mail'];
    let phone = currentcontact['0']['phone'];
    let contactfield = document.getElementById('show-contact');
    contactfield.style.display = "";


    if (window.innerWidth > 450) {
        contactfield.innerHTML = generateContactfield(i, firstChar, secondChar, color, fullFirstname, fullName, mail, phone);
    } else {
        let main = document.getElementById('contact-list');
        main.style.filter = 'blur(5px)';
        document.getElementById('show-contact').style.display = "unset";
        document.getElementById('add-new-contact-btn').style.display = 'none';
        contactfield.innerHTML = generateContactfield(i, firstChar, secondChar, color, fullFirstname, fullName, mail, phone);
        document.getElementById('cancel-popup').classList.remove('d-none');
    }

    editedContact = i;
}


function generateContactfield(i, firstChar, secondChar, color, fullFirstname, fullName, mail, phone) {
    return /*html*/`
    <div class="show-contact-headline">
    <span id="cancel-popup" onclick="closePopup()" class="cancel-x d-none">X</span>
        <div id="contact-img" class="contact-img-big" style="background-color:${color}">${firstChar} ${secondChar}</div>
        <div class="show-contact-headline-right"> 
            <div class="contact-head-name">${fullFirstname} ${fullName}</div>
            <div onclick="addNewTask()" id="add-task" class="blue-font"> + Add Task </div>
        </div>
    </div>
    <div class="show-contact-middle">
        <span>Contact Information</span> 
        <div class="edit-contact" onclick="editContact(${i}, '${color}')">
            <img style="width: 30px; height: 30px; object-fit: contain;" src="./assets/img/pen.png"><p> Edit Contact</p>
        </div>
    </div>
    <div class="show-contact-bottom">
        <span style="font-size: 16px; font-weight: 700; padding-bottom: 15px;">Email</span>
        <span class="blue-font" style="padding-bottom: 22px;">${mail}</span>
        <span style="font-size: 16px; font-weight: 700; padding-bottom: 15px;">Phone</span>
        <span>${phone}</span>
    </div> `
}


/**
 * Pop-up window to create a new contact
 * 
 */
function addNewContact() {
    document.getElementById('show-contact').style.display = "";
    document.getElementById('add-new-contact-btn').style.display = "none";
    if (window.innerWidth > 450) {
        if (createdContact) {
            document.getElementById('show-contact').innerHTML = `
        <div class="w3-add" w3-include-html="add-contact.html"></div>`;
        }
        includeHTMLaddContact();
        createdContact = false;
    } else {
        addContactWithBlur();
        createdContact = false;
    }
}


function closePopup() {
    document.getElementById('add-new-contact-btn').style.display = "flex";
    document.getElementById('show-contact').style.display = "none";
    removeBlur();
    createdContact = true;
}


/**
 * Pop-up window to edit a contact
 * 
 */
async function editContact(i, color) {
    document.getElementById('show-contact').style.display = "";
    if (innerWidth > 450) {
        if (createdContact) {
            document.getElementById('show-contact').innerHTML = `
                <div class="w3-edit" w3-include-html="edit-contact.html"></div>`;
            await includeHTMLaddContact();
            document.getElementById('close-mobile-popup').style.display = "none";
        }

        editContactValues(i, color);
        createdContact = false;
    } else {
        await editContactWithBlur();
        editContactValues(i, color);
        createdContact = false;
    }

    //editedContact = i;

}


async function editContactWithBlur() {
    let main = document.getElementById('contact-list');
    main.style.filter = 'blur(5px)';
    document.getElementById('show-contact').style.display = "";
    document.getElementById('show-contact').innerHTML = `
        <div class="w3-edit" w3-include-html="edit-contact.html"></div>`;
    await includeHTMLaddContact();
    document.getElementById('add-new-contact-btn').style.display = 'none';
}


async function addContactWithBlur() {
    let main = document.getElementById('contact-list');
    main.style.filter = 'blur(5px)';
    document.getElementById('show-contact').style.display = "";
    document.getElementById('show-contact').innerHTML = `
        <div class="w3-add" w3-include-html="add-contact.html"></div>`;
    await includeHTMLaddContact();
    document.getElementById('add-new-contact-btn').style.display = 'none';
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

    //editedContact = i;
    document.getElementById('add-new-contact-btn').style.display = "none";
}

async function editBtn() {
    if (saveBtn) {
        await saveEditContact();
    } else {
        await deleteUser();
    }
}

function saveBtnTrue() {
    saveBtn = true;
}

function saveBtnFalse() {
    saveBtn = false;
}

async function saveEditContact() {

    let editLastname = document.getElementById(`edit-input-lastname`);
    let editFirstname = document.getElementById(`edit-input-firstname`);
    let editMail = document.getElementById(`edit-input-mail`);
    let editPhone = document.getElementById(`edit-input-phone`);
    let newColor = contacts[editedContact]['color'];

    let changedContact = {
        name: editLastname.value,
        firstName: editFirstname.value,
        mail: editMail.value,
        phone: editPhone.value,
        color: newColor,
    }

    createdContact = true;
    contacts.push(changedContact);
    contacts.splice(editedContact, 1);

    await backend.setItem('contacts', JSON.stringify(contacts));

    filterByLetters();
    closePopup();
    document.getElementById('add-new-contact-btn').style.display = "";
    editedContact = false;



}

/**
 * create the new contact
 * 
 */
async function createContact() {
    let inputName = document.getElementById('input-name');
    let inputFirstName = document.getElementById('input-first-name');
    let inputMail = document.getElementById('input-email');
    let inputPhone = document.getElementById('input-phone');
    let inputColor = document.getElementById('colors');

    let newContact = {
        name: inputName.value,
        firstName: inputFirstName.value,
        mail: inputMail.value,
        phone: inputPhone.value,
        color: inputColor.value
    }

    createdContact = true;
    contacts.push(newContact);  // DELETE LATER
    await backend.setItem('contacts', JSON.stringify(contacts));
    clearInputfields(inputName, inputFirstName, inputMail, inputPhone);
    showSuccessBtn();
    setTimeout(closeSuccessBtn, 1000);
    filterByLetters();
}

function showSuccessBtn() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeSuccessBtn() {
    document.getElementById('myModal').classList.add('d-none');
    document.getElementById('w3-add').classList.add('d-none');
}

function clearInputfields(inputName, inputFirstName, inputMail, inputPhone) {
    inputName.value = '';
    inputFirstName.value = '';
    inputMail.value = '';
    inputPhone.value = '';
}

async function deleteUser() {
    contacts.splice(editedContact, 1);
    await backend.setItem('contacts', JSON.stringify(contacts));
    document.getElementById('add-new-contact-btn').style.display = "flex";

    closePopup();
    filterByLetters();
    document.getElementById('add-new-contact-btn').style.display = "";
    editedContact = false;

    saveBtn = false;
    deleteBtn = true;

}

function filterByLetters() {
    let contactSection = document.getElementById('contact-list');
    contactSection.innerHTML = '';

    filterLetter('A');
    filterLetter('B');
    filterLetter('C');
    filterLetter('D');
    filterLetter('E');
    filterLetter('F');
    filterLetter('G');
    filterLetter('H');
    filterLetter('I');
    filterLetter('J');
    filterLetter('K');
    filterLetter('L');
    filterLetter('M');
    filterLetter('N');
    filterLetter('O');
    filterLetter('P');
    filterLetter('Q');
    filterLetter('R');
    filterLetter('S');
    filterLetter('T');
    filterLetter('U');
    filterLetter('V');
    filterLetter('W');
    filterLetter('X');
    filterLetter('Y');
    filterLetter('Z');
}


function filterLetter(letter) {

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let bigLetter = contact['firstName'].charAt(0).toUpperCase();
        if (bigLetter == letter) {
            currentLetter.push(contact);
        }
    }

    if (currentLetter.length > 0) {
        renderLetterBox(currentLetter, letter);
        currentLetter = [];
    }
}


function renderLetterBox(currentLetter, letter) {
    let contactSection = document.getElementById('contact-list');
    let firstChar = letter;

    contactSection.innerHTML += `
        <div id="char-section${letter}" class="first-char">${firstChar}</div>
        <div class="same-letters" id='theSameLetters${letter}'></div>
    `

    for (let i = 0; i < currentLetter.length; i++) {
        currentcontact = currentLetter[i];
        let color = currentcontact['color'];
        let firstChar = currentcontact['firstName'].charAt(0).toUpperCase();


        let firstName = currentcontact['firstName'];
        let fullFirstname = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        let name = currentcontact['name'];
        let fullName = name.charAt(0).toUpperCase() + name.slice(1);


        let secondChar = currentcontact['name'].charAt(0).toUpperCase();
        let charSection = document.getElementById(`char-section${i}`);
        let contactLetter = document.getElementById(`theSameLetters${firstChar}`);

        contactLetter.innerHTML += generateAllContacts1(currentcontact, firstChar, secondChar, i, color, firstName, fullFirstname, fullName);

        if (!initials.includes(charSection)) {
            initials.push(charSection);
        }
    }
}


/** 
 * returns generate HTML to showContact container
 *
 * @return
 */
function generateAllContacts1(currentcontact, firstChar, secondChar, i, color, firstName, fullFirstname, fullName) {

    return /*html*/ `
    <div onclick="showContact('${firstName}', '${color}')" id="contact-card${i}" class="contact-card">
        <div id="contact-img${i}" class="contact-img" style='background-color: ${color};'>${firstChar} ${secondChar}</div>
        <div id="contactInfo${i}" class="contact-info">
            <span>${fullFirstname} ${fullName}</span>
            <p>${currentcontact['mail']}</p>
        </div>
    </div>`
}