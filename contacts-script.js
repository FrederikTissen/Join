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

function renderAllContacts() {
    let contactSection = document.getElementById('contact-list');
    let charSection = document.getElementById(`char-section`);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstChar = contact['firstName'].charAt(0);
        let secondChar = contact['name'].charAt(0);

        contactSection.innerHTML += `

        <div id="char-section${i}" class="first-char">${firstChar}</div>
        <div class="contact-card">
            <div class="contact-img contact-color">${firstChar} ${secondChar}</div>
            <div class="contact-info">
                <span>${contact['firstName']} ${contact['name']}</span>
                <p>${contact['mail']}</p>
            </div>
        </div>`;
    }

    if (charSection === charSection) {
        charSection.classList.add = 'd-none';
    }
}

// if firstChar === ist, nicht ausführen