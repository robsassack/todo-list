import Tag from "./Tag";
import { format, isToday } from "date-fns";

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

  todoDateFormat(date) {
    if (date !== "") {
      date = date.split("-");
      date = format(new Date(date[0], date[1] - 1, date[2]), "MMM d, yyyy");
    }
    return date;
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
    this.generateDropdown();
  }

  // print todos with given tag name
  printTagTodos(tag) {
    let todoList = document.querySelector("#todo-list");
    todoList.innerText = "";
    this.tags.forEach((item) => {
      if (item.name === tag) {
        item.getTodoList().forEach((todo) => {
          let newTodo = this.generateTodo(todo);
          todoList.appendChild(newTodo);
        });
      }
    });
    this.generateDropdown();
  }

  // print todos with today's date
  printTodayTodos() {
    let todoList = document.querySelector("#todo-list");
    todoList.innerText = "";
    this.tags.forEach((tag) => {
      tag.getTodoList().forEach((todo) => {
        let date = todo.dueDate;
        date = date.split("-");
        date = new Date(date[0], date[1] - 1, date[2]);
        if (isToday(date)) {
          let newTodo = this.generateTodo(todo);
          todoList.appendChild(newTodo);
        }
      });
    });
    this.generateDropdown();
  }

  getCurrentSelector() {
    let selector = document.querySelector("#selector").value;
    return selector;
  }

  generateDropdown() {
    let selector = document.querySelector("#selector");
    let currentSelector = selector.value;
    selector.innerText = "";
    let allTodos = document.createElement("option");
    allTodos.innerText = "All";
    allTodos.value = "all";
    selector.appendChild(allTodos);
    let todayTodos = document.createElement("option");
    todayTodos.innerText = "Today";
    todayTodos.value = "today";
    selector.appendChild(todayTodos);
    let separator = document.createElement("option");
    separator.innerText = "──────────";
    separator.disabled = true;
    selector.appendChild(separator);
    this.tags.forEach((tag) => {
      // skip if tag name is blank
      if (tag.name.trim().length) {
        let tagSelect = document.createElement("option");
        tagSelect.innerText = tag.name;
        tagSelect.value = `tag:${tag.name}`;
        selector.appendChild(tagSelect);
      }
    });
    selector.value = currentSelector;
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
    // skip printing tag if blank
    if (todo.tag.trim().length) {
      newTodoTag.innerText = `[${todo.tag}]`;
    }
    newTodoTitle.innerText = `${todo.title}`;
    newTodoDesc.innerText = `${todo.desc}`;
    newTodoDate.innerText = `${this.todoDateFormat(todo.dueDate)}`;
    newTodo.appendChild(newTodoTag);
    newTodoText.appendChild(newTodoTitle);
    newTodoText.appendChild(newTodoDesc);
    newTodo.appendChild(newTodoText);

    // done status
    let doneStatus = document.createElement("input");
    doneStatus.type = "checkbox";
    doneStatus.checked = todo.done;
    // change done status if clicking on checkbox or on todo item
    [doneStatus, todoItem].forEach((item) => {
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
        // remove tag if no todos exist
        if (tag.list.length === 0) {
          this.tags.splice(this.tags.indexOf(tag), 1);
        }
      });
    });
    if (this.getCurrentSelector() === "all") {
      this.printAllTodos();
    } else if (this.getCurrentSelector() === "today") {
      this.printTodayTodos();
    } else if (this.getCurrentSelector().startsWith("tag:")) {
      this.printTagTodos(this.getCurrentSelector().split(":")[1]);
    }
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
