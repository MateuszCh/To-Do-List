/**
 * Created by Mateusz Chybiorz on 2016-11-02.
 */
//buttons
var addButton = document.getElementById("plus");
var addFormCloseButton = document.getElementById("close");
var editFormCloseButton = document.getElementById("closeEdit");
var save = document.getElementById("save");
var addTask = document.getElementById("addTask");
//forms
var addForm = document.getElementById("addForm");
var editForm = document.getElementById("editForm");
//lists
var lista = document.getElementById("tasks");
var completedList = document.getElementById("completedTasks");
var lisy = document.getElementsByClassName("lisUn");
var lisy2 = document.getElementsByClassName("lisCom");
var taski = document.getElementsByClassName("listy");
var categoryList = document.getElementById("listOfCategories");
//other variables
var completedCheckbox = document.getElementsByClassName("completedCheckbox");
var completedTasksCounter = document.getElementById("counter");
var tasksHeader = document.getElementById("tasksHeaderH2");
var completedTasksHeader = document.getElementById("completedTasksHeaderH2");
var colorsDivs = document.querySelectorAll(".colors div");

//array containing tasks
var zadania = [];
//array containing categories of tasks
var listOfCategories = [];
//index of current task
var currentTaskObject;
//selected color
var pickedColor;
//selected category
var cat;
var previousSize = window.innerWidth;

//elements of addForm and editForm
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

//Functions
//saves zadania array in locale storage
function saveZadania() {
    localStorage.setItem("json_str", JSON.stringify(zadania));
}

