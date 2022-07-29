import Tag from "./Tag";

export default class Overview {
  constructor() {
    this.tags = [];
  }

  // adds tag to list
  addTag(tag) {
    if (this.tags.length === 0 || this.uniqueTag(tag)) {
      // creates new tag if no tags exist or if tag is unique
      let newTag = new Tag(tag);
      this.tags.push(newTag);
    }
  }

  // checks if tag is unique
  uniqueTag(tag) {
    let repeat = true;
    this.tags.forEach((item) => {
      if (item.name === tag) {
        // sets flag if repeat tag is found
        repeat = false;
      }
    });
    return repeat;
  }

  // adds todo to tag
  addTodo(title, desc, date, priority, tag) {
    this.addTag(tag);
    this.tags.forEach((item) => {
      if (item.name === tag) {
        item.addTodo(title, desc, date, priority, tag);
      }
    });
  }

  // prints all todos
  printAllTodos() {
    let todoList = document.querySelector("#todo-list");
    todoList.innerText = "";
    this.tags.forEach((tag) => {
      tag.getTodoList().forEach((todo) => {
        let newTodo = this.generateTodo(todo);
        todoList.appendChild(newTodo);
      });
    });
  }

  generateTodo(todo) {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // todo item (tag, title, description, and due date)
    let newTodo = document.createElement("div");
    newTodo.classList.add("todo-text");
    let newTodoTag = document.createElement("div");
    newTodoTag.classList.add("todo-tag");
    let newTodoText = document.createElement("div");
    let newTodoTitle = document.createElement("div");
    newTodoTitle.classList.add("todo-title");
    let newTodoDesc = document.createElement("div");
    let newTodoDate = document.createElement("div");
    newTodoDate.classList.add("todo-date");
    newTodo.classList.add(setPriority(todo.priority));
    if (todo.done) {
      newTodo.classList.add("todo-done");
    } else {
      newTodo.classList.remove("todo-done");
    }
    newTodoTag.innerText = `[${todo.tag}]`;
    newTodoTitle.innerText = `${todo.title}`;
    newTodoDesc.innerText = `${todo.desc}`;
    newTodoDate.innerText = `${todo.dueDate}`;
    newTodo.appendChild(newTodoTag);
    newTodoText.appendChild(newTodoTitle);
    newTodoText.appendChild(newTodoDesc);
    newTodo.appendChild(newTodoText);

    // done status
    let doneStatus = document.createElement("input");
    doneStatus.type = "checkbox";
    doneStatus.checked = todo.done;
    // change done status if clicking on checkbox or on todo item
    [ doneStatus, todoItem ].forEach((item) => {
      item.addEventListener("click", () => {
        doneStatus.checked = !doneStatus.checked;
        todo.done = doneStatus.checked;
        if (doneStatus.checked) {
          newTodo.classList.add("todo-done");
        } else {
          newTodo.classList.remove("todo-done");
        }
      });
    });

    // delete button
    let delButton = document.createElement("button");
    delButton.classList.add("del-button");
    delButton.innerText = "X";
    delButton.addEventListener("click", () => {
      this.deleteTodo(todo);
    });

    // putting date and delete button together
    let todoEnd = document.createElement("div");
    todoEnd.classList.add("todo-end");
    todoEnd.appendChild(newTodoDate);
    todoEnd.appendChild(delButton);

    todoItem.appendChild(doneStatus);
    todoItem.appendChild(newTodo);
    todoItem.appendChild(todoEnd);
    return todoItem;
  }

  // deletes todo
  deleteTodo(todo) {
    this.tags.forEach((tag) => {
      tag.getTodoList().forEach((item) => {
        if (item === todo) {
          tag.list.splice(tag.list.indexOf(item), 1);
        }
      });
    });
    this.printAllTodos();
  }
}

// sets priority class
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
