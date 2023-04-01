
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



/**
 * Render every Task in the correct split
 */
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


/**
 * Count all urgent tasks
 */
function countOfAllUrgentTasks() {
    let allUrgentTasks = allTasks.filter(t => t['priority'] == 'urgent');
    urgentTasksCount = allUrgentTasks.length;

    saveCount('urgentTasksCount', urgentTasksCount);
}


/**
 * Count all tasks
 */
async function countOfAllTasks() {
    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    let doneBox = allTasks.filter(t => t['split'] == 'done-box');

    doneBoxCount = doneBox.length;
    feedbackBoxCount = feedbackBox.length;
    inprogressBoxCount = inprogressBox.length;
    todoCount = todo.length;
    await saveCount('doneBoxCount', doneBoxCount);
    await saveCount('feedbackBoxCount', feedbackBoxCount);
    await saveCount('inprogressBoxCount', inprogressBoxCount);
    await saveCount('todoCount', todoCount);
}


/**
 * Render every SINGLE Task in his correct split
 */
function updateTaskBox(id, task) {
    document.getElementById(id).innerHTML = '';
    for (let index = 0; index < task.length; index++) {
        const currentTask = task[index];
        document.getElementById(id).innerHTML += templateGenerateHTML(currentTask);
        renderProgressbar(currentTask);
        renderAssignedTo(currentTask);
    }
}


/**
 * Save the count of all Tasks of a split in backend
 */
async function saveCount(nameOfSplit, stringName) {
    await backend.deleteItem(nameOfSplit);
    await backend.setItem(nameOfSplit, JSON.stringify(stringName));
}


/**
 * Save what task is dragged
 */
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


/**
 * Render all connected contacts of the Task
 */
function renderAssignedTo(currentTask) {
    let contact = currentTask['AssignedTo'];
    let contactHTML = document.getElementById(`assigned-to-currentTask${currentTask['id']}`);
    contactHTML.innerHTML = '';

    renderSelectedContact(contact, contactHTML);
}


/**
 * Create a Logo with the first letter of the name and firstname of the contact
 */
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


/**
 * Open a window with all details of the clicked Task
 * @param {i} - Clicked Task 
 */
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


/**
 * Pick the priority and order the correct img
 * @param {priority} - Priority of the current Task
 */
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


/**
 * Render all Subtasks 
 * @param {subTask} - All Subtasks of the clicked Task 
 */
function renderSubTaskBox(subTask) {
    subTaskBox = document.getElementById('subTask-box');
    subTaskBox.innerHTML = '';

    for (let i = 0; i < subTask.length; i++) {
        currentSubTask = subTask[i]['text'];
        subTaskBox.innerHTML += templateSubtask(i, currentSubTask);
        proofCheckState(i);
    }
}


/**
 * Cross checkbox or cross not  
 */
function proofCheckState(idOfCurrentSubtask) {
    let subTaskCheckbox = document.getElementById(`subTaskCheck${idOfCurrentSubtask}`);
    let checkState = allTasks[currentTask]['subTasks'][idOfCurrentSubtask]['check'];
    let subTaskTitle = document.getElementById(`subTask${idOfCurrentSubtask}`);

    if (checkState) {
        subTaskTitle.classList.add('line-throug');
        subTaskCheckbox.setAttribute('checked', true);
    } else {
        subTaskTitle.classList.remove('line-throug');
        subTaskCheckbox.removeAttribute('checked');
    };
}


/**
 * Save if the checkbox is checked or not
 */
async function saveCheck(currentSubTask) {
    let subTaskCheckbox = document.getElementById(`subTaskCheck${currentSubTask}`);

    if (subTaskCheckbox.checked) {
        saveTrue(currentSubTask);
    } else {
        saveFalse(currentSubTask)
    };
}


/**
 * Save if checkstate is true
 */
async function saveTrue(currentSubTask) {
    allTasks[currentTask]['subTasks'][currentSubTask]['check'] = true;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    proofCheckState(currentSubTask);
}


/**
 * Save if checkstate is false
 */
async function saveFalse(currentSubTask) {
    allTasks[currentTask]['subTasks'][currentSubTask]['check'] = false;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    proofCheckState(currentSubTask);
}


function renderProgressbar(currentTask) {
    if (currentTask['subTasks'].length > 0) {
        let countOfallSubTasks = currentTask['subTasks'].length;

        toCountAllCheckedSubTasks(currentTask);

        let subWidth = (100 / countOfallSubTasks) * countOfAllCheckedSubtasks;
        let progress = document.getElementById(`progress${currentTask['id']}`);
        progress.classList.remove('d-none')
        progress.innerHTML = templateRenderProgressbar(countOfallSubTasks, subWidth);
        countOfAllCheckedSubtasks = 0;
    }
}


/**
 * Update how many subtasks are checked
 */
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


/**
 * Count how many subtasks are checked
 */
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
        let assignedToBox = document.getElementById('assigned-box');
        let contactColor = currentPerson['color'];

        assignedToBox.innerHTML += templateAssignedToBox(i, contactColor, firstLetter, secondLetter, firstName, lastName);
    }
}


/**
 * Search function
 */
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


/**
 * Render all founded Tasks in a Split 
 */
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


/**
 * Close the window to create a new task
 */
function closeIncludeAddTask() {
    document.getElementById('show-addTaskInclude').innerHTML = '';
    if (includeBoard) {
        onloadBoard();
        includeBoard = false;
        document.body.classList.remove('overflow-hidden');
    }
}


/**
 * Close the window with task details
 */
async function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
    updateProgressbar();
}


/**
 * Include a window like the "Add Task" page
 */
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


/**
 * Include a window like the "Add Task" page
 */
function addNewTask() {
    document.body.classList.add('overflow-hidden');
    document.getElementById('show-addTaskInclude').innerHTML = /*html*/ `
        <div w3-include-html="add-TaskInclude.html" ></div>`;
    includeHTMLaddTask();
}


function addNewTaskBoard() {
    includeBoard = true;
    addNewTask();
}




