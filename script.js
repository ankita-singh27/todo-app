
const myUl = document.getElementById("taskList");
const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");

let editTodo=null;

// Add a task
function addtask() {
  if (taskInput.value === "") {
    return alert("you must write something");
  }


  if (addButton.innerHTML === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = taskInput.value;
        addButton.innerText = "Add";
        taskInput.value = "";
        saveData();
  
 }
 else {
  
  const task = taskInput.value;
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerHTML = task;
  li.appendChild(p);


  // Creating Edit Btn
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("button", "edit");
  li.appendChild(editBtn);

  // Creating Delete Btn
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("button", "delete");
  li.appendChild(deleteBtn);

  myUl.appendChild(li);
  taskInput.value = "";
  saveData();
 }
 
}

 // Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
  if (e.target.innerHTML === "Delete") {
      myUl.removeChild(e.target.parentElement);
      saveData();
  }

  if (e.target.innerHTML === "Edit") {
      taskInput.value = e.target.previousElementSibling.innerHTML;
      taskInput.focus();
      addButton.innerText = "Edit";
      editTodo = e;
  }
}
 
 
  //delete all tasks
  const deleteAll = document.querySelector("#deleteTask");
  deleteAll.addEventListener("click", function () {
    myUl.remove();
  });


///////////////////when task get completed/////////////////////
myUl.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

//////////////Add new task after pressing enter key/////////////////
taskInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addtask();
  }
});

addButton.addEventListener("click", addtask);
myUl.addEventListener('click', updateTodo);


///// Search for tasks///////
function searchTasks() {
const searchInput = document.getElementById("searchInput");
  const searchText=searchInput.value.toLowerCase();
  
  const tasks = taskList.getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    const taskText = tasks[i].innerHTML.toLowerCase();
   const isVisible = taskText.includes(searchText);
   tasks[i].style.display = isVisible ? "block" : "none";
  }
}


////localstorage
function saveData() {
  localStorage.setItem("data", myUl.innerHTML);
}
function showTask() {
  myUl.innerHTML = localStorage.getItem("data");
}
showTask();
