var addButton=document.getElementById("plus"),lista=document.getElementById("tasks"),body=document.getElementsByTagName("body");body=body[0],addButton.addEventListener("click",function(e){var t=document.createElement("section"),d=document.createElement("form"),n=document.createElement("input");n.type="text";var a=document.createElement("input");a.type="text";var i=document.createElement("input");i.type="date";var c=document.createElement("input");c.type="time";var l=document.createElement("input");l.type="submit",d.appendChild(n),d.appendChild(a),d.appendChild(i),d.appendChild(c),d.appendChild(l);var m=document.createElement("i");m.id="close",m.classList.add("fa"),m.classList.add("fa-times"),m.classList.add("fa-2x"),m.classList.add("close"),m.setAttribute("aria-hidden","true"),t.classList.add("addForm"),body.appendChild(t),setTimeout(function(){t.appendChild(m),t.appendChild(d)},100),m.addEventListener("click",function(e){body.removeChild(t)},!1)},!1);