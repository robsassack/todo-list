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
    this.tags.forEach(tag => {
      tag.getTodoList().forEach(todo => {
        let newTodo = document.createElement("li");
        newTodo.innerText = `${todo.title} - ${todo.desc} - ${todo.dueDate} - ${todo.priority} - ${todo.tag}`;
        todoList.appendChild(newTodo);
      });
    });
  }
}
