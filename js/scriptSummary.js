async function updatePage() {
    //hideLoader();

    await init();
    updateDate();
    updateCountOfTasks();
    responsiveJoinLogo();
    replaceUserName();
    checkTime();
    hideLoader();

}

function changeDoneImg() {
    let img = document.getElementById('done-img');
    if (img.src = "./assets/img/done-color-round.png") {
        img.src = "./assets/img/done-dark-hook.png";
    } else {
        img.src = "./assets/img/done-color-round.png";
    }
}

function changeDoneImgBack() {
    let img = document.getElementById('done-img');
    if (img.src = "./assets/img/done-dark-hook.png") {
        img.src = "./assets/img/done-color-round.png";
    } 
}


function changeToDoImg() {
    let img = document.getElementById('todo-img');
    if (img.src = "./assets/img/to-do.png") {
        img.src = "./assets/img/black-pen.png";
    } else {
        img.src = "./assets/img/to-do.png";
    }
}

function changeToDoImgBack() {
    let img = document.getElementById('todo-img');
    if (img.src = "./assets/img/black-pen.png") {
        img.src = "./assets/img/to-do.png";
    }
}

function updateDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date();
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    document.getElementById('dateSummary').innerHTML = `${month}  ${day}, ${year} `;
}


function updateCountOfTasks() {
    countOfAllTasks();

    let tasksInBoard = allTasks.length;

if (inprogressBoxCount == 0) {
    document.getElementById('tasks-in-progress').innerHTML = 0;
} else {
    document.getElementById('tasks-in-progress').innerHTML = `${inprogressBoxCount}`;
}

if (tasksInBoard == 0) {
    document.getElementById('tasks-in-board').innerHTML = 0;
} else {
    document.getElementById('tasks-in-board').innerHTML = `${tasksInBoard}`;
}

if (feedbackBoxCount == 0) {
    document.getElementById('tasks-awaiting-feedback').innerHTML = 0;
} else {
    document.getElementById('tasks-awaiting-feedback').innerHTML = `${feedbackBoxCount}`;
}

if (todoCount == 0) {
    document.getElementById('tasks-todo').innerHTML = '0';
} else {
    document.getElementById('tasks-todo').innerHTML = `${todoCount}`;
}

if (doneBoxCount == 0) {
    document.getElementById('tasks-done').innerHTML = 0;
} else {
    document.getElementById('tasks-done').innerHTML = `${doneBoxCount}`;
}


if (urgentTasksCount == 0) {
    document.getElementById('urgent-count').innerHTML = 0;
} else {
    document.getElementById('urgent-count').innerHTML = `${urgentTasksCount}`;
}

    

    


}


function responsiveJoinLogo() {
   /* if(window.innerWidth < 850) {
        document.getElementById('new-logo').classList.remove('d-none');
        location.reload();
    } */
}