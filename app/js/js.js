/**
 * Created by Mateusz Chybiorz on 2016-11-02.
 */
var addButton = document.getElementById("plus");
var lista = document.getElementById("tasks");
var body = document.getElementsByTagName("body");
body = body[0];



addButton.addEventListener("click", function (e) {
    var addForm = document.createElement("section");
    var form = document.createElement("form");
    var title = document.createElement("input");
    title.type = "text";
    var content = document.createElement("input");
    content.type = "text";
    var data = document.createElement("input");
    data.type = "date";
    var czas = document.createElement("input");
    czas.type = "time";
    var dodaj = document.createElement("input");
    dodaj.type = "submit";
    form.appendChild(title);
    form.appendChild(content);
    form.appendChild(data);
    form.appendChild(czas);
    form.appendChild(dodaj);
    var close = document.createElement("i");
    close.id = "close";
    close.classList.add("fa");
    close.classList.add("fa-times");
    close.classList.add("fa-2x");
    close.classList.add("close");
    close.setAttribute("aria-hidden", "true");
    addForm.classList.add("addForm");
    body.appendChild(addForm);
    setTimeout(function () {
        addForm.appendChild(close);
        addForm.appendChild(form);
    }, 100);

    close.addEventListener("click", function (e) {
        body.removeChild(addForm);
    }, false)
}, false)


