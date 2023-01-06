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

/**
 * Pictures of the contacts will be randomly colored.
 * 
 * @param {param} i - 
 */
function setRandomColor(i) {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById(`contact-img${i}`).style= `background-color: ${randomColor};`;
}

/**
 * Render all contacts from JSON Array "contacts"
 * 
 */
function renderAllContacts() {
    let contactSection = document.getElementById('contact-list');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstChar = contact['firstName'].charAt(0);
        let secondChar = contact['name'].charAt(0);

        contactSection.innerHTML += `

        <div id="char-section${i}" class="first-char">${firstChar}</div>
        <div onclick="showContact(${i})" id="contact-card${i}" class="contact-card">
            <div id="contact-img${i}" class="contact-img">${firstChar} ${secondChar}</div>
            <div id="contactInfo${i}" class="contact-info">
                <span>${contact['firstName']}  ${contact['name']}</span>
                <p>${contact['mail']}</p>
            </div>
        </div>`;

    setRandomColor(i);

    }
}

/**
 * Show chosen contact bigger and fully detailed in the right section. 
 * 
 * 
 */
function showContact(i) {
    let firstChar = contacts[i]['firstName'].charAt(0);
    let secondChar = contacts[i]['name'].charAt(0);
    let contactfield = document.getElementById(`show-contact`);
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    contactfield.innerHTML =/*html*/`
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
    </div>

    `;
}