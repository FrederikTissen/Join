
let currentDragedElement;
let todoCount;
let inprogressBoxCount;
let feedbackBoxCount;
let doneBoxCount;

async function includeHTMLaddTask() {
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
    onload();
}



function addNewTask() {

    document.getElementById('show-addTaskInclude').innerHTML = /*html*/ `
        <div w3-include-html="add-TaskInclude.html" ></div>`;



    includeHTMLaddTask();
}

function generateHTML(element, index) {

    let title = element['title'];
    let description = element['description'];
    let priority = element['priority'];
    let category = element['category'];
    let categoryColor = element['categoryColor'];




    return /*html*/ `
            <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="openShowTask(${element['id']})" class="current-task">
                <div class="current-Task-Category ${categoryColor}">${category}</div>
                <p class="task-title">${title}</p>
                <p class="task-decription">${description}</p>
                <div class="progress-bar-row">
                    <div class="progress-bar"></div>
                    <p class="margin-none">0/3 Done</p>
                </div>
                <div class="assignedto-prio-row">
                    <div id="assigned-to-currentTask${element['id']}" class="assigned-to-currentTask" ></div>
                    <img class="current-Task-Prio" src="/assets/img/${priority}-solo.png" alt="">
                </div>
            </div>
        `

}

async function onloadBoard() {
    //await deleteSelectedAllContacts();

    await init();
    updateHTML();
}

function updateHTML() {
    //loadAllTasks();


    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    //todoCount = todo.length;
    //deleteTodoCount();
    //saveTodoCount(todoCount);
    document.getElementById('todo-box').innerHTML = '';
    for (let index = 0; index < todo.length; index++) {
        const currentTask = todo[index];
        document.getElementById('todo-box').innerHTML += generateHTML(currentTask);
        renderAssignedTo(currentTask);
    }

    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    //inprogressBoxCount = inprogressBox.length;
    //deleteInprogressBoxCount();
    //saveInprogressBoxCount(inprogressBoxCount);
    document.getElementById('inprogress-box').innerHTML = '';
    for (let index = 0; index < inprogressBox.length; index++) {
        const currentTask = inprogressBox[index];
        document.getElementById('inprogress-box').innerHTML += generateHTML(currentTask);
        renderAssignedTo(currentTask);
    }

    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    //feedbackBoxCount = feedbackBox.length;
    //deleteFeedbackBoxCount();
    //saveFeedbackBoxCount(feedbackBoxCount);
    document.getElementById('feedback-box').innerHTML = '';
    for (let index = 0; index < feedbackBox.length; index++) {
        const currentTask = feedbackBox[index];
        document.getElementById('feedback-box').innerHTML += generateHTML(currentTask);
        renderAssignedTo(currentTask);

    }

    let doneBox = allTasks.filter(t => t['split'] == 'done-box');
    //doneBoxCount = doneBox.length;
    //deleteDoneBoxCount();
    //saveDoneBoxCount(doneBoxCount);
    document.getElementById('done-box').innerHTML = '';
    for (let index = 0; index < doneBox.length; index++) {
        const currentTask = doneBox[index];
        document.getElementById('done-box').innerHTML += generateHTML(currentTask);
        renderAssignedTo(currentTask);
    }


    countOfAllUrgentTasks();
    countOfAllTasks();
}

async function saveTodoCount(todoCount) {
    await backend.setItem('todoCount', JSON.stringify(todoCount));
}
async function deleteTodoCount() {
    await backend.deleteItem('todoCount');
}

async function saveInprogressBoxCount(inprogressBoxCount) {
    await backend.setItem('inprogressBoxCount', JSON.stringify(inprogressBoxCount));
}
async function deleteInprogressBoxCount() {
    await backend.deleteItem('inprogressBoxCount');
}


async function saveFeedbackBoxCount(feedbackBoxCount) {
    await backend.setItem('feedbackBoxCount', JSON.stringify(feedbackBoxCount));
}
async function deleteFeedbackBoxCount() {
    await backend.deleteItem('feedbackBoxCount');
}

async function saveDoneBoxCount(doneBoxCount) {
    await backend.setItem('doneBoxCount', JSON.stringify(doneBoxCount));
}
async function deleteDoneBoxCount() {
    await backend.deleteItem('doneBoxCount');
}

async function saveUrgentTasksCount(urgentTasksCount) {
    await backend.setItem('urgentTasksCount', JSON.stringify(urgentTasksCount));
}
async function deleteUrgentTasksCount() {
    await backend.deleteItem('urgentTasksCount');
}







