import Tag from './Tag';

export default class Overview {
  constructor() {
    this.tags = [];
  }

  addTag(tag) {
    if (this.tags.length === 0 || this.uniqueTag(tag)) {
      // creates new tag if no tags exist or if tag is unique
      let newTag = new Tag(tag);
      this.tags.push(newTag);
    }
  }

  uniqueTag(tag) {
    let repeat = true;
    this.tags.forEach(item => {
      if (item.name === tag) {
        // sets flag if repeat tag is found
        repeat = false;
      }
    });
    return repeat;
  }

  addTodo(title, desc, date, priority, tag) {
    this.addTag(tag);
    this.tags.forEach(item => {
      if (item.name === tag) {
        item.addTodo(title, desc, date, priority, tag);
      }
    });
  }

  printAllTodos() {
    let todoList = document.querySelector("#todo-list");
    todoList.innerText = "";
    this.tags.forEach(tag => {
      tag.getTodoList().forEach(todo => {
        let newTodo = document.createElement("li");
        newTodo.classList.add(setPriority(todo.priority));
        newTodo.innerText = `[${todo.priority}] ${todo.title} - ${todo.desc} - ${todo.dueDate} - ${todo.tag}`;
        todoList.appendChild(newTodo);
      });
    });
  }
}

function setPriority(priority) {
  switch (priority) {
    case "high":
      return "high-priority";
    case "med":
      return "med-priority";
    case "low":
      return "low-priority";
  }
}