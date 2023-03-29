
let currentDragedElement;
let todoCount;
let inprogressBoxCount;
let feedbackBoxCount;
let doneBoxCount;
let includeBoard = false;
let countOfAllCheckedSubtasks = 0;
let currentTask;


async function onloadBoard() {
    await init();
    await updateHTML();
    hideLoader();
}


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
    document.body.classList.add('overflow-hidden');
    document.getElementById('show-addTaskInclude').innerHTML = /*html*/ `
        <div w3-include-html="add-TaskInclude.html" ></div>`;
    includeHTMLaddTask();
}


function updateHTML() {
    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    let doneBox = allTasks.filter(t => t['split'] == 'done-box');
    updateTaskBox('todo-box', todo)
    updateTaskBox('inprogress-box', inprogressBox)
    updateTaskBox('feedback-box', feedbackBox)
    updateTaskBox('done-box', doneBox)
    countOfAllUrgentTasks();
    countOfAllTasks();
}


function updateTaskBox(id, task) {
    document.getElementById(id).innerHTML = '';
    for (let index = 0; index < task.length; index++) {
        const currentTask = task[index];
        document.getElementById(id).innerHTML += templateGenerateHTML(currentTask);
        renderProgressbar(currentTask);
        renderAssignedTo(currentTask);
    }
}


async function saveCount(nameOfTask, stringName) {
    await backend.deleteItem(nameOfTask);
    await backend.setItem(nameOfTask, JSON.stringify(stringName));
}


function startDragging(i) {
    currentDragedElement = i;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(split) {
    allTasks[currentDragedElement]['split'] = split;
    saveAllTasks();
    updateHTML();
}


function renderAssignedTo(element) {
    let contact = element['AssignedTo'];
    let contactHTML = document.getElementById(`assigned-to-currentTask${element['id']}`);
    contactHTML.innerHTML = '';

    renderSelectedContact(contact, contactHTML);
}


function renderSelectedContact(contact, contactHTML) {
    for (let j = 0; j < contact.length; j++) {
        let thisContact = contact[j];
        let firstLetter = thisContact['firstName'].charAt(0);
        let secondLetter = thisContact['name'].charAt(0);
        let contactColor = thisContact['color'];

        contactHTML.innerHTML += /*html*/`
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
    currentTask = i;

    choosePriorityImg(priority);
    document.getElementById('show-Task-Background').classList = 'show-Task-Background';
    document.getElementById('showTask').innerHTML = templateOpenShowTask(title, description, date, priority, category, categoryColor, capitalizedPriority);
    renderAssignedBox(assignedTo);
    renderSubTaskBox(subTask);
}


function choosePriorityImg(priority) {
    if (priority == "urgent") {
        priorityImg = 'arrows-up';
    }

    if (priority == "medium") {
        priorityImg = 'equal-white';
    }

    if (priority == "low") {
        priorityImg = 'arrow-down-white';
    }
}


function renderSubTaskBox(subTask) {
    subTaskBox = document.getElementById('subTask-box');
    subTaskBox.innerHTML = '';

    for (let i = 0; i < subTask.length; i++) {
        currentSubTask = subTask[i]['text'];
        subTaskBox.innerHTML += templateSubtask(i, currentSubTask);
        proofCheckState(i);
    }
}


function proofCheckState(i) {
    let currentSubTask = i;
    let subTaskCheckbox = document.getElementById(`subTaskCheck${i}`);
    let checkState = allTasks[currentTask]['subTasks'][currentSubTask]['check'];
    let subTaskTitle = document.getElementById(`subTask${i}`);

    if (checkState) {
        subTaskTitle.classList.add('line-throug');
        subTaskCheckbox.setAttribute('checked', true);
    } else {
        subTaskTitle.classList.remove('line-throug');
        subTaskCheckbox.removeAttribute('checked');
    };
}


async function saveCheck(i) {
    let subTaskCheckbox = document.getElementById(`subTaskCheck${i}`);
    let currentSubTask = i;

    if (subTaskCheckbox.checked) {
        saveTrue(currentSubTask, i);
    } else {
        saveFalse(currentSubTask, i)
    };
}

async function saveTrue(currentSubTask, i) {
    allTasks[currentTask]['subTasks'][currentSubTask]['check'] = true;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    proofCheckState(i);
}

async function saveFalse(currentSubTask, i) {
    allTasks[currentTask]['subTasks'][currentSubTask]['check'] = false;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    proofCheckState(i);
}


function renderProgressbar(element) {
    if (element['subTasks'].length > 0) {
        let countOfallSubTasks = element['subTasks'].length;

        toCountAllCheckedSubTasks(element);

        let subWidth = (100 / countOfallSubTasks) * countOfAllCheckedSubtasks;
        let progress = document.getElementById(`progress${element['id']}`);
        progress.classList.remove('d-none')
        progress.innerHTML = templateRenderProgressbar(countOfallSubTasks, subWidth);
        countOfAllCheckedSubtasks = 0;
    }
}


function updateProgressbar() {
    let element = allTasks[currentTask];
    if (element['subTasks'].length > 0) {
        let subLength = element['subTasks'].length;
        
        toCountAllCheckedSubTasks(element);

        let subWidth = (100 / subLength) * countOfAllCheckedSubtasks;
        document.getElementById(`progress${element['id']}`).classList.remove('d-none')
        document.getElementById(`progress${element['id']}`).innerHTML = templateRenderProgressbar(subLength, subWidth);
        countOfAllCheckedSubtasks = 0;
    }
}


function toCountAllCheckedSubTasks(element) {
    for (let i = 0; i < element['subTasks'].length; i++) {
        const subTask = element['subTasks'][i];
        if (subTask['check']) {
            countOfAllCheckedSubtasks++;
        }
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

function updateSearchedTask(id, task) {
    let search = document.getElementById('search-task').value;
    search = search.toLowerCase();
    document.getElementById(id).innerHTML = '';
    for (let index = 0; index < task.length; index++) {
        const currentTask = task[index];
        let currentTitle = currentTask['title'];
        if (currentTitle.toLowerCase().includes(search)) {
            document.getElementById(id).innerHTML += templateGenerateHTML(currentTask);
            renderProgressbar(currentTask);
            renderAssignedTo(currentTask);
        }
    }
}



function updateSearchedHTML() {
    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    let doneBox = allTasks.filter(t => t['split'] == 'done-box');
    loadAllTasks();
    updateSearchedTask('todo-box', todo);
    updateSearchedTask('inprogress-box', inprogressBox);
    updateSearchedTask('feedback-box', feedbackBox);
    updateSearchedTask('done-box', doneBox);
}


function addNewTaskBoard() {
    includeBoard = true;
    addNewTask();
}


function closeIncludeAddTask() {
    document.getElementById('show-addTaskInclude').innerHTML = '';
    if (includeBoard) {
        onloadBoard();
        includeBoard = false;
        document.body.classList.remove('overflow-hidden');
    }
}


async function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
    updateProgressbar();
}




