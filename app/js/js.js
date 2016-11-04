/**
 * Created by Mateusz Chybiorz on 2016-11-02.
 */
var addButton = document.getElementById("plus");
var lista = document.getElementById("tasks");
var addForm = document.getElementsByClassName("addForm");
addForm = addForm[0];
var closeButton = document.getElementById("close");


addButton.addEventListener("click", function (e) {
    addForm.style.display = "block";
    addForm.classList.add("show");
    setTimeout(function () {
        addForm.classList.remove("show");
    }, 500)
}, false)

closeButton.addEventListener("click", function (e) {
    addForm.classList.add("hide");
    setTimeout(function () {
        addForm.style.display = "none";
        addForm.classList.remove("hide");
    }, 500)
}, false);
