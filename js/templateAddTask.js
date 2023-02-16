function renderCategoriesTemplate() {
    return /*html*/ `
<span>Category</span>
<div  id="category-box" class="category-box">
    <div onclick="renderCategoryBox()" class="category-box-render">
        <p  class="select-category">Select task category</p>
        <img onclick="renderCategoryBox()" class="arrow-icon" src="/assets/img/arrow-down.png" alt="">
        
    </div>
    <div onclick="openInput()" class="selection-category">
        <div>New category</div>
    </div>
</div>
`;
}

function templateAcceptCategory() {
    return /*html*/ `
<span>Category</span>
<div onclick="renderCategories()" id="category-box" class="accepted-category">
    <div class="accept-category">
        <p class="accept-category">${category} </p>
        <img class="colors" src="/assets/img/${color}.png" alt="">
     </div>
    <img onclick="renderCategories()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">

</div>
`;
}


function templateAcceptNewCategory() {
    return /*html*/ `
<span>Category</span>
<div onclick="renderCategories()" id="category-box" class="accepted-category">
    <div class="accept-category">
        <p class="accept-category">${category} </p>
        <img class="colors" src="/assets/img/${color}.png" alt="">
    </div>
    <img onclick="renderCategories()" class="arrow-icon" src="/assets/img/arrow-down.png" alt="">

</div>
`;
}

function templateOpenInput() {
    return /*html*/ `
    <span>Category</span>
            <input id="input-category"   placeholder="New category name" class="addTotaskInputField" type="text">
            <div id="input-nav-box" class="input-nav-box">
                <img onclick="renderCategoryBox()" class="x-black" src="/assets/img/x-black.png">
                <img class="line" src="/assets/img/line.png">
                <img onclick="pushNewCategory()" class="hook" src="/assets/img/hook.png">
            </div> 
            <div class="color-box">
                <img id="turquoise" onclick="chooseColor('turquoise')" class="colors" src="/assets/img/turquoise.png" alt="">
                <img id="red" onclick="chooseColor('red')" class="colors" src="/assets/img/red.png" alt="">
                <img id="green" onclick="chooseColor('green')" class="colors" src="/assets/img/green.png" alt="">
                <img id="orange" onclick="chooseColor('orange')" class="colors" src="/assets/img/orange.png" alt="">
                <img id="purple" onclick="chooseColor('purple')" class="colors" src="/assets/img/purple.png" alt="">
                <img id="blue" onclick="chooseColor('blue')" class="colors" src="/assets/img/blue.png" alt="">
            </div>
          
           
    `;
}

function templateRenderCategoryBox() {
    return /*html*/ `
    <span>Category</span>
    <div onclick="renderCategories()" id="category-box" class="category-box-standard">
        <p class="select-category">Select task category</p>
        <img onclick="renderCategories()" class="arrow-icon" src="/assets/img/arrow-down.png" alt="">    
    </div>
    `;
}

function templateRenderContacts() {
    return /*html*/ `
    <span>Assigned to</span>
    <div   id="contact-box" class="category-box">
        <div class="assigned-to-box">
            <p onclick="renderContactBox()" class="select-category">Select contacts to assign</p>
            <img onclick="renderContactBox()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">
        </div>
        <div onclick="openInputContact()" class="selection-category">
            <div>Invite new contact</div>
            <img src="/assets/img/contact-logo.png" alt="">
        </div>
    </div>
    <div id="contact-icons" class="contact-icons"></div>
    `;
}

function templateNewContact(contactFirstname, contactLastName, i) {
    return /*html*/ `
    <div id="selection-contacts${i}" class="selection-contacts">
        <div id="contact${i}" >${contactFirstname}  ${contactLastName}</div>
        <img id="checkbox${i}" onclick="acceptContact(${i})" class="checkbox"  src="/assets/img/checkbox-contact.png" alt="">
    </div>
`;
}

function templateOpenInputContact() {
    return /*html*/ `
    <span>Assigned to</span>
    <input id="input-contact" onkeyup="filterContacts()" placeholder="Search New contact..." class="addTotaskInputField" type="text">
    
    <div id="input-nav-box-contact" class="input-nav-box">
                            <img onclick="renderContactBox()" class="x-black" src="/assets/img/x-black.png">
                            <img class="line" src="/assets/img/line.png">
                            <img onclick="pushNewContact()" class="hook" src="/assets/img/hook.png">
                        </div>
    <div id="searched-emails" class="searched-emails"></div>
    
    `;
}

function templateRenderContactBox() {
    return /*html*/ `
    <span>Assigned to</span>
        <div onclick="renderContacts()" id="contact-box" class="render-category-box">
            <p class="select-category">Select contacts to assign</p>
            <img onclick="renderContacts()" class="arrow-icon"  src="/assets/img/arrow-down.png" alt="">

        </div>
        <div id="contact-icons" class="contact-icons"></div>
    `;
}

function templateRenderPrios() {
    return /*html*/ `
    <span>Prio</span>
                    <div class="prio-box">
                        <div id="prio-urgent" onclick="choosePrio('urgent', 'arrows-up')" class="prio-icon">
                            <p class="margin-none no-scale">Urgent</p>
                            <img id="icon-urgent" class="prio-icons" src="/assets/img/Urgent-solo.png">
                        </div>
                        <div id="prio-medium" onclick="choosePrio('medium', 'equal-white')" class="prio-icon ">
                            <p class="margin-none no-scale">Medium</p>
                            <img id="icon-medium" class="prio-icon-medium" src="/assets/img/Medium-Solo.png" alt="">
                        </div>
                        <div id="prio-low" onclick="choosePrio('low', 'arrow-down-white')" class="prio-icon">
                            <p class="margin-none no-scale">Low</p>
                            <img id="icon-low" class="prio-icons" src="/assets/img/Low-solo.png" alt="">
                        </div>
                    </div>
    `
}

function templateResetPrios() {
    return /*html*/ `
    <span>Prio</span>
                    <div class="prio-box">
                        <div id="prio-urgent" onclick="renderPrios();" class="prio-icon">
                            <p class="margin-none no-scale">Urgent</p>
                            <img id="icon-urgent" class="prio-icons" src="/assets/img/Urgent-solo.png">
                        </div>
                        <div id="prio-medium" onclick="renderPrios();" class="prio-icon ">
                            <p class="margin-none no-scale">Medium</p>
                            <img id="icon-medium" class="prio-icon-medium" src="/assets/img/Medium-Solo.png" alt="">
                        </div>
                        <div id="prio-low" onclick="renderPrios();" class="prio-icon">
                            <p class="margin-none no-scale">Low</p>
                            <img id="icon-low" class="prio-icons" src="/assets/img/Low-solo.png" alt="">
                        </div>
                    </div>
    `
}

function templateRenderSubTask() {
    return /*html*/ `
    <span>Subtasks</span>
    <input id="input-SubTask" placeholder="Add new subtask..." class="addTotaskInputField" type="text">
    
    <div id="input-nav-box-Subtask" class="input-nav-box">
        <img onclick="clearInputField()" class="x-black" src="/assets/img/x-black.png">
        <img class="line" src="/assets/img/line.png">
        <img onclick="pushNewSubTask()" class="hook" src="/assets/img/hook.png">
    </div>
    <div id="allSubtasks" class="allSubtasks"></div>
    `;
}

function templateToDo() {
    return /*html*/ `
    <div class="subtask-box">
        <img class="checkbox-empty" src="/assets/img/checkbox-emoty.png" alt="">
        <div id="todo${i}" class="todo">${toDo}</div>
    </div>
    `
}

