

let allTasks = [];
let selectionPrio;
let allCategories = [];
let allContacts = [];
let color;
let currentCategory;
let currentContact;
let category;
let priority;
let selectedContacts = [];
let allSubTasks = [];
let urgentTasksCount;
let currentContactStat;
let currentCategoryStat;
let currentPrioStat;


async function onload() {
    //await deleteSelectedAllContacts();

    await init();
    await deleteSelectedAllContacts();



    selectedContacts = 0;
    //await deleteAllSelectedContact();
    //deleteAllTasks();
    //selectedContacts = [];
    allSubTasks = [];


    renderCategoryBox();
    renderContactBox();
    renderPrios();
    renderSubTask();

    clock();
}

async function reset() {
    //await deleteAllTasks();
    //deleteAllSubTasks();
    await deleteSelectedAllContacts();

    //await deleteAllCategories();
    //await deleteAllCountsForSummery();

    selectedContacts = 0;
    allSubTasks = [];
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('input-SubTask').value = '';
    document.getElementById('contact-icons').innerHTML = '';

    renderCategoryBox();
    renderContactBox();
    renderPrios();
    renderSubTask();
}


function countOfAllUrgentTasks() {
    let allUrgentTasks = allTasks.filter(t => t['priority'] == 'urgent');
    urgentTasksCount = allUrgentTasks.length;

    deleteUrgentTasksCount();
    saveUrgentTasksCount(urgentTasksCount);
}

function countOfAllTasks() {
    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    let doneBox = allTasks.filter(t => t['split'] == 'done-box');


    doneBoxCount = doneBox.length;
    deleteDoneBoxCount();
    saveDoneBoxCount(doneBoxCount);


    feedbackBoxCount = feedbackBox.length;
    deleteFeedbackBoxCount();
    saveFeedbackBoxCount(feedbackBoxCount);



    inprogressBoxCount = inprogressBox.length;
    deleteInprogressBoxCount();
    saveInprogressBoxCount(inprogressBoxCount);


    todoCount = todo.length;
    deleteTodoCount();
    saveTodoCount(todoCount);
}



function clock() {
    var date = new Date();
    currentDate = date.toISOString().slice(0, 10);
    document.getElementById('date').value = currentDate;
}


function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');

    let task = {
        'id': allTasks.length,
        'title': title.value,
        'description': description.value,
        'date': date.value,
        'category': category,
        'categoryColor': color,
        'priority': priority,
        'AssignedTo': selectedContacts,
        'subTasks': allSubTasks,
        'split': 'todo-box',
    };

    saveTask(task);
    countOfAllUrgentTasks();
    reset();
}


async function reset() {
    //await deleteAllTasks();
    //deleteAllSubTasks();
    await deleteSelectedAllContacts();

    //await deleteAllCategories();
    //await deleteAllCountsForSummery();

    selectedContacts = 0;
    allSubTasks = [];
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('input-SubTask').value = '';
    document.getElementById('contact-icons').innerHTML = '';

    renderCategoryBox();
    renderContactBox();
    renderPrios();
    renderSubTask();

}

function checkFormValidation() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;

    if (title == 0) {
        showSuccessPopUp('Gib einen Titel ein!');
    } else if (description == 0) {
        showSuccessPopUp('Gib eine Beschreibung ein!');
    } else if (!currentCategoryStat) {
        showSuccessPopUp('Wähle eine Kategorie!');
    } else if (!currentContactStat) {
        showSuccessPopUp('Wähle einen Kontakt!');
    } else if (date == 0) {
        showSuccessPopUp('Wähle ein Datum!');
    } else if (!currentPrioStat) {
        showSuccessPopUp('Wähle eine Priorität!');
    } else if (currentPrioStat) {
        addTask();
    }
}

function showSuccessPopUp(content) {
    let modal = document.getElementById('popup-addTask');
    modal.style.display = 'block';
    document.getElementById('popup-addTask').classList.remove('d-none');
    document.getElementById('popup-content').innerHTML = /*html*/ `
    <h3>${content}</h3>
    `
}

function closeSuccessPopUp() {
    document.getElementById('popup-addTask').classList.add('d-none');
}



function renderCategories() {
    currentCategoryStat = false;
    color = false;
    category = false;
    let categorySection = document.getElementById('category');

    categorySection.innerHTML = renderCategoriesTemplate();
    renderEveryCategory();
}

function renderEveryCategory() {
    for (let i = 0; i < allCategories.length; i++) {
        currentCategory = allCategories[i];
        let category = currentCategory['categoryName'];
        color = currentCategory['categoryColor']
        let categoryBox = document.getElementById('category-box');

        categoryBox.innerHTML += /*html*/ `
            <div onclick="acceptCategory(${i})" class="selection-category">
                <div id="category${i}" >${category}</div>
                <img class="colors" src="/assets/img/${color}.png" alt="">
            </div>
        `
    }
}

