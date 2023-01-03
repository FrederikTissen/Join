let contacts = [{
    name: "Mayer",
    firstName: "Anton",
    mail: "antom@gmail.com",
    phone: "015137294744"
}, {
    name: "Schulz",
    firstName: "Anja",
    mail: "schulz@hotmail.com",
    phone: "015137294744"
}, {
    name: "Eisenberg",
    firstName: "David",
    mail: "davidberg@gmail.com",
    phone: "015137294744"
}, {
    name: "Ziegler",
    firstName: "Benedikt",
    mail: "benedikt@gmail.com",
    phone: "015137294744"
}, {
    name: "Fischer",
    firstName: "Eva",
    mail: "eva@gmail.com",
    phone: "015137294744"
}, {
    name: "Mauer",
    firstName: "Emanuel",
    mail: "emmanuelMa@gmail.com",
    phone: "015137294744"
}, {
    name: "Bauer",
    firstName: "Marcel",
    mail: "bauer@gmail.com",
    phone: "015137294744"
}, {
    name: "Wolf",
    firstName: "Tanja",
    mail: "wolf@gmail.com",
    phone: "015137294744"
}];

function setRandomColor(i) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById(`contact-img${i}`).style.backgroundColor = '#' + randomColor;
}

function renderAllContacts(i) {
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

function showContact(i) {
    let firstChar = contacts[i]['firstName'].charAt(0);
    let secondChar = contacts[i]['name'].charAt(0);
    let contactfield = document.getElementById(`show-contact`);
    // let contact = document.getElementById(`contact-card${i}`);
    // let contactImage = document.getElementById(`contact-img${i}`);
    // let 

    contactfield.innerHTML = `
        <div>
            <div id="contact-img${i}" class="contact-img">${firstChar} ${secondChar}</div>
            <h1> ${contacts[i]['firstName']} ${contacts[i]['name']} </h1>
        </div>
    `;
    setRandomColor(i);
}

// if firstChar === ist, nicht ausführen