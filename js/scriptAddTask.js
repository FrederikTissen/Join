let allTasks = [];


var popupWindow = null;


function centeredPopup(url, winName, w, h, scroll) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    settings =
        'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    popupWindow = window.open(url, winName, settings)
}


function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;

    

    let task = {
        'title': title,
        'description': description,
        'date': date,
    };

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);

}


function loadAllTasks(){
   let allTasksAsString = localStorage.getItem('allTasks');
   allTasks = JSON.parse(allTasksAsString);
}