function acceptCategory(i) {
    currentCategory = allCategories[i];
    currentCategoryStat = true;
    category = currentCategory['categoryName'];
    color = currentCategory['categoryColor'];
    let newCategory = document.getElementById('category');

    newCategory.innerHTML = templateAcceptCategory();
}

function acceptNewCategory() {
    currentCategoryStat = true;
    let newCategory = document.getElementById('category');

    newCategory.innerHTML = templateAcceptNewCategory();
}


function openInput() {
    currentCategoryStat = true;
    color = false;
    category = false;
    let categorySection = document.getElementById('category');

    categorySection.innerHTML = '';
    categorySection.innerHTML= templateOpenInput();
}

function chooseColor(colorOfCategory) {
    allColors();
    color = colorOfCategory;
    let id = colorOfCategory;
    document.getElementById(id).classList.add('color-box-hover');
}

function allColors() {
    document.getElementById('turquoise').classList.remove('color-box-hover');
    document.getElementById('red').classList.remove('color-box-hover');
    document.getElementById('green').classList.remove('color-box-hover');
    document.getElementById('orange').classList.remove('color-box-hover');
    document.getElementById('purple').classList.remove('color-box-hover');
    document.getElementById('blue').classList.remove('color-box-hover');
}


function pushNewCategory() {
    category = document.getElementById('input-category').value;
    currentCategoryStat = true;

    if (!category) {
        showSuccessPopUp('Wähle eine Kategory!');
    } else if (!color) {
        showSuccessPopUp('Wähle eine Farbe!');
    } else if (color) {
        newCategory();
    }
}

function newCategory() {
    let newCategory = {
        'categoryName': category,
        'categoryColor': color,
    };
    saveCategory(newCategory);
    acceptNewCategory();
    ;
}


function renderCategoryBox() {
    currentCategoryStat = false;
    color = false;
    category = false;
    let categorySection = document.getElementById('category');

    categorySection.innerHTML = '';
    categorySection.innerHTML = templateRenderCategoryBox();
}



function renderContacts() {
    deleteAllSelectedContact();
    let assignedTo = document.getElementById('assignedTo');
    assignedTo.innerHTML = templateRenderContacts();

    for (let i = 0; i < allContacts.length; i++) {
        actualyContact = allContacts[i];
        let contactFirstname = actualyContact['firstName'];
        let contactLastName = actualyContact['name'];
        let newContact = document.getElementById('contact-box');
        newContact.innerHTML += templateNewContact(contactFirstname, contactLastName, i);
    }

    selectedContacts = [];
}


function acceptContact(i) {
    currentContactStat = true;

    currentContact = allContacts[i];
    let contactFirstname = currentContact['firstName'];
    let contactLastName = currentContact['name'];


    document.getElementById(`selection-contacts${i}`).innerHTML = /*html*/ `
    <div id="contact${i}" >${contactFirstname}  ${contactLastName}</div>
    <img id="checkbox${i}" onclick="acceptNotContact(${i})" class="checkbox" src="/assets/img/checkbox-contact-full.png" alt="">
    `
    pushSelctedContact(currentContact);
    renderContactIcon();
}

function renderContactIcon() {
    document.getElementById('contact-icons').innerHTML = '';

    for (let i = 0; i < selectedContacts.length; i++) {
        currentSelectedContact = selectedContacts[i];
        let firstLetter = selectedContacts[i]['firstName'].charAt(0);
        let secondLetter = selectedContacts[i]['name'].charAt(0);
        let contactIcons = document.getElementById('contact-icons');
        let contactColor = selectedContacts[i]['color'];


        contactIcons.innerHTML += /*html*/ `
            <div id="contact-icon${i}" class="contact-icon" style ="background-color: ${contactColor}">${firstLetter}${secondLetter}</div>
        `
    }
}


function acceptNotContact(i) {
    currentContactStat = false;
    selectedContacts = 0;
    saveSelectedContact(i);

    renderContacts();

}

function pushSelctedContact(currentContact) {

    saveSelectedContact(currentContact);
    //loadSelectedAllContacts();
}

function deleteAllSelectedContact() {
    selectedContacts = 0;
    currentSelectedContact = [];
    /*saveSelectedContact();*/
}


function openInputContact() {
    document.getElementById('assignedTo').innerHTML = '';
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span>
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
    saveContact(currentContact);
    //loadAllContacts();
    document.getElementById('input-contact').value = '';
}


