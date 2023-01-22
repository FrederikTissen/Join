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

function openShowTask(i) {
    let title = allTasks[`${i}`]['title'];
    let description = allTasks[`${i}`]['description'];
    let date = allTasks[`${i}`]['date'];

    document.getElementById('show-Task-Background').classList = 'show-Task-Background';

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
    allTasks.splice(i, 1);
    save();
    closeShowTask();
    renderTasks();
}

function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
}
