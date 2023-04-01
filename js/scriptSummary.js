async function onloadSummary() {
    await init();
    updateDate();
    updateCountOfTasks();
    replaceUserName();
    checkTime();
    hideLoader();
}


function changeImg(id, hoverImg, standardImg) {
    let img = document.getElementById(`${id}`);
    if (img.src = `${standardImg}`) {
        img.src = `${hoverImg}`;
    } else {
        img.src = `${standardImg}`;
    }
}


function changeImgBack(id, hoverImg, standardImg) {
    let img = document.getElementById(`${id}`);
    if (img.src = `${hoverImg}`) {
        img.src = `${standardImg}`;
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
    updateCountOfSingleTask(inprogressBoxCount, 'tasks-in-progress');
    updateCountOfSingleTask(tasksInBoard, 'tasks-in-board');
    updateCountOfSingleTask(feedbackBoxCount, 'tasks-awaiting-feedback');
    updateCountOfSingleTask(todoCount, 'tasks-todo');
    updateCountOfSingleTask(doneBoxCount, 'tasks-done');
    updateCountOfSingleTask(urgentTasksCount, 'urgent-count');
}


function updateCountOfSingleTask(countOfTask, id) {
    if (countOfTask == 0) {
        document.getElementById(`${id}`).innerHTML = 0;
    } else {
        document.getElementById(`${id}`).innerHTML = `${countOfTask}`;
    }
}
