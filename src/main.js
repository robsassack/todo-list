import Overview from "./Overview";
import Project from "./Project";
import Todo from "./Todo";

const mainOverview = new Overview();

document.querySelector("#todo-submit").addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let desc = document.querySelector("#desc").value;
  let date = Date(document.querySelector("#date"));
  let priority = document.querySelector("#priority").value;
  let project = document.querySelector("#project").value;
  let newTodo = new Todo(title, desc, date, priority, project);
  console.log(newTodo);
});

document.querySelector("#project-submit").addEventListener("click", () => {
  let name = document.querySelector("#project-name");
  let newProject = new Project(name);
  mainOverview.projects.push(newProject);
  console.log(mainOverview);
});