/**
 * Created by Mateusz Chybiorz on 2016-11-02.
 */
var addButton = document.getElementById("plus");
var lista = document.getElementById("tasks");
var addForm = document.getElementById("addForm");
var closeButton = document.getElementById("close");
var addTask = document.getElementById("addTask");

var title = document.getElementById("title");
var category = document.getElementById("category");
var content = document.getElementById("content");
var time = document.getElementById("time");
var data = document.getElementById("data");

addButton.addEventListener("click", function (e) {
    addForm.style.display = "block";
    addForm.classList.add("show");
    setTimeout(function () {
        addForm.classList.remove("show");
    }, 500)
}, false);

closeButton.addEventListener("click", function (e) {
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

// deleteButton.addEventListener("click")



// function deleteTask() {
// }

var deleteButtons = document.getElementsByClassName("deleteButton");

function showTasks() {
    lista.innerHTML =   "";
    for(var i =0; i < zadania.length; i++){
        if(zadania[i] == undefined){
            continue;
        }
        var el = document.createElement("li");
        el.setAttribute("data-index-number", i);
        var completed = document.createElement("input");
        completed.type = "checkbox";
        var label = document.createElement("label");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");
        if(zadania[i].title){
            label.textContent = zadania[i].title;
        } else {
            label.textContent = zadania[i].description;
        }
        el.appendChild(completed);
        el.appendChild(label);
        el.appendChild(deleteButton);
        lista.appendChild(el);
    }
}

document.addEventListener("click", function (e) {
   if(e.target && e.target.classList.contains("deleteButton")){
       var indexOfObject = e.target.parentNode.dataset.indexNumber;
       delete zadania[indexOfObject];
       showTasks();
       if(zadania[zadania.length-1] == undefined){
            zadania.pop();
       }
   }
});

addTask.addEventListener("click", function (e) {
    e.preventDefault();
    if(title.value || content.value){
        var task = new Task(title.value, content.value, category.value, time.value, data.value);
        zadania.push(task);
        console.log(zadania);
        clearAddForm();
    }
});

var zadania = [];

function Task(title, description, category, time, date) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.time = time;
    this.date = date;
    this.completed = false;
}

