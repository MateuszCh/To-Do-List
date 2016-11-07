/**
 * Created by Mateusz Chybiorz on 2016-11-02.
 */
var addButton = document.getElementById("plus");
var lista = document.getElementById("tasks");
var completedList = document.getElementById("completedTasks");
var addForm = document.getElementById("addForm");
var editForm = document.getElementById("editForm");
var addFormCloseButton = document.getElementById("close");
var editFormCloseButton = document.getElementById("closeEdit");
var addTask = document.getElementById("addTask");
var completedCheckbox = document.getElementsByClassName("completedCheckbox");
var completedTasksCounter = document.getElementById("counter");
var save = document.getElementById("save");
var tasksHeader = document.getElementById("tasksHeader");
var completedTasksHeader = document.getElementById("completedTasksHeader");
var currentTaskObject;

var title = document.getElementById("title");
var category = document.getElementById("category");
var content = document.getElementById("content");
var time = document.getElementById("time");
var data = document.getElementById("data");
var editTitle = document.getElementById("titleEdit");
var editCategory = document.getElementById("categoryEdit");
var editContent = document.getElementById("contentEdit");
var editTime = document.getElementById("timeEdit");
var editData = document.getElementById("dataEdit");
var zadania = [];


function hideList(list) {
    if(list.style.display == "block"){
        list.classList.add("hide");
        setTimeout(function () {
            list.style.display = "none";
            list.classList.remove("hide");
        }, 500);
    } else if (list.style.display == "none"){
        list.style.display = "block";
        list.classList.add("show");
        setTimeout(function () {
            list.classList.remove("show");
        }, 500)
    }
}

tasksHeader.addEventListener("click", function (e) {
    hideList(lista);
}, false);

completedTasksHeader.addEventListener("click", function (e) {
    hideList(completedList);
}, false);

function Task(title, description, category, time, date) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.time = time;
    this.date = date;
    this.completed = false;
}
function clear(el) {
    el.classList.add("hide");
    setTimeout(function () {
        el.style.display = "none";
        el.classList.remove("hide");
    }, 500);
    var inputs = document.getElementsByClassName("addFormInputs");
    for(var i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    showTasks();
}

function showTasks() {
    lista.innerHTML =   "";
    completedList.innerHTML = "";
    for(var i =0; i < zadania.length; i++){
        if(zadania[i] == undefined){
            continue;
        }
        var el = document.createElement("li");
        el.setAttribute("data-index-number", i);
        var completed = document.createElement("input");
        completed.type = "checkbox";
        completed.classList.add("completedCheckbox");
        var idy = "idy" + i;
        completed.id = idy;
        var labelForCheckbox = document.createElement("label");
        labelForCheckbox.setAttribute("for", idy);
        var label = document.createElement("label");
        label.classList.add("task");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa fa-trash deleteButton" aria-hidden="true"></i>';
        if(zadania[i].title){
            label.textContent = zadania[i].title;
        } else {
            label.textContent = zadania[i].description;
        }
        el.appendChild(completed);
        el.appendChild(labelForCheckbox);
        el.appendChild(label);
        el.appendChild(deleteButton);
        if(zadania[i].completed){
            completedList.appendChild(el);
            completed.checked = true;
            el.classList.add("lisCom");
        } else {
            lista.appendChild(el);
            el.classList.add("lisUn");
        }
    }
    updateHeadersForList();
    updateCompletedTaskaCounter()
}

function updateHeadersForList() {
    if(lista.firstChild){
        var h2 = document.getElementById("tasksHeader");
        h2.classList.add("showHeader");
    } else {
        var h2 = document.getElementById("tasksHeader");
        h2.classList.remove("showHeader");
    }
    if(completedList.firstChild){
        var h2 = document.getElementById("completedTasksHeader");
        h2.classList.add("showHeader");
    } else {
        var h2 = document.getElementById("completedTasksHeader");
        h2.classList.remove("showHeader");
    }
}

function updateCompletedTaskaCounter() {
    var allTask = 0;
    var completedTasks = 0;
    for(var i = 0; i < zadania.length; i++){
        if(zadania[i]){
            allTask++;
            if(zadania[i].completed){
                completedTasks++;
            }
        }
    }
    completedTasksCounter.textContent = "Completed tasks: " + completedTasks + "/" + allTask;
}

function showEditForm(taskObject) {
    editTitle.value = taskObject.title;
    editCategory.value = taskObject.category;
    editContent.value = taskObject.description;
    editTime.value = taskObject.time;
    editData.value = taskObject.date;
}

document.addEventListener("click", function (e) {
   if(e.target && e.target.classList.contains("deleteButton")){
       e.target.parentNode.parentNode.classList.add("hide");
       var indexOfObject = e.target.parentNode.parentNode.dataset.indexNumber;
       delete zadania[indexOfObject];
       setTimeout(function () {
           // addForm.style.display = "none";
           // addForm.classList.remove("hide");
           showTasks();
       }, 500);


       if(zadania[zadania.length-1] == undefined){
            zadania.pop();
       }
   }
}, false);

document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("completedCheckbox")){
        var indexOfObject = e.target.parentNode.dataset.indexNumber;
        if(e.target.checked){
            zadania[indexOfObject].completed = true;
        } else {
            zadania[indexOfObject].completed = false;
        }
        showTasks();
    }
}, false);

