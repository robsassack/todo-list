import Overview from "./Overview";

const mainOverview = new Overview();

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