function makeListOfCategories() {
    listOfCategories = [];
    for(var z = 0; z <zadania.length; z++){
        if(zadania[z] && zadania[z].category){
            if(listOfCategories.indexOf(zadania[z].category) < 0){
                listOfCategories.push(zadania[z].category);
            }
        }
    }
    if(listOfCategories[0]){
        listOfCategories.unshift("all");
    }
}
// creates elements of list of categories and display them
function showListOfCategories() {
    makeListOfCategories();
    categoryList.innerHTML = "";
    for (var a = 0; a <listOfCategories.length; a++){
        var el = document.createElement("li");
        el.classList.add("categories");
        el.textContent = listOfCategories[a];
        categoryList.appendChild(el);
    }
}
// show tasks of selected category
function showTasksOfCategory(cat) {
    for(var h = 0; h < taski.length; h++){
        taski[h].classList.remove("schow");
        if(cat != "all" && cat){
            var indexOfObject = taski[h].dataset.indexNumber;
            if(!zadania[indexOfObject].category || (zadania[indexOfObject].category && zadania[indexOfObject].category != cat)){
                taski[h].classList.add("schow");
            }
        }
    }
}
//remove black border from previously selected background-color of task
function removePickedFromColors() {
    for(var w = 0; w <colorsDivs.length; w++){
        if(colorsDivs[w].classList.contains("picked")){
            pickedColor = undefined;
            colorsDivs[w].classList.remove("picked")
        }
    }
}
// show and hide selected list of tasks
function hideList(list) {
    if(list.style.display == "block"){
        list.classList.add("zwinC");
        setTimeout(function () {
            list.style.display = "none";
            list.classList.remove("zwinC");
        }, 500);
    } else if (list.style.display == "none"){
        list.style.display = "block";
        list.classList.add("rozwinC");
        setTimeout(function () {
            list.classList.remove("rozwinC");
        }, 500)
    }
}
// constructor function for tasks
function Task(title, description, category, time, date, color) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.time = time;
    this.date = date;
    this.color  =   color;
    this.completed = false;
}
//clear edit or add forms and hide them
function clearForm(el) {
    if(window.matchMedia("(max-width: 1119px)").matches || el == editForm){
        el.classList.add("zwinC");
        setTimeout(function () {
            el.style.display = "none";
            el.classList.remove("zwinC");
        }, 500);
    }
    var inputs = document.getElementsByClassName("addFormInputs");
    for(var i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    removePickedFromColors();
    showTasks();
}
//control display of addForm depending on resolution
function changingSizeOfWindow() {
    var currentSize = window.innerWidth;
    if(currentSize > previousSize){
        if(window.matchMedia("(min-width: 1200px)").matches){
            addForm.style.display = "block";
        }
    } else if(currentSize < previousSize){
        if(window.matchMedia("(min-width: 1200px)").matches){
            addForm.style.display = "block";
        } else if((previousSize > 1200 && currentSize < 1200) || previousSize == 1200) {
            addForm.style.display = "none";
        }
    }
    previousSize = currentSize;
}
//create elements for tasks and display them in an appropriate list
function showTasks() {
    lista.innerHTML =   "";
    completedList.innerHTML = "";
    for(var i =0; i < zadania.length; i++){
        if(zadania[i] == undefined){
            continue;
        }
        var el = document.createElement("li");
        if(zadania[i].color){
            el.className = zadania[i].color;
        }
        el.setAttribute("data-index-number", i);
        el.classList.add("listy");
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
        var labelForTime = document.createElement("label");
        labelForTime.textContent = zadania[i].time;
        labelForTime.classList.add("task");
        var category = document.createElement("label");
        category.textContent = zadania[i].category;
        category.classList.add("task");
        var labelForDate = document.createElement("label");
        labelForDate.textContent = zadania[i].date;
        labelForDate.classList.add("task");
        el.appendChild(completed);
        el.appendChild(labelForCheckbox);
        el.appendChild(label);
        el.appendChild(category);
        el.appendChild(labelForTime);
        el.appendChild(labelForDate);
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
    updateCompletedTaskaCounter();
    showListOfCategories();
}
// show headers for lists if lists contain task and hide headers if doesn't contain task
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
//update task counter in the footer
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
//fill editForm with values from clicked task
function showEditForm(taskObject) {
    editTitle.value = taskObject.title;
    editCategory.value = taskObject.category;
    editContent.value = taskObject.description;
    editTime.value = taskObject.time;
    editData.value = taskObject.date;
    for(var u = 0; u < colorsDivs.length; u++){
        if(colorsDivs[u].classList.contains(taskObject.color)){
            colorsDivs[u].classList.add("picked");
        }
    }
}
// delete all tasks of selected category or all if none is selected
function deleteAllCategoryTasks(taski, taskiLista) {
    for(var p = 0; p <taski.length; p++){
        var indexOfObject = taski[p].dataset.indexNumber;
        if(!cat || cat == "all"){
            taski[p].classList.add("hide");
            setTimeout(function () {
                taskiLista.innerHTML = "";
            }, 500);
            delete zadania[indexOfObject];
            saveZadania();
        } else if (cat) {
            if(zadania[indexOfObject].category == cat){
                taski[p].classList.add("hide");
                var to = taski[p];
                setTimeout(function () {
                    taskiLista.removeChild(to);
                }, 500);
                delete zadania[indexOfObject];
                saveZadania();
            }
        }
    }
    setTimeout(function () {
        taskiLista.style.display = "block";
    }, 501);
}
// Event listeners
window.addEventListener("resize", function () {
    changingSizeOfWindow();
}, false);

window.addEventListener("load", function () {
    var localZadania = JSON.parse(localStorage.getItem("json_str"));
    if(localZadania) {
        zadania = localZadania;
        showTasks();
    }
}, false);

document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("categories")){
        var markedCategory = document.getElementsByClassName("markedCategory")[0];
        if(markedCategory){
            markedCategory.classList.remove("markedCategory");
        }
        cat = e.target.textContent;
        e.target.classList.add("markedCategory");
        showTasksOfCategory(cat);
    }
    if(e.target && e.target.classList.contains("deleteButton")){
        e.target.parentNode.parentNode.classList.add("hide");
        var indexOfObject = e.target.parentNode.parentNode.dataset.indexNumber;
        delete zadania[indexOfObject];
        setTimeout(function () {
            showTasks();
        }, 500);
        if(zadania[zadania.length-1] == undefined){
            zadania.pop();
        }
        saveZadania();
    }
    if(e.target && e.target.classList.contains("completedCheckbox")){
        indexOfObject = e.target.parentNode.dataset.indexNumber;
        if(e.target.checked){
            zadania[indexOfObject].completed = true;
        } else {
            zadania[indexOfObject].completed = false;
        }
        saveZadania();
        showTasks();
        showTasksOfCategory(cat);
    }
    if(e.target && e.target.classList.contains("deleteAll")){
        if(e.target.parentNode.parentNode.parentNode.parentNode == document.getElementById("tasksHeader") ||
            e.target.parentNode.parentNode == document.getElementById("tasksHeader")){
            deleteAllCategoryTasks(lisy, lista, false);
        } else if(e.target.parentNode.parentNode.parentNode.parentNode == document.getElementById("completedTasksHeader") ||
            e.target.parentNode.parentNode == document.getElementById("completedTasksHeader")){
            deleteAllCategoryTasks(lisy2, completedList, true);
        }
        setTimeout(function () {
            updateHeadersForList();
            updateCompletedTaskaCounter();
            showListOfCategories();
        }, 501);
    }
    if(e.target && e.target.classList.contains("task")){
        indexOfObject = e.target.parentNode.dataset.indexNumber;
        currentTaskObject = indexOfObject;
        editForm.style.display = "block";
        editForm.classList.add("rozwinC");
        setTimeout(function () {
            editForm.classList.remove("rozwinC");
        }, 500);
        showEditForm(zadania[indexOfObject]);
    }
}, false);

