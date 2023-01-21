let allTasks = [];
let selectionPrio;
let allCategories = [];
let allContacts = [];


function onload() {
    loadAllTasks();
    loadAllContacts();
    renderCategoryBox();
    renderContactBox();
    clock();
}

function clock(){
var date = new Date();
var currentDate = date.toISOString().slice(0,10);

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
        'categorySelect': selectionCategory.value,
        'prioSelect': selectionPrio,
    };
    allTasks.push(task);

    saveTask();
}



function renderCategories() {
    loadAllCategories();

    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <div  id="category-box" class="category-box">
        <p onclick="renderCategoryBox()" class="select-category">Select task category</p>
        <div onclick="openInput()" class="selection-category">
            <div>New category</div>
        </div>
    </div>
    `;

    for (let i = 0; i < allCategories.length; i++) {
        currentCategory = allCategories[i];
        let category = allCategories[i]['categoryName'];
        /*let color = allCategories[i]['color'];*/
        let newCategory = document.getElementById('category-box');

        newCategory.innerHTML += /*html*/ `
            <div class="selection-category">
                <div id="category${i}" onclick="acceptCategory(${i})">${category}</div>
            </div>
        `
    }
}

function acceptCategory(i) {
    selectedCategory = document.getElementById(`category${i}`);
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <div onclick="renderCategories()" id="category-box" class="category-box">
                        <p class="select-category">${selectedCategory.innerHTML}</p>
                    </div>
    `;
}


function openInput() {
    document.getElementById('category').innerHTML = '';
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <input id="input-category"  placeholder="New category name" class="addTotaskInputField" type="text">
    <div id="input-nav-box" class="input-nav-box">
                            <img onclick="renderCategoryBox()" class="x-black" src="/assets/img/x-black.png">
                            <img class="line" src="/assets/img/line.png">
                            <img onclick="pushNewCategory()" class="hook" src="/assets/img/hook.png">
                        </div>
    `;
}

function pushNewCategory() {
    let categoryName = document.getElementById('input-category');

    let newCategory = {
        'categoryName': categoryName.value,
    };



    allCategories.push(newCategory);

    saveCategory();
    loadAllCategories();

    document.getElementById('input-category').value = '';

}

function renderCategoryBox(i) {
    document.getElementById('category').innerHTML = '';
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <div onclick="renderCategories()" id="category-box" class="category-box">
                        <p class="select-category">Select task category</p>
                    </div>
    `;
}

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

function renderContacts() {
    loadAllContacts();

    document.getElementById('assignedTo').innerHTML = /*html*/ `
        <span>Assigned to</span><br><br>
    <div  id="contact-box" class="category-box">
        <p onclick="renderContactBox()" class="select-category">Select contacts to assign</p>
        <div onclick="openInputContact()" class="selection-category">
            <div>Invite new contact</div>
        </div>
    </div>
    `;

    for (let i = 0; i < allContacts.length; i++) {
        currentContact = allContacts[i];
        let contact = allContacts[i]['contactName'];
        /*let color = allCategories[i]['color'];*/
        let newContact = document.getElementById('contact-box');

        newContact.innerHTML += /*html*/ `
            <div class="selection-contacts">
                <div id="contact${i}" onclick="acceptContact(${i})">${contact}</div>
                <input type="checkbox" id="assignedTo${i}" name="assignedTo${i}" value="assignedTo${i}">
            </div>
        `
    }
}

function acceptContact(i) {
    selectedContact = document.getElementById(`contact${i}`);
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span><br><br>
    <div onclick="renderContacts()" id="contact-box" class="category-box">
                        <p class="select-category">${selectedContact.innerHTML}</p>
                    </div>
    `;
}


function openInputContact() {
    document.getElementById('assignedTo').innerHTML = '';
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span>
    <input id="input-contact"  placeholder="New contact" class="addTotaskInputField" type="text">
    <div id="input-nav-box-contact" class="input-nav-box">
                            <img onclick="renderContactBox()" class="x-black" src="/assets/img/x-black.png">
                            <img class="line" src="/assets/img/line.png">
                            <img onclick="pushNewContact()" class="hook" src="/assets/img/hook.png">
                        </div>
    `;
}

function pushNewContact() {
    let contactName = document.getElementById('input-contact');

    let newContact = {
        'contactName': contactName.value,
    };

    allContacts.push(newContact);

    saveContact();
    loadAllContacts();

    document.getElementById('input-contact').value = '';

}

function renderContactBox(i) {
    document.getElementById('assignedTo').innerHTML = '';
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span><br><br>
    <div onclick="renderContacts()" id="contact-box" class="category-box">
                        <p class="select-category">Select contact to assign</p>
                    </div>
    `;
}

function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
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