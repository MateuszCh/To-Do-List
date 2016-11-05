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


function showTasks() {
    lista.innerHTML =   "";
    for(var i =0; i < zadania.length; i++){
        var el = document.createElement("li");
        el.textContent = zadania[i].title;
        lista.appendChild(el);
    }
}

addTask.addEventListener("click", function (e) {
    e.preventDefault();
    if(title.value || content.value){
        var task = new Task(title.value, category.value, content.value, time.value, data.value);
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

