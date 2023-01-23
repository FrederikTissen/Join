let allTasks = [];
let selectionPrio;
let allCategories = [];
let allContacts = [];
let color;
let currentCategory;
let currentContact;
let category;
let priority;


function onload() {
    loadAllTasks();
    loadAllContacts();
    renderCategoryBox();
    renderContactBox();
    renderPrios();
    clock();
}



function clock() {
    var date = new Date();
    var currentDate = date.toISOString().slice(0, 10);

    document.getElementById('date').value = currentDate;
}

function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let selectionCategory = document.getElementById('categorySelect');

    let task = {
        'title': title.value,
        'description': description.value,
        'date': date.value,
        'categorySelect': category,
        'categoryColor': color,
        'priority': priority,


    };
    allTasks.push(task);

    saveTask();
}



function renderCategories() {
    loadAllCategories();

    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <img onclick="renderCategoryBox()" class="arrow-icon" src="/assets/img/arrow-down.png" alt="">
    <div  id="category-box" class="category-box">
        <div onclick="renderCategoryBox()" class="category-box-render">
            <p  class="select-category">Select task category</p>
            
        </div>
        <div onclick="openInput()" class="selection-category">
            <div>New category</div>
        </div>
    </div>
    `;

    for (let i = 0; i < allCategories.length; i++) {
        currentCategory = allCategories[i];
        category = currentCategory['categoryName'];
        color = currentCategory['categoryColor']
        let newCategory = document.getElementById('category-box');

        newCategory.innerHTML += /*html*/ `
            <div onclick="acceptCategory(${i})" class="selection-category">
                <div id="category${i}" >${category}</div>
                <img class="colors" src="/assets/img/${color}.png" alt="">
            </div>
        `
    }
}

function acceptCategory(i) {
    currentCategory = allCategories[i];
    category = currentCategory['categoryName'];
    color = currentCategory['categoryColor'];
    let newCategory = document.getElementById('category');

    newCategory.innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <img onclick="renderCategories()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">
    <div onclick="renderCategories()" id="category-box" class="accepted-category">
        <p class="accept-category">${category} </p>
        <img class="colors" src="/assets/img/${color}.png" alt="">
    </div>
    `;
}

function acceptNewCategory(newCategoryName) {
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <img onclick="renderCategories()" class="arrow-icon" src="/assets/img/arrow-down.png" alt="">
    <div onclick="renderCategories()" id="category-box" class="accepted-category">
        <p class="accept-category">${newCategoryName} </p>
        <img class="colors" src="/assets/img/${color}.png" alt="">
    </div>
    `;
}


function openInput() {

    document.getElementById('category').innerHTML = '';
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <img class="arrow-d-none" src="/assets/img/arrow-down.png" alt="">
    <input id="input-category"  placeholder="New category name" class="addTotaskInputField" type="text">
    <div id="input-nav-box" class="input-nav-box">
        <img onclick="renderCategoryBox()" class="x-black" src="/assets/img/x-black.png">
        <img class="line" src="/assets/img/line.png">
        <img onclick="pushNewCategory()" class="hook" src="/assets/img/hook.png">
    </div>
    <div class="color-box">
        <img id="turquoise" onclick="chooseColor('turquoise')" class="colors" src="/assets/img/turquoise.png" alt="">
        <img id="red" onclick="chooseColor('red')" class="colors" src="/assets/img/red.png" alt="">
        <img id="green" onclick="chooseColor('green')" class="colors" src="/assets/img/green.png" alt="">
        <img id="orange" onclick="chooseColor('orange')" class="colors" src="/assets/img/orange.png" alt="">
        <img id="purple" onclick="chooseColor('purple')" class="colors" src="/assets/img/purple.png" alt="">
        <img id="blue" onclick="chooseColor('blue')" class="colors" src="/assets/img/blue.png" alt="">
    </div>      
    `;
}

function chooseColor(colorOfCategory) {
    document.getElementById('turquoise').classList.remove('color-box-hover');
    document.getElementById('red').classList.remove('color-box-hover');
    document.getElementById('green').classList.remove('color-box-hover');
    document.getElementById('orange').classList.remove('color-box-hover');
    document.getElementById('purple').classList.remove('color-box-hover');
    document.getElementById('blue').classList.remove('color-box-hover');

    color = colorOfCategory;
    let id = colorOfCategory;
    document.getElementById(id).classList.add('color-box-hover');

}