function startDragging(i) {

    currentDragedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(split) {

    allTasks[currentDragedElement]['split'] = split;
    //saveTask();

    saveAllTasks();
    updateHTML();



}




function renderAssignedTo(element) {

    let AssignedTo = element['AssignedTo'];

    document.getElementById(`assigned-to-currentTask${element['id']}`).innerHTML = '';

    for (let j = 0; j < AssignedTo.length; j++) {
        let thisContact = AssignedTo[j];
        let firstLetter = thisContact['firstName'].charAt(0);
        let secondLetter = thisContact['name'].charAt(0);
        let contactColor = thisContact['color'];


        document.getElementById(`assigned-to-currentTask${element['id']}`).innerHTML += /*html*/`
        <div class="contact-in-task" style ="background-color: ${contactColor}">${firstLetter}${secondLetter}</div>
        `;
    }
}



function openShowTask(i) {
    let title = allTasks[`${i}`]['title'];
    let description = allTasks[`${i}`]['description'];
    let date = allTasks[`${i}`]['date'];
    let priority = allTasks[i]['priority'];
    let category = allTasks[i]['category'];
    let categoryColor = allTasks[i]['categoryColor'];
    let assignedTo = allTasks[i]['AssignedTo'];

    let subTask = allTasks[i]['subTasks'];
    let firstChar = priority.charAt(0);
    let capitalizedPriority = priority.replace(firstChar, firstChar.toUpperCase());

    if (priority == "urgent") {
        priorityImg = 'arrows-up';
    }

    if (priority == "medium") {
        priorityImg = 'equal-white';
    }

    if (priority == "low") {
        priorityImg = 'arrow-down-white';
    }


    document.getElementById('show-Task-Background').classList = 'show-Task-Background';

    document.getElementById('showTask').innerHTML = /*html*/ `
                <div class="showTask-Category ${categoryColor}">${category}</div>
                <div class="showTask-exitButton"><img onclick="closeShowTask()" src="/assets/img/exit.png" alt=""></div>
                <h3 class="showTask-title">${title}</h3>
                <p class="showTask-description">${description}</p>
                <p class="showTask-headers">Due date: ${date}</p>
                <div class="priority-bar-row showTask-headers" >Priority: 
                    <div id="prio-full-task" class="showTask-headers prio-full-task ${priority}-full-task">
                        <p class="margin-none no-scale ">${capitalizedPriority}</p>
                        <img id="icon-prio" class="icon-full-task" src="/assets/img/${priorityImg}.png">
                    </div>
                </div>
                <p class="showTask-headers">Subtasks:</p>
                <div id="subTask-box" class="showTask-subtasks"></div>
                <p class="showTask-headers">Assigned To:</p>
                <div id="assigned-box" ></div>
                <div id="modify-task" class="modyfy-button" ><img src="/assets/img/edit-button.png" alt=""></div>

    `
    renderAssignedBox(assignedTo);
    renderSubTaskBox(subTask);
}

function renderSubTaskBox(subTask) {
    document.getElementById('subTask-box').innerHTML = '';

    for (let i = 0; i < subTask.length; i++) {
        currentSubTask = subTask[i];

        subTaskBox = document.getElementById('subTask-box');
        subTaskBox.innerHTML += /*html*/ `
        <div class="assigned-box">
            <input id="subTaskCheck${i}" onclick="check(${i}, currentSubTask)" type="checkbox">
            <div id="subTask${i}" >${currentSubTask}</div>
        </div>
        `
    }
}


function check(i) {
    let subTaskCheckbox = document.getElementById(`subTaskCheck${i}`);
    let subTaskTitle = document.getElementById(`subTask${i}`);

    if (subTaskCheckbox.checked) {
        subTaskCheckbox.setAttribute('checked', true);
        subTaskTitle.classList.add('line-throug');
    } else {
        subTaskCheckbox.removeAttribute('checked');
        subTaskTitle.classList.remove('line-throug');
    }

}


function renderAssignedBox(assignedTo) {
    document.getElementById('assigned-box').innerHTML = '';
    for (let i = 0; i < assignedTo.length; i++) {
        currentPerson = assignedTo[i];
        let firstLetter = currentPerson['firstName'].charAt(0);
        let secondLetter = currentPerson['name'].charAt(0);
        let firstName = currentPerson['firstName'];
        let lastName = currentPerson['name'];
        let AssignedToBox = document.getElementById('assigned-box');
        let contactColor = currentPerson['color'];



        AssignedToBox.innerHTML += /*html*/ `
        <div class="assigned-box">
            <div id="assigned-icon${i}" class="assigned-icon" style ="background-color: ${contactColor}">${firstLetter}${secondLetter}</div>
            <div id="assigned-name">${firstName} ${lastName}</div>
        </div>
        `
    }
}



function updateSearchedHTML() {
    loadAllTasks();

    let search = document.getElementById('search-task').value;
    search = search.toLowerCase();

    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    document.getElementById('todo-box').innerHTML = '';
    for (let index = 0; index < todo.length; index++) {
        const currentTask = todo[index];
        let currentTitle = currentTask['title'];
        if (currentTitle.toLowerCase().includes(search)) {
            document.getElementById('todo-box').innerHTML += generateHTML(currentTask);
            renderAssignedTo(currentTask);
        }

    }

    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    document.getElementById('inprogress-box').innerHTML = '';
    for (let index = 0; index < inprogressBox.length; index++) {
        const currentTask = inprogressBox[index];
        let currentTitle = currentTask['title'];
        if (currentTitle.toLowerCase().includes(search)) {
            document.getElementById('inprogress-box').innerHTML += generateHTML(currentTask);
            renderAssignedTo(currentTask);
        }
    }

    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    document.getElementById('feedback-box').innerHTML = '';
    for (let index = 0; index < feedbackBox.length; index++) {
        const currentTask = feedbackBox[index];
        let currentTitle = currentTask['title'];
        if (currentTitle.toLowerCase().includes(search)) {
            document.getElementById('feedback-box').innerHTML += generateHTML(currentTask);
            renderAssignedTo(currentTask);
        }
    }

    let doneBox = allTasks.filter(t => t['split'] == 'done-box');
    document.getElementById('done-box').innerHTML = '';
    for (let index = 0; index < doneBox.length; index++) {
        const currentTask = doneBox[index];
        let currentTitle = currentTask['title'];
        if (currentTitle.toLowerCase().includes(search)) {
            document.getElementById('done-box').innerHTML += generateHTML(currentTask);
            renderAssignedTo(currentTask);
        }
    }

}



/*
function filterTasks() {
    //document.getElementById('searched-emails').classList.remove('d-none');
    let search = document.getElementById('search-task').value;
    //hideDarkmodeBox(search);
    search = search.toLowerCase();

    document.getElementById('todo-box').innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        let currentTask = allTasks[i];
        let currentTitle = currentTask['title'];
        let description = currentTask['description'];
        let priority = currentTask['priority'];
        let category = currentTask['category'];
        let categoryColor = currentTask['categoryColor'];


        if (currentTitle.toLowerCase().includes(search)) {
            renderSearchedTasks(i, currentTitle, description, priority, category, categoryColor);
        }
    }

}

function renderSearchedTasks(i, currentTitle, description, priority, category, categoryColor) {
    document.getElementById('todo-box').innerHTML += /*html `

     
            <div draggable="true" onclick="openShowTask(${i})" class="current-task">
                <div class="current-Task-Category ${categoryColor}">${category}</div>
                <p>${currentTitle}</p>
                <p class="margin-none">${description}</p>
                <div class="progress-bar-row">
                    <div class="progress-bar"></div>
                    <p class="margin-none">0/3 Done</p>
                </div>
                <div class="assignedto-prio-row">
                    <div id="assigned-to-currentTask${i}" class="assigned-to-currentTask" ></div>
                    <img class="current-Task-Prio" src="/assets/img/${priority}-solo.png" alt="">
                </div>
            </div>
        `
    renderAssignedTo(i);
}
*/



/*function deleteTask(i) {
    //let task = allTasks[i];
    allTasks.splice(i, 1);
    saveAllTasks();
    closeShowTask();
    updateHTML();
}
*/

function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
}



