






async function updatePage() {
    //await deleteSelectedAllContacts();

    await init();
    updateDate();
    updateCountOfTasks();
    responsiveJoinLogo();
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
    if(screen.innerWidth < 850) {
        console.log('geht');
        document.getElementById('summary-header').innerHTML+=`
        <img class="new-logo" src="./assets/img/join-logo.png">`;
    }
}
