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
    this.updateLocalStorage();
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
    this.updateLocalStorage();
    return repeat;
  }

  // adds todo to tag
  addTodo(title, desc, date, priority, tag, done) {
    this.addTag(tag);
    this.tags.forEach((item) => {
      if (item.name === tag) {
        item.addTodo(title, desc, date, priority, tag, done);
      }
    });
    this.updateLocalStorage();
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
    this.updateLocalStorage();
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
    this.updateLocalStorage();
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
    this.updateLocalStorage();
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
    this.updateLocalStorage();
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
    doneStatus.classList.add("done-status");
    doneStatus.type = "checkbox";
    doneStatus.checked = todo.done;
    // change done status if clicking on checkbox
    doneStatus.addEventListener("click", () => {
      todo.done = doneStatus.checked;
      this.updateLocalStorage();
      if (doneStatus.checked) {
        newTodo.classList.add("todo-done");
      } else {
        newTodo.classList.remove("todo-done");
      }
    });

    // delete button
    let delButton = document.createElement("button");
    delButton.classList.add("del-button");
    delButton.innerText = "X";
    delButton.addEventListener("click", () => {
      this.deleteTodo(todo);
    });

    // event listener for editing todo
    todoItem.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("done-status") ||
        e.target.classList.contains("del-button")
      ) {
        return;
      }
      let todoSubmit = document.querySelector("#todo-submit");
      let editSubmit = document.createElement("button");
      editSubmit.classList.add("edit-submit");
      editSubmit.innerText = "Confirm Edit";

      let todoForm = document.querySelector(".todo-form");
      let formContainer = document.querySelector(".form-container");
      todoForm.style.visibility = "visible";
      formContainer.style.visibility = "visible";

      todoSubmit.replaceWith(editSubmit);

      document.querySelector("#title").value = todo.title;
      document.querySelector("#desc").value = todo.desc;
      document.querySelector("#dueDate").value = todo.dueDate;
      document.querySelector("#priority").value = todo.priority;
      document.querySelector("#tag").value = todo.tag;

      document
        .querySelector(".form-container")
        .addEventListener("click", function (e) {
          if (document.querySelector(".todo-form").contains(e.target)) {
            return;
          } else {
            todoForm.style.visibility = "hidden";
            formContainer.style.visibility = "hidden";
            editSubmit.replaceWith(todoSubmit);
          }

          document.querySelector("#title").value = "";
          document.querySelector("#desc").value = "";
          document.querySelector("#dueDate").value = "";
          document.querySelector("#priority").value = "low";
          document.querySelector("#tag").value = "";
        });

      editSubmit.addEventListener("click", () => {
        todo.title = document.querySelector("#title").value;
        todo.desc = document.querySelector("#desc").value;
        todo.dueDate = document.querySelector("#dueDate").value;
        todo.priority = document.querySelector("#priority").value;
        todo.tag = document.querySelector("#tag").value;
        this.updateLocalStorage();
        todoForm.style.visibility = "hidden";
        formContainer.style.visibility = "hidden";
        editSubmit.replaceWith(todoSubmit);

        document.querySelector("#title").value = "";
        document.querySelector("#desc").value = "";
        document.querySelector("#dueDate").value = "";
        document.querySelector("#priority").value = "low";
        document.querySelector("#tag").value = "";

        if (this.getCurrentSelector() === "all") {
          this.printAllTodos();
        } else if (this.getCurrentSelector() === "today") {
          this.printTodayTodos();
        } else if (this.getCurrentSelector().startsWith("tag:")) {
          this.printTagTodos(this.getCurrentSelector().split(":")[1]);
        }
        this.updateLocalStorage();
      });
    });

    // putting date and delete button together
    let todoEnd = document.createElement("div");
    todoEnd.classList.add("todo-end");
    todoEnd.appendChild(newTodoDate);
    todoEnd.appendChild(delButton);

    todoItem.appendChild(doneStatus);
    todoItem.appendChild(newTodo);
    todoItem.appendChild(todoEnd);

    this.updateLocalStorage();
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
    this.updateLocalStorage();
  }

  loadLocalStorage() {
    let todos = JSON.parse(localStorage.getItem("todoList"));
    todos.forEach((tag) => {
      this.addTag(tag.name);
      tag.list.forEach((todo) => {
        this.addTodo(
          todo.title,
          todo.desc,
          todo.dueDate,
          todo.priority,
          todo.tag,
          todo.done
        );
      });
    });
  }

  updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(this.tags));
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
