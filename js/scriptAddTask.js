let allTasks = [];
let selectionPrio;
let allCategories = [];

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

    console.log(task);


    allTasks.push(task);

    saveTask();
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

function rederCategories() {
    saveCategory();
    loadAllCategories();

    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <div  id="category-box" class="category-box">
        <p onclick="closeSelection()" class="select-category">Select task category</p>
        <div onclick="openInput()" class="selection-category">
            <div>New category</div>
        </div>
    </div>
    `;

    for (let i = 0; i < allCategories.length;) {
        currentCategory = allCategories[i];
        let category = allCategories[i]['category'];
        let color = allCategories[i]['color'];

        let newCategory = document.getElementById('category-box');


        newCategory.innerHTML += /*html*/ `
            <div class="selection-category">
                <div>${category}</div>
                <div>${color}</div>
            </div>
        `
    }
}

function openInput() {
    document.getElementById('category').innerHTML = '';
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <input id="input-category"  placeholder="Select task category" class="addTotaskInputField" type="text">
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

function closeShowTask() {
    document.getElementById('show-Task-Background').classList = 'show-Task-Background d-none';
}

function closeSelection() {
    document.getElementById('category').innerHTML = '';
    document.getElementById('category').innerHTML = /*html*/ `
    <span>Category</span><br><br>
    <div onclick="rederCategories()" id="category-box" class="category-box">
        <p class="select-category">Select task category</p>
    </div>
    `;
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