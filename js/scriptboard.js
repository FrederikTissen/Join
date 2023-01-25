


function renderTasks() {

    loadAllTasks();
    document.getElementById('todo-box').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        currentTask = allTasks[i];
        let title = allTasks[i]['title'];
        let description = allTasks[i]['description'];
        let priority = allTasks[i]['priority'];
        let category = allTasks[i]['category'];
        let categoryColor = allTasks[i]['categoryColor'];




        let newTask = document.getElementById('todo-box');


        newTask.innerHTML += /*html*/ `
            <div onclick="openShowTask(${i})" class="current-task">
                <div class="current-Task-Category ${categoryColor}">${category}</div>
                <p>${title}</p>
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

}

function renderAssignedTo(i) {

    let AssignedTo = allTasks[i]['AssignedTo'];

    document.getElementById(`assigned-to-currentTask${i}`).innerHTML = '';

    for (let j = 0; j < AssignedTo.length; j++) {
        let thisContact = AssignedTo[j];
        let firstLetter = thisContact['firstName'].charAt(0);
        let secondLetter = thisContact['name'].charAt(0);

        document.getElementById(`assigned-to-currentTask${i}`).innerHTML += /*html*/`
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

    document.getElementById('show-Task-Background').classList = 'show-Task-Background';

    document.getElementById('showTask').innerHTML = /*html*/ `
                <div class="current-Task-Category ${categoryColor}">${category}</div>
                <h3>${title}</h3>
                <p>${description}</p>
                <p>Due date: ${date}</p>
                <div>Priority: <img id="" class="prio-Task-png" src="/assets/img/${priority}-icon.png" alt=""> </div>
                <p>Assigned To: </p>

                <button onclick="deleteTask(${i})">delete</button>
                <button onclick="closeShowTask()">close</button>
    `



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
