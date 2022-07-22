import Overview from "./Overview";
import Project from "./Project";
import Todo from "./Todo";

document.querySelector("#submit").addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let desc = document.querySelector("#desc").value;
  let date = Date(document.querySelector("#date"));
  let priority = document.querySelector("#priority").value;
  let project = document.querySelector("#project").value;
  let newTodo = new Todo(title, desc, date, priority, project);
  console.log(newTodo);
});