// document.addEventListener("click", function (e) {
//     if(e.target && e.target.classList.contains("deleteButton")){
//         e.target.parentNode.parentNode.classList.add("hide");
//         var indexOfObject = e.target.parentNode.parentNode.dataset.indexNumber;
//         delete zadania[indexOfObject];
//         setTimeout(function () {
//             showTasks();
//         }, 500);
//
//
//         if(zadania[zadania.length-1] == undefined){
//             zadania.pop();
//         }
//         saveZadania();
//     }
// }, false);
//
// document.addEventListener("click", function (e) {
//     if(e.target && e.target.classList.contains("completedCheckbox")){
//         var indexOfObject = e.target.parentNode.dataset.indexNumber;
//         if(e.target.checked){
//             zadania[indexOfObject].completed = true;
//         } else {
//             zadania[indexOfObject].completed = false;
//         }
//         saveZadania();
//         showTasks();
//         showTasksOfCategory(cat);
//     }
// }, false);
//
// document.addEventListener("click", function (e) {
//     if(e.target && e.target.classList.contains("deleteAll")){
//         if(e.target.parentNode.parentNode.parentNode.parentNode == document.getElementById("tasksHeader") ||
//             e.target.parentNode.parentNode == document.getElementById("tasksHeader")){
//             deleteAllCategoryTasks(lisy, lista, false);
//         } else if(e.target.parentNode.parentNode.parentNode.parentNode == document.getElementById("completedTasksHeader") ||
//             e.target.parentNode.parentNode == document.getElementById("completedTasksHeader")){
//             deleteAllCategoryTasks(lisy2, completedList, true);
//         }
//         setTimeout(function () {
//             updateHeadersForList();
//             updateCompletedTaskaCounter();
//             showListOfCategories();
//         }, 501);
//     }
// }, false);
//
// document.addEventListener("click", function (e) {
//     if(e.target && e.target.classList.contains("task")){
//         var indexOfObject = e.target.parentNode.dataset.indexNumber;
//         currentTaskObject = indexOfObject;
//         editForm.style.display = "block";
//         editForm.classList.add("rozwinC");
//         setTimeout(function () {
//             editForm.classList.remove("rozwinC");
//         }, 500);
//         showEditForm(zadania[indexOfObject]);
//     }
// }, false);

for(var t = 0; t < colorsDivs.length; t++){
    colorsDivs[t].addEventListener("click", function (e) {
        removePickedFromColors();
        e.target.classList.add("picked");
        pickedColor = e.target.className;
        pickedColor = pickedColor.slice(0, pickedColor.indexOf(" "));
    }, false)
}

tasksHeader.addEventListener("click", function () {
        hideList(lista);
}, false);

completedTasksHeader.addEventListener("click", function () {
        hideList(completedList);
}, false);

addTask.addEventListener("click", function (e) {
    e.preventDefault();
    if(title.value || content.value){
        var tempCategory = category.value.toLowerCase();
        var task = new Task(title.value, content.value, tempCategory, time.value, data.value, pickedColor);
        zadania.push(task);
        clearForm(addForm);
        saveZadania();
    }
}, false);

addButton.addEventListener("click", function () {
    addForm.style.display = "block";
    addForm.classList.add("rozwinC");
    setTimeout(function () {
        addForm.classList.remove("rozwinC");
    }, 500)
}, false);

save.addEventListener("click", function (e) {
    e.preventDefault();
    var tempCategory = editCategory.value.toLowerCase();
    zadania[currentTaskObject].title = editTitle.value;
    zadania[currentTaskObject].category = tempCategory;
    zadania[currentTaskObject].description = editContent.value;
    zadania[currentTaskObject].time = editTime.value;
    zadania[currentTaskObject].date = editData.value;
    if(pickedColor){
        zadania[currentTaskObject].color = pickedColor;
    }
    clearForm(editForm);
    if(cat){
        showTasksOfCategory(cat);
    }
    saveZadania();
}, false);

addFormCloseButton.addEventListener("click", function () {
    clearForm(addForm);
    showTasksOfCategory(cat);
}, false);
editFormCloseButton.addEventListener("click", function () {
    clearForm(editForm);
    showTasksOfCategory(cat);
}, false);