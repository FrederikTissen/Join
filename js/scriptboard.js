
let currentDragedElement;

function generateTodoHTML(element, index) {

        let title = element['title'];
        let description = element['description'];
        let priority = element['priority'];
        let category = element['category'];
        let categoryColor = element['categoryColor'];

        


        return /*html*/ `
            <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="openShowTask(${element['id']})" class="current-task">
                <div class="current-Task-Category ${categoryColor}">${category}</div>
                <p>${title}</p>
                <p class="margin-none">${description}</p>
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

function updateHTML() {
    loadAllTasks(); 

    let todo = allTasks.filter(t => t['split'] == 'todo-box');
    document.getElementById('todo-box').innerHTML = '';
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo-box').innerHTML += generateTodoHTML(element);
        renderAssignedTo(index, element);
    }

    let inprogressBox = allTasks.filter(t => t['split'] == 'inprogress-box');
    document.getElementById('inprogress-box').innerHTML = '';
    for (let index = 0; index < inprogressBox.length; index++) {
        const element = inprogressBox[index];
        document.getElementById('inprogress-box').innerHTML += generateTodoHTML(element);
        renderAssignedTo(index, element);
    }

    let feedbackBox = allTasks.filter(t => t['split'] == 'feedback-box');
    document.getElementById('feedback-box').innerHTML = '';
    for (let index = 0; index < feedbackBox.length; index++) {
        const element = feedbackBox[index];
        document.getElementById('feedback-box').innerHTML += generateTodoHTML(element);
        renderAssignedTo(index, element);
    }

    let doneBox = allTasks.filter(t => t['split'] == 'done-box');
    document.getElementById('done-box').innerHTML = '';
    for (let index = 0; index < doneBox.length; index++) {
        const element = doneBox[index];
        document.getElementById('done-box').innerHTML += generateTodoHTML(element);
        renderAssignedTo(index, element);
    }

}

function startDragging(i) {
    currentDragedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(split) {
    allTasks[currentDragedElement]['split'] = split;
    saveTask();
    updateHTML();
    
}




function renderAssignedTo(index, element) {

    let AssignedTo = element['AssignedTo'];

    document.getElementById(`assigned-to-currentTask${element['id']}`).innerHTML = '';

    for (let j = 0; j < AssignedTo.length; j++) {
        let thisContact = AssignedTo[j];
        let firstLetter = thisContact['firstName'].charAt(0);
        let secondLetter = thisContact['name'].charAt(0);

        document.getElementById(`assigned-to-currentTask${element['id']}`).innerHTML += /*html*/`
        <div class="contact-in-task">${firstLetter}${secondLetter}</div>
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
                <div class="current-Task-Category ${categoryColor}">${category}</div>
                <h3>${title}</h3>
                <p>${description}</p>
                <p>Due date: ${date}</p>
                <div class="priority-bar-row" >Priority: 
                    <div id="prio-full-task" class="prio-full-task ${priority}-full-task">
                        <p class="margin-none no-scale">${capitalizedPriority}</p>
                        <img id="icon-prio" class="icon-full-task" src="/assets/img/${priorityImg}.png">
                    </div>
                </div>
                <p>Subtasks:</p>
                <div id="subTask-box"></div>
                <p>Assigned To:</p>
                <div id="assigned-box" ></div>

                <button onclick="deleteTask(${i})">delete</button>
                <button onclick="closeShowTask()">close</button>
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

        AssignedToBox.innerHTML += /*html*/ `
        <div class="assigned-box">
            <div id="assigned-icon${i}" class="assigned-icon">${firstLetter}${secondLetter}</div>
            <div id="assigned-name">${firstName} ${lastName}</div>
        </div>
        `
    }
}

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
    document.getElementById('todo-box').innerHTML += /*html*/ `

     
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



function deleteTask(i) {
    allTasks.splice(i, 1);
    saveTask();
    closeShowTask();
    renderTasks();
}

function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
}
