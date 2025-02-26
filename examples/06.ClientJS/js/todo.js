const addToDoButton = document.querySelector("#addToDo");
const toDoList = document.querySelector("#toDoList");
const toDoInputField = document.querySelector("#inputField");
addToDoButton.addEventListener("click", addToDo);
//addToDoButton.removeEventListener("click", addToDo);
//

function addToDo() {
  const toDo = toDoInputField.value;
  if (toDo === "") {
    alert("Please enter a to-do.");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("paragraph-styling");
  li.innerText = toDo;
  toDoList.appendChild(li);
  toDoInputField.value = "";
  li.addEventListener("click", () => {
    if (li.style.textDecoration === "line-through") {
      li.style.textDecoration = "none";
    } else {
      li.style.textDecoration = "line-through";
    }
  });
  li.addEventListener("dblclick", function () {
    toDoList.removeChild(li);
  });
}

function handleKeyPress(event) {
  console.log(event.target.value);
  if (event.key === "Enter") {
    addToDo();
  }
}
