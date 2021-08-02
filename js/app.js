// Selecting the elements
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoSubmit = document.querySelector(".todo-submit");
const standardTheme = document.querySelector(".standard-theme");
const lightTheme = document.querySelector(".light-theme");
const darkerTheme = document.querySelector(".darker-theme");

// Adding event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoSubmit.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDelete);
standardTheme.addEventListener("click", () => {
  changeTheme("standard");
});
lightTheme.addEventListener("click", () => {
  changeTheme("light");
});
darkerTheme.addEventListener("click", () => {
  changeTheme("darker");
});

let savedTheme = localStorage.getItem("savedTheme");
savedTheme === null
  ? changeTheme("standard")
  : changeTheme(localStorage.getItem("savedTheme"));

// Functions
function addTodo(e) {
  //Prevents form from submitting
  e.preventDefault();

  if (todoInput.value === "") {
    alert("You must write something!");
  } else {
    // Creating div which contains li and 2 buttons
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Add to local storage
    saveLocalTodos(todoInput.value);

    // Creating li element
    const todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    // Check button to complete task
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    // Trash button to delete task
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    // Appending the div to todoList
    todoList.appendChild(todoDiv);

    // Clearing out the input tag
    todoInput.value = "";
  }
}

function checkDelete(e) {
  const itemClicked = e.target;
  // console.log(e.target);

  if (itemClicked.classList[0] === "delete-btn") {
    const todo = itemClicked.parentElement;
    // Animation when we delete Item
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (itemClicked.classList[0] === "complete-btn") {
    const todo = itemClicked.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveLocalTodos(todo) {
  // Checking if I already have todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Creating div which contains li and 2 buttons
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Creating li element
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    // Check button to complete task
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    // Trash button to delete task
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    // Appending the div to todoList
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function changeTheme(color) {
  localStorage.setItem("savedTheme", color);
  savedTheme = localStorage.getItem("savedTheme");

  document.body.className = color;
  if (color === "light") {
    document.querySelector(".title").classList.toggle("light-title");
  }

  document.querySelector("input").className = `todo-input ${color}-input`;

  document.querySelectorAll(".todo").forEach((todo) => {
    Array.from(todo.classList).some((item) => item === "completed")
      ? (todo.className = `todo ${color}-todo completed`)
      : (todo.className = `todo ${color}-todo`);
  });

  document.querySelectorAll("button").forEach((button) => {
    console.log("We are here");
    Array.from(button.classList).some((item) => {
      if (item === "todo-submit") {
        button.className = `todo-submit ${color}-btn`;
      } else if (item === "complete-btn") {
        button.className = `complete-btn ${color}-btn`;
      } else if (item === "delete-btn") {
        button.className = `delete-btn ${color}-btn`;
      }
    });
  });
}