function saveTodos() {
    let allTodosAsString = JSON.stringify(todoCount);
    localStorage.setItem('todoCount', allTodosAsString);
}

function loadTodos() {
    let allTodosAsString = localStorage.getItem('todoCount');
    if (allTodosAsString) {
        todoCount = JSON.parse(allTodosAsString);
    }
}

function saveInProgress() {
    let allInProgressAsString = JSON.stringify(inprogressBoxCount);
    localStorage.setItem('inprogressBoxCount', allInProgressAsString);
}

function loadInProgress() {
    let allInProgressAsString = localStorage.getItem('inprogressBoxCount');
    if (allInProgressAsString) {
        inprogressBoxCount = JSON.parse(allInProgressAsString);
    }
}

function saveFeedback() {
    let allFeedbackString = JSON.stringify(feedbackBoxCount);
    localStorage.setItem('feedbackBoxCount', allFeedbackString);
}

function saveFeedback() {
    let allFeedbackString = localStorage.getItem('feedbackBoxCount');
    if (allFeedbackString) {
        feedbackBoxCount = JSON.parse(allFeedbackString);
    }
}

function saveDone() {
    let allDoneAsString = JSON.stringify(doneBoxCount);
    localStorage.setItem('doneBoxCount', allDoneAsString);
}

function loadDone() {
    let allDoneAsString = localStorage.getItem('doneBoxCount');
    if (allDoneAsString) {
        doneBoxCount = JSON.parse(allDoneAsString);
    }
}


