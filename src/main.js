import Overview from "./Overview";
import Tag from "./Tag";
import Todo from "./Todo";

const mainOverview = new Overview();

document.querySelector("#todo-submit").addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let desc = document.querySelector("#desc").value;
  let date = Date(document.querySelector("#date"));
  let priority = document.querySelector("#priority").value;
  let tag = document.querySelector("#tag").value;
  let newTodo = new Todo(title, desc, date, priority, tag);
  console.log(newTodo);
});

document.querySelector("#tag-submit").addEventListener("click", () => {
  let name = document.querySelector("#tag-name");
  let newTag = new Tag(name);
  mainOverview.tags.push(newTag);
  console.log(mainOverview);
});