function renderContactBox() {
    document.getElementById('assignedTo').innerHTML = '';
    document.getElementById('assignedTo').innerHTML = /*html*/ `
    <span>Assigned to</span>
        <div onclick="renderContacts()" id="contact-box" class="render-category-box">
            <p class="select-category">Select contacts to assign</p>
            <img onclick="renderContacts()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">

        </div>
        <div id="contact-icons" class="contact-icons"></div>
    `;


    if (selectedContacts.length > 0) {
        renderContactIcon();
    }

}


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
    currentPrioStat = false;

    document.getElementById('prio').innerHTML = /*html*/ `
    <span>Prio</span>
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
    currentPrioStat = false;
    document.getElementById('prio').innerHTML = /*html*/ `
    <span>Prio</span>
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
    currentPrioStat = true;
    let prioId = document.getElementById(`prio-${prio}`);
    let icon = document.getElementById(`icon-${prio}`);
    prioId.classList.add(`${prio}`);
    icon.src = `/assets/img/${img}.png`;
    priority = prio;
}



function renderSubTask() {
    document.getElementById('subtask').innerHTML = '';
    document.getElementById('subtask').innerHTML = /*html*/ `
    <span>Subtasks</span>
    <input id="input-SubTask" placeholder="Add new subtask..." class="addTotaskInputField" type="text">
    
    <div id="input-nav-box-Subtask" class="input-nav-box">
        <img onclick="clearInputField()" class="x-black" src="/assets/img/x-black.png">
        <img class="line" src="/assets/img/line.png">
        <img onclick="pushNewSubTask()" class="hook" src="/assets/img/hook.png">
    </div>
    <div id="allSubtasks" class="allSubtasks"></div>
    
    `;
}

function clearInputField() {
    document.getElementById('input-SubTask').value = '';
}

function pushNewSubTask() {
    let currentSubTask = document.getElementById('input-SubTask').value;

    saveSubTasks(currentSubTask);
    document.getElementById('input-SubTask').value = '';
    renderAllSubTasks();

}


function renderAllSubTasks() {
    document.getElementById('allSubtasks').innerHTML = '';

    for (let i = 0; i < allSubTasks.length; i++) {
        currentSubTask = allSubTasks[i];
        let toDo = allSubTasks[i];


        document.getElementById('allSubtasks').innerHTML += /*html*/ `
        <div class="subtask-box">
            <img class="checkbox-empty" src="/assets/img/checkbox-emoty.png" alt="">
            <div id="todo${i}" class="todo">${toDo}</div>
        </div>
        `
    }
}








async function saveTask(task) {
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}

async function saveAllTasks() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


async function saveCategory(newCategory) {
    allCategories.push(newCategory);
    await backend.setItem('allCategories', JSON.stringify(allCategories));
}

async function saveContact(currentContact) {
    allContacts.push(currentContact);
    await backend.setItem('allContacts', JSON.stringify(allContacts));
}

async function saveSelectedContact(currentContact) {
    selectedContacts.push(currentContact);
    await backend.setItem('selectedContacts', JSON.stringify(selectedContacts));
}


async function saveSubTasks(currentSubTask) {
    allSubTasks.push(currentSubTask);
    await backend.setItem('allSubTasks', JSON.stringify(allSubTasks));
}







function loadAllSubTasks() {
    let allSubTasksAsString = localStorage.getItem('allSubTasks');
    if (allSubTasksAsString) {
        allSubTasks = JSON.parse(allSubTasksAsString);
    }
}

function loadAllCategories() {
    let allCategoriesAsString = localStorage.getItem('allCategories');
    if (allCategoriesAsString) {
        allCategories = JSON.parse(allCategoriesAsString);
    }
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

function loadSelectedAllContacts() {
    let allSelectedContactsAsString = localStorage.getItem('selectedContacts');
    if (allSelectedContactsAsString) {
        selectedContacts = JSON.parse(allSelectedContactsAsString);
    }
}


async function deleteAllTasks() {
    await backend.deleteItem('allTasks');
}

async function deleteTask(task) {
    await backend.deleteItem('allTasks' / task);
}


async function deleteAllSubTasks() {
    await backend.deleteItem('allSubTasks');
}

async function deleteSelectedAllContacts() {
    await backend.deleteItem('selectedContacts');
}

async function deleteAllCategories() {
    await backend.deleteItem('allCategories');
}

async function deleteAllCountsForSummery() {
    await backend.deleteItem('todoCount');
    await backend.deleteItem('inprogressBoxCount');
    await backend.deleteItem('feedbackBoxCount');
    await backend.deleteItem('doneBoxCount');
    await backend.deleteItem('urgentTasksCount');
}

function deleteAllSubTasks() {
    allSubTasks = [];
    /*saveSubTasks();*/
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