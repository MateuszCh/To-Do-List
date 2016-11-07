/**
 * Created by Mateusz Chybiorz on 2016-11-02.
 */
var addButton = document.getElementById("plus");
var lista = document.getElementById("tasks");

var completedList = document.getElementById("completedTasks");
var addForm = document.getElementById("addForm");
var closeButton = document.getElementById("close");
var addTask = document.getElementById("addTask");
var completedCheckbox = document.getElementsByClassName("completedCheckbox");
var completedTasksCounter = document.getElementById("counter");
var deleteAllButtons = document.getElementsByClassName("deleteAll");
var title = document.getElementById("title");
var category = document.getElementById("category");
var content = document.getElementById("content");
var time = document.getElementById("time");
var data = document.getElementById("data");
var zadania = [];

function Task(title, description, category, time, date) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.time = time;
    this.date = date;
    this.completed = false;
}

addButton.addEventListener("click", function (e) {
    addForm.style.display = "block";
    addForm.classList.add("show");
    setTimeout(function () {
        addForm.classList.remove("show");
    }, 500)
}, false);

closeButton.addEventListener("click", function () {
    clearAddForm();
}, false);

function clearAddForm() {
    addForm.classList.add("hide");
    setTimeout(function () {
        addForm.style.display = "none";
        addForm.classList.remove("hide");
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
        var deleteButton = document.createElement("button");
        // deleteButton.textContent = "Delete";
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
        console.log(zadania);
        clearAddForm();
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

//animacje znikania przesuwanych zadań
//edytowanie zadań, kolory
//sortowanie
//kategorie
//dodać przyciski usuń wszystko, completed wszystko,
//zwijanie tasks oraz completed tasks
//local storage