function pushNewCategory() {
    let newcCategoryName = document.getElementById('input-category').value;


    let newCategory = {
        'categoryName': newcCategoryName,
        'categoryColor': color,
    };



    allCategories.push(newCategory);

    saveCategory();
    loadAllCategories();
    acceptNewCategory(`${newcCategoryName}`);
    ;

}

function renderCategoryBox(i) {
    document.getElementById('category').innerHTML = '';
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <img onclick="renderCategories()" class="arrow-icon" src="/assets/img/arrow-down.png" alt="">
    <div onclick="renderCategories()" id="category-box" class="category-box-standard">
        <p class="select-category">Select task category</p>
        
    </div>
    `;
}

/*
function choosePrio(prio) {
    if (prio == 1) {
        selectionPrio = 1
    }
    if (prio == 2) {
        selectionPrio = 2
    }
    if (prio == 3) {
        selectionPrio = 3
    }
}
*/

function renderContacts() {
    loadAllContacts();

    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span><br><br>
    <img onclick="renderContactBox()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">
    <div   id="contact-box" class="category-box">
        <p onclick="renderContactBox()" class="select-category">Select contacts to assign</p>
        <div onclick="openInputContact()" class="selection-category">
            <div>Invite new contact</div>
            <img src="/assets/img/contact-logo.png" alt="">
        </div>
    </div>
    <div id="contact-icons"></div>
    `;

    for (let i = 0; i < allContacts.length; i++) {
        actualyContact = allContacts[i];
        let contactFirstname = allContacts[i]['firstName'];
        let contactLastName = allContacts[i]['name'];
        /*let firstLetter = allContacts[i]['firstName'].charAt(0);
        let secondLetter = allContacts[i]['name'].charAt(0);

        let color = allCategories[i]['color'];*/
        let newContact = document.getElementById('contact-box');

        newContact.innerHTML += /*html*/ `
            <div id="selection-contacts${i}" class="selection-contacts">
                <div id="contact${i}" >${contactFirstname}  ${contactLastName}</div>
                <img id="checkbox${i}" onclick="acceptContact(${i})" class="checkbox" src="/assets/img/checkbox-contact.png" alt="">
            </div>
        `
    }


}

/*
function acceptContact(i) {
    selectedContact = document.getElementById(`contact${i}`);
    document.getElementById('assignedTo').innerHTML =  `
    <span>Assigned to</span><br><br>
    <img onclick="renderContacts()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">
    <div onclick="renderContacts()" id="contact-box" class="category-box">
                        <p class="select-category">${selectedContact.innerHTML}</p>
                    </div>
    `;
}
*/

function acceptContact(i) {
    selectedContact = document.getElementById(`contact${i}`);
    document.getElementById(`checkbox${i}`).src = "/assets/img/checkbox-contact-full.png";



/*
    let shortName = document.getElementById('contact-icons').value
    document.getElementById(`assignedTo${i}`).innerHTML = /*html `
    <div>${shortName}</div>
    `;*/
}


function openInputContact() {
    document.getElementById('assignedTo').innerHTML = '';
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span><br><br>
    <img class="arrow-d-none" src="/assets/img/arrow-down.png" alt="">
    <input id="input-contact" onkeyup="filterContacts()" placeholder="Search New contact..." class="addTotaskInputField" type="text">
    
    <div id="input-nav-box-contact" class="input-nav-box">
                            <img onclick="renderContactBox()" class="x-black" src="/assets/img/x-black.png">
                            <img class="line" src="/assets/img/line.png">
                            <img onclick="pushNewContact()" class="hook" src="/assets/img/hook.png">
                        </div>
    <div id="searched-emails" class="searched-emails"></div>
    
    `;

    document.getElementById('searched-emails').classList.add('d-none');
}

function pushNewContact() {


    allContacts.push(currentContact);

    saveContact();
    loadAllContacts();

    document.getElementById('input-contact').value = '';

}

function renderContactBox(i) {
    document.getElementById('assignedTo').innerHTML = '';
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span><br><br>
    <img onclick="renderContacts()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">
    <div onclick="renderContacts()" id="contact-box" class="category-box">
                        <p class="select-category">Select contact to assign</p>
                    </div>
    `;
}





/*
function filterContacts() {
    let search = document.getElementById('searchPokemon').value;
    hideDarkmodeBox(search);
    search = search.toLowerCase();
    document.getElementById('pokedex').innerHTML = '';
    for (let i = 0; i < allpokemon.length; i++) {
        currentPokemon = allPokemon[i];
        
        updateGlobalVaribles();
        if (currentPokemon['name'].toLowerCase().includes(search))
        renderPokemonCardFilter(i);
    }
}*/

