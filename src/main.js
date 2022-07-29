import Overview from "./Overview";
import './style.css';

const mainOverview = new Overview();

// sample todos
mainOverview.addTodo("Buy milk", "2% milk", "2020-01-01", "high", "Groceries");
mainOverview.addTodo("Buy eggs", "One dozen eggs", "2020-01-01", "low", "Groceries");
mainOverview.addTodo("Buy bread", "Loaf of whole wheat", "2020-01-01", "low", "Groceries");
mainOverview.addTodo("Buy apples", "", "2020-01-01", "low", "Groceries");

document.querySelector("#todo-submit").addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let desc = document.querySelector("#desc").value;
  let date = document.querySelector("#dueDate").value;
  let priority = document.querySelector("#priority").value;
  let tag = document.querySelector("#tag").value;

  mainOverview.addTodo(title, desc, date, priority, tag);

  mainOverview.printAllTodos();
});

document.querySelector("#tag-submit").addEventListener("click", () => {
  let name = document.querySelector("#tag-name").value;
  mainOverview.addTag(name);
  console.log(mainOverview);
});

mainOverview.printAllTodos();