addTask.addEventListener("click", function (e) {
    e.preventDefault();
    if(title.value || content.value){
        var task = new Task(title.value, content.value, category.value, time.value, data.value);
        zadania.push(task);
        clear(addForm);
    }
});

document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("deleteAll")){
        if(e.target.parentNode == document.getElementById("tasksHeader")){
            var lisy = document.getElementsByClassName("lisUn");
            for(var p = 0; p < lisy.length; p++){
                lisy[p].classList.add("hide");
            }
            setTimeout(function () {
                lista.innerHTML = "";

            }, 500);
            for(var i = 0; i < zadania.length; i++){
                if(zadania[i] && zadania[i].completed == false){
                    delete zadania[i];
                }
            }
        } else if(e.target.parentNode == document.getElementById("completedTasksHeader")){
            var lisy2 = document.getElementsByClassName("lisCom");
            for(var m = 0; m < lisy2.length; m++){
                lisy2[m].classList.add("hide");
            }
            setTimeout(function () {
                completedList.innerHTML = "";

            }, 500);
            for(var j = 0; j < zadania.length; j++){
                if(zadania[j] && zadania[j].completed == true){
                    delete zadania[j];
                }
            }
        }
        setTimeout(function () {
            updateHeadersForList();
            updateCompletedTaskaCounter()
        }, 501);
    }
}, false);

document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("task")){
        var indexOfObject = e.target.parentNode.dataset.indexNumber;
        currentTaskObject = indexOfObject;
        editForm.style.display = "block";
        editForm.classList.add("show");
        setTimeout(function () {
            editForm.classList.remove("show");
        }, 500)
        showEditForm(zadania[indexOfObject]);
    }
}, false);

addButton.addEventListener("click", function (e) {
    addForm.style.display = "block";
    addForm.classList.add("show");
    setTimeout(function () {
        addForm.classList.remove("show");
    }, 500)
}, false);

save.addEventListener("click", function (e) {
    e.preventDefault();
    zadania[currentTaskObject].title = editTitle.value;
    zadania[currentTaskObject].category = editCategory.value;
    zadania[currentTaskObject].description = editContent.value;
    zadania[currentTaskObject].time = editTime.value;
    zadania[currentTaskObject].date = editData.value;
    clear(editForm);
}, false);

addFormCloseButton.addEventListener("click", function () {
    clear(addForm);
}, false);
editFormCloseButton.addEventListener("click", function () {
    clear(editForm);
}, false);




//animacje znikania przesuwanych zadań
//kolory
//sortowanie
//kategorie
//local storage