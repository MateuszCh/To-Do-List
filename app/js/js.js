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
var tasksHeader = document.getElementById("tasksHeaderH2");
var completedTasksHeader = document.getElementById("completedTasksHeaderH2");
var categoryList = document.getElementById("listOfCategories");
var colorsDivs = document.querySelectorAll(".colors div");
var lisy = document.getElementsByClassName("lisUn");
var lisy2 = document.getElementsByClassName("lisCom");
var taski = document.getElementsByClassName("listy");

var currentTaskObject;
var pickedColor;
var currentCategory;
var cat;

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
var listOfCategories = [];



for(var t = 0; t < colorsDivs.length; t++){
    colorsDivs[t].addEventListener("click", function (e) {
        removePickedFromColors();
        e.target.classList.add("picked");
        pickedColor = e.target.className;
        pickedColor = pickedColor.slice(0, pickedColor.indexOf(" "));
    }, false)
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

document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("categories")){
        cat = e.target.textContent;
        showTasksOfCategory(cat);
    }
}, false);


function removePickedFromColors() {
    for(var w = 0; w <colorsDivs.length; w++){
        if(colorsDivs[w].classList.contains("picked")){
            pickedColor = undefined;
            colorsDivs[w].classList.remove("picked")
        }
    }
}


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

function Task(title, description, category, time, date, color) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.time = time;
    this.date = date;
    this.color  =   color;
    this.completed = false;
}
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

window.addEventListener("resize", function () {
    if(window.matchMedia("(min-width: 1200px)").matches){
        addForm.style.display = "block";
    }   else {
        addForm.style.display = "none";
        clearForm(addForm);
    }
}, false);

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

    for(var u = 0; u < colorsDivs.length; u++){
        if(colorsDivs[u].classList.contains(taskObject.color)){
            colorsDivs[u].classList.add("picked");
        }
    }
}

function deleteAllCategoryTasks(taski, taskiLista) {
    for(var p = 0; p <taski.length; p++){
        var indexOfObject = taski[p].dataset.indexNumber;
        if(!cat || cat == "all"){
            taski[p].classList.add("hide");
            setTimeout(function () {
                taskiLista.innerHTML = "";
            }, 500);
            delete zadania[indexOfObject];
        } else if (cat) {
            if(zadania[indexOfObject].category == cat){
                taski[p].classList.add("hide");
                var to = taski[p];
                setTimeout(function () {
                    taskiLista.removeChild(to);
                }, 500);
                delete zadania[indexOfObject];
            }
        }
    }
    setTimeout(function () {
        taskiLista.style.display = "block";
    }, 501);
}

tasksHeader.addEventListener("click", function (e) {
    if(e.target == tasksHeader){
        hideList(lista);
    }
}, false);

completedTasksHeader.addEventListener("click", function (e) {
    if(e.target == completedTasksHeader){
        hideList(completedList);
    }
}, false);

document.addEventListener("click", function (e) {
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
        showTasksOfCategory(cat);
    }
}, false);

addTask.addEventListener("click", function (e) {
    e.preventDefault();
    if(title.value || content.value){
        var tempCategory = category.value.toLowerCase();
        var task = new Task(title.value, content.value, tempCategory, time.value, data.value, pickedColor);
        zadania.push(task);
        clearForm(addForm);
    }
}, false);



document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("deleteAll")){
        if(e.target.parentNode == document.getElementById("tasksHeader")){
            deleteAllCategoryTasks(lisy, lista, false);
        } else if(e.target.parentNode == document.getElementById("completedTasksHeader")){
            deleteAllCategoryTasks(lisy2, completedList, true);
        }
        setTimeout(function () {
            updateHeadersForList();
            updateCompletedTaskaCounter();
            showListOfCategories();
        }, 501);
    }
}, false);

document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("task")){
        var indexOfObject = e.target.parentNode.dataset.indexNumber;
        currentTaskObject = indexOfObject;
        editForm.style.display = "block";
        editForm.classList.add("rozwinC");
        setTimeout(function () {
            editForm.classList.remove("rozwinC");
        }, 500)
        showEditForm(zadania[indexOfObject]);
    }
}, false);

addButton.addEventListener("click", function (e) {
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
}, false);

addFormCloseButton.addEventListener("click", function () {
    clearForm(addForm);
    showTasksOfCategory(cat);
}, false);
editFormCloseButton.addEventListener("click", function () {
    clearForm(editForm);
    showTasksOfCategory(cat);
}, false);

//local storage
//validate data i time
//znikanie addform przy rozszerzaniu window