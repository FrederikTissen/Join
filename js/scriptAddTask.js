let allTasks = [];



function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');

    let task = {
        'title': title.value,
        'description': description.value,
        'date': date.value,
    };

    console.log(task);


    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);



}

function renderTasks() {

    loadAllTasks();
    document.getElementById('todo-box').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        currentTask = allTasks[i];
        let title = allTasks[i]['title'];
        let description = allTasks[i]['description'];

        let newTask = document.getElementById('todo-box');
        

        newTask.innerHTML += /*html*/ `
            <div onclick="openShowTask(${i})" class="current-task">
                <p>${title}</p>
                <p>${description}</p>
            </div>
        `
    }
}

function closeShowTask() {
    document.getElementById('show-Task-Background').classList= 'show-Task-Background d-none';
}

function openShowTask(i) {
    let title = allTasks[`${i}`]['title'];
    let description = allTasks[`${i}`]['description'];
    let date = allTasks[`${i}`]['date'];
    
    document.getElementById('show-Task-Background').classList= 'show-Task-Background';

    document.getElementById('showTask').innerHTML = /*html*/ `
                <p>Category</p>
                <h3>${title}</h3>
                <p>${description}</p>
                <p>Due date: ${date}</p>
                <p>Priority: </p>
                <p>Assigned To: </p>

                <button onclick="deleteTask(${i})">delete</button>
                <button onclick="closeShowTask()">close</button>
    `
}

function deleteTask(i) {
    allTasks.splice(i,1);
    save();
    closeShowTask();
    renderTasks();
}

function save() {
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
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