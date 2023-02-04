






function updatePage() {
    updateDate();
    updateCountOfTasks();
}

function updateDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    let month = months[date.getMonth()];
    let day = date.getDay();
    let year = date.getFullYear();

    document.getElementById('dateSummary').innerHTML = `${month}  ${day}, ${year} `;
}

function updateCountOfTasks() {
   

    let tasksInBoard = allTasks.length;


    document.getElementById('tasks-in-progress').innerHTML = inprogressBoxCount;
    document.getElementById('tasks-in-board').innerHTML = tasksInBoard;
    document.getElementById('tasks-awaiting-feedback').innerHTML = feedbackBoxCount;
    document.getElementById('tasks-todo').innerHTML = todoCount;
    document.getElementById('tasks-done').innerHTML = doneBoxCount;

}



