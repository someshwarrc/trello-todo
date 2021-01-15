// handle modal dialog

var addTaskBtn = document.querySelector("#add-task");
var closeTaskBtn = document.querySelector("#cancel-task");
var modal = document.querySelector(".modal");
var container = document.querySelector(".container");

addTaskBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  container.classList.add("blurr");
});

closeTaskBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
  container.classList.remove("blurr");
});

// handle task adding

var submitTaskBtn = document.querySelector("#submit-task");
var textarea = document.querySelector("textarea");

var todo = document.querySelector(".todo").querySelector(".card-body");
var doing = document.querySelector(".doing").querySelector(".card-body");
var done = document.querySelector(".done").querySelector(".card-body");

submitTaskBtn.addEventListener("click", function () {
  // get textarea value
  var radioBtn = document.querySelector("input[name=task-status]:checked");

  if (textarea.value.trim() !== "") {
    // textarea is not empty or filled with only spaces
    var task = textarea.value.trim();
  }

  // get radio btn value
  var choice = radioBtn.value;

  //   console.log(task, choice);
  var div = document.createElement("div");
  div.className = "card-element";
  div.setAttribute("draggable", "true");
  div.textContent = task;
  div.addEventListener("dragstart", (e) => dragStart(e));
  div.addEventListener("dragend", (e) => dragEnd());

  switch (choice) {
    case "todo":
      todo.appendChild(div);
      break;
    case "doing":
      doing.appendChild(div);
      break;
    case "done":
      done.appendChild(div);
      break;
    default:
      break;
  }
});

function dragStart(e) {
  //   e.preventDefault();
  //   console.log(e.srcElement);
  //   console.log(e);
  var elem = e.srcElement;
  e.dataTransfer.setData("Text", elem.textContent);
  elem.style.opacity = "0.5";
  setTimeout(() => elem.parentElement.removeChild(elem), 10);
}

function dragEnd(e) {
  e.srcElement.style.opacity = "1";
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.preventDefault();
  console.log(e);
  var data = e.dataTransfer.getData("Text");
  var elem = document.createElement("div");
  elem.className = "card-element grabbable";
  elem.setAttribute("draggable", "true");
  elem.textContent = data;
  elem.addEventListener("dragstart", (e) => dragStart(e));
  elem.addEventListener("dragend", (e) => dragEnd());
  var target = e.srcElement;
  if (target.classList.contains("card-element")) {
    target.parentElement.appendChild(elem);
  } else if (target.classList.contains("card-body")) {
    target.appendChild(elem);
  } else {
    // nothing
  }
}

var draggables = document.querySelectorAll('[draggable="true"]');

draggables.forEach((item) => {
  item.addEventListener("dragstart", (e) => dragStart(e));
  item.addEventListener("dragend", (e) => dragEnd());
});

todo.addEventListener("dragenter", (e) => dragEnter(e));
todo.addEventListener("dragleave", (e) => dragLeave(e));
todo.addEventListener("dragover", (e) => dragOver(e));
todo.addEventListener("drop", (e) => dragDrop(e));

doing.addEventListener("dragenter", (e) => dragEnter(e));
doing.addEventListener("dragleave", (e) => dragLeave(e));
doing.addEventListener("dragover", (e) => dragOver(e));
doing.addEventListener("drop", (e) => dragDrop(e));

done.addEventListener("dragenter", (e) => dragEnter(e));
done.addEventListener("dragleave", (e) => dragLeave(e));
done.addEventListener("dragover", (e) => dragOver(e));
done.addEventListener("drop", (e) => dragDrop(e));
