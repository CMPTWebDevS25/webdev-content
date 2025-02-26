const addToDoButton = document.querySelector("#addToDo");
const toDoList = document.querySelector("#toDoList");
const toDoInputField = document.querySelector("#inputField");

function addToDo() {
  const toDo = toDoInputField.value;
  if (toDo === "") {
    alert("Please enter a to-do.");
    return;
  }

  const p = document.createElement("p");
  p.classList.add("paragraph-styling");
  p.innerText = toDo;
  toDoList.appendChild(p);
  toDoInputField.value = "";
  p.addEventListener("click", function () {
    if (p.style.textDecoration === "line-through") {
      p.style.textDecoration = "none";
    } else {
      p.style.textDecoration = "line-through";
    }
  });
  p.addEventListener("dblclick", function () {
    toDoList.removeChild(p);
  });
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addToDo();
  }
}
