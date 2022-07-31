import Overview from "./Overview";
import "./style.css";

const mainOverview = new Overview();

// if local storage isn't empty, load it
if (localStorage.getItem("todoList") !== null) {
  mainOverview.loadLocalStorage();
  mainOverview.printAllTodos();
}

document.querySelector("#todo-submit").addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  if (!title.trim().length) {
    return;
  }
  let desc = document.querySelector("#desc").value;
  let date = document.querySelector("#dueDate").value;
  let priority = document.querySelector("#priority").value;
  let tag = document.querySelector("#tag").value;

  mainOverview.addTodo(title, desc, date, priority, tag, false);

  mainOverview.printAllTodos();

  let todoForm = document.querySelector(".todo-form");
  let formContainer = document.querySelector(".form-container");
  todoForm.style.visibility = "hidden";
  formContainer.style.visibility = "hidden";
  document.querySelector("#title").value = "";
  document.querySelector("#desc").value = "";
  document.querySelector("#dueDate").value = "";
  document.querySelector("#priority").value = "low";
  document.querySelector("#tag").value = "";
});

document.querySelector("#selector").addEventListener("change", () => {
  let selector = document.querySelector("#selector").value;
  if (selector === "all") {
    mainOverview.printAllTodos();
  } else if (selector === "today") {
    mainOverview.printTodayTodos();
  } else if (selector.startsWith("tag:")) {
    let tag = selector.split(":")[1];
    mainOverview.printTagTodos(tag);
  }
});

document.querySelector("#add-todo-menu").addEventListener("click", () => {
  let todoForm = document.querySelector(".todo-form");
  let formContainer = document.querySelector(".form-container");
  todoForm.style.visibility = "visible";
  formContainer.style.visibility = "visible";
});

document
  .querySelector(".form-container")
  .addEventListener("click", function (e) {
    if (document.querySelector(".todo-form").contains(e.target)) {
      return;
    } else {
      let todoForm = document.querySelector(".todo-form");
      let formContainer = document.querySelector(".form-container");
      todoForm.style.visibility = "hidden";
      formContainer.style.visibility = "hidden";
    }
  });

mainOverview.printAllTodos();
