import Overview from "./Overview";
import './style.css';

const mainOverview = new Overview();

// sample todos
mainOverview.addTodo("Buy milk", "2% milk", "2020-01-01", "high", "Groceries");
mainOverview.addTodo("Buy eggs", "One dozen eggs", "2022-07-29", "low", "Groceries");
mainOverview.addTodo("Buy bread", "Loaf of whole wheat", "2020-01-01", "low", "Groceries");
mainOverview.addTodo("Buy apples", "", "2022-07-29", "low", "Groceries");
mainOverview.addTodo("Stapler", "", "2020-01-01", "low", "Office");
mainOverview.addTodo("Pen", "", "2022-07-29", "low", "Office");
mainOverview.addTodo("Pencil", "", "2020-01-01", "low", "Office");

document.querySelector("#todo-submit").addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  if (!title.trim().length) {
    return;
  }
  let desc = document.querySelector("#desc").value;
  let date = document.querySelector("#dueDate").value;
  let priority = document.querySelector("#priority").value;
  let tag = document.querySelector("#tag").value;

  mainOverview.addTodo(title, desc, date, priority, tag);

  mainOverview.printAllTodos();
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

mainOverview.printAllTodos();