function filterContacts() {
    document.getElementById('searched-emails').classList.remove('d-none');
    let search = document.getElementById('input-contact').value;
    //hideDarkmodeBox(search);
    search = search.toLowerCase();

    document.getElementById('searched-emails').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        currentContact = contacts[i];
        currentContactMail = currentContact['mail'];


        if (currentContactMail.toLowerCase().includes(search)) {
            renderSearchedContacts(i, currentContactMail);
        }

    }

}


function renderSearchedContacts(i, currentContactMail) {
    document.getElementById('searched-emails').innerHTML += /*html*/ `
    <div onclick="takeEmail(${i})" class="selection-contacts">
        <div id="contact${i}" >${currentContactMail}</div>
    </div>
`
}

function takeEmail(i) {
    let takenEmail = document.getElementById(`contact${i}`).innerHTML;
    currentContact = contacts[i];
    document.getElementById('input-contact').value = takenEmail;
    document.getElementById('searched-emails').classList.add('d-none');

}













function renderPrios() {
    document.getElementById('prio').innerHTML = /*html*/ `
    <span>Prio</span><br><br>
                    <div class="prio-box">
                        <div id="prio-urgent" onclick="choosePrio('urgent', 'arrows-up')" class="prio-icon">
                            <p class="margin-none no-scale">Urgent</p>
                            <img id="icon-urgent" class="prio-icons" src="/assets/img/Urgent-solo.png">
                        </div>
                        <div id="prio-medium" onclick="choosePrio('medium', 'equal-white')" class="prio-icon ">
                            <p class="margin-none no-scale">Medium</p>
                            <img id="icon-medium" class="prio-icon-medium" src="/assets/img/Medium-Solo.png" alt="">
                        </div>
                        <div id="prio-low" onclick="choosePrio('low', 'arrow-down-white')" class="prio-icon">
                            <p class="margin-none no-scale">Low</p>
                            <img id="icon-low" class="prio-icons" src="/assets/img/Low-solo.png" alt="">
                        </div>
                    </div>
    `
}

function resetPrios() {
    document.getElementById('prio').innerHTML = /*html*/ `
    <span>Prio</span><br><br>
                    <div class="prio-box">
                        <div id="prio-urgent" onclick="renderPrios();" class="prio-icon">
                            <p class="margin-none no-scale">Urgent</p>
                            <img id="icon-urgent" class="prio-icons" src="/assets/img/Urgent-solo.png">
                        </div>
                        <div id="prio-medium" onclick="renderPrios();" class="prio-icon ">
                            <p class="margin-none no-scale">Medium</p>
                            <img id="icon-medium" class="prio-icon-medium" src="/assets/img/Medium-Solo.png" alt="">
                        </div>
                        <div id="prio-low" onclick="renderPrios();" class="prio-icon">
                            <p class="margin-none no-scale">Low</p>
                            <img id="icon-low" class="prio-icons" src="/assets/img/Low-solo.png" alt="">
                        </div>
                    </div>
    `
}

function choosePrio(prio, img) {
    resetPrios();
    let prioId = document.getElementById(`prio-${prio}`);
    let icon = document.getElementById(`icon-${prio}`);
    prioId.classList.add(`${prio}`);
    icon.src = `/assets/img/${img}.png`;
    priority = prio;
}










function saveTask() {
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}

function saveCategory() {
    let allCategoriesAsString = JSON.stringify(allCategories);
    localStorage.setItem('allCategories', allCategoriesAsString);
}



function loadAllCategories() {
    let allCategoriesAsString = localStorage.getItem('allCategories');
    if (allCategoriesAsString) {
        allCategories = JSON.parse(allCategoriesAsString);
    }
}

function saveContact() {
    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}

function loadAllContacts() {
    let allContactsAsString = localStorage.getItem('allContacts');
    if (allContactsAsString) {
        allContacts = JSON.parse(allContactsAsString);
    }
}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    if (allTasksAsString) {
        allTasks = JSON.parse(allTasksAsString);
    }
}






















function openSubTaskMask() {
    document.getElementById('subTaskPopUp').classList.remove('d-none');
}


function closeSubTask() {
    document.getElementById('subTaskPopUp').classList.add('d-none');
}


function addTaskFromSubTask() {
    let title = document.getElementById('titleSubMask');
    let description = document.getElementById('descriptionSubMask');
    let date = document.getElementById('dateSubMask');


    let task = {
        'titleSubMask': title.value,
        'descriptionSubMask': description.value,
        'dateSubMask': date.value,
    };

    console.log(task);


    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}