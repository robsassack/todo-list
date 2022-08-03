import { isToday } from 'date-fns';
import todoDateFormat from './todoDateFormat';
import setPriority from './setPriority';
import Tag from './Tag';
import getCurrentSelector from './getCurrentSelector';

export default class Overview {
  constructor() {
    this.tags = [];
  }

  // adds tag to list
  addTag(tag) {
    if (this.tags.length === 0 || this.uniqueTag(tag)) {
      // creates new tag if no tags exist or if tag is unique
      const newTag = new Tag(tag);
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

  // prints all todos
  printAllTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerText = '';
    this.tags.forEach((tag) => {
      tag.getTodoList().forEach((todo) => {
        const newTodo = this.generateTodo(todo);
        todoList.appendChild(newTodo);
      });
    });
    this.generateDropdown();
    this.updateLocalStorage();
  }

  // print todos with given tag name
  printTagTodos(tag) {
    const todoList = document.querySelector('#todo-list');
    todoList.innerText = '';
    this.tags.forEach((item) => {
      if (item.name === tag) {
        item.getTodoList().forEach((todo) => {
          const newTodo = this.generateTodo(todo);
          todoList.appendChild(newTodo);
        });
      }
    });
    this.generateDropdown();
    this.updateLocalStorage();
  }

  // print todos with today's date
  printTodayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerText = '';
    this.tags.forEach((tag) => {
      tag.getTodoList().forEach((todo) => {
        let date = todo.dueDate;
        date = date.split('-');
        date = new Date(date[0], date[1] - 1, date[2]);
        if (isToday(date)) {
          const newTodo = this.generateTodo(todo);
          todoList.appendChild(newTodo);
        }
      });
    });
    this.generateDropdown();
    this.updateLocalStorage();
  }

  generateDropdown() {
    const selector = document.querySelector('#selector');
    const currentSelector = selector.value;
    selector.innerText = '';
    const allTodos = document.createElement('option');
    allTodos.innerText = 'All';
    allTodos.value = 'all';
    selector.appendChild(allTodos);
    const todayTodos = document.createElement('option');
    todayTodos.innerText = 'Today';
    todayTodos.value = 'today';
    selector.appendChild(todayTodos);
    const separator = document.createElement('option');
    separator.innerText = '──────────';
    separator.disabled = true;
    selector.appendChild(separator);
    this.tags.forEach((tag) => {
      // skip if tag name is blank
      if (tag.name.trim().length) {
        const tagSelect = document.createElement('option');
        tagSelect.innerText = tag.name;
        tagSelect.value = `tag:${tag.name}`;
        selector.appendChild(tagSelect);
      }
    });
    selector.value = currentSelector;
    this.updateLocalStorage();
  }

  generateTodo(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // todo item (tag, title, description, and due date)
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-text');
    const newTodoTag = document.createElement('div');
    newTodoTag.classList.add('todo-tag');
    const newTodoText = document.createElement('div');
    const newTodoTitle = document.createElement('div');
    newTodoTitle.classList.add('todo-title');
    const newTodoDesc = document.createElement('div');
    const newTodoDate = document.createElement('div');
    newTodoDate.classList.add('todo-date');
    newTodo.classList.add(setPriority(todo.priority));
    if (todo.done) {
      newTodo.classList.add('todo-done');
    } else {
      newTodo.classList.remove('todo-done');
    }

    // skip printing tag if blank
    if (todo.tag.trim().length) {
      newTodoTag.innerText = `[${todo.tag}]`;
    }
    newTodoTitle.innerText = `${todo.title}`;
    newTodoDesc.innerText = `${todo.desc}`;
    newTodoDate.innerText = `${todoDateFormat(todo.dueDate)}`;
    newTodo.appendChild(newTodoTag);
    newTodoText.appendChild(newTodoTitle);
    newTodoText.appendChild(newTodoDesc);
    newTodo.appendChild(newTodoText);

    // done status
    const doneStatus = document.createElement('input');
    doneStatus.classList.add('done-status');
    doneStatus.type = 'checkbox';
    doneStatus.checked = todo.done;
    // change done status if clicking on checkbox
    doneStatus.addEventListener('click', () => {
      todo.setDone(doneStatus.checked);
      this.updateLocalStorage();
      if (doneStatus.checked) {
        newTodo.classList.add('todo-done');
      } else {
        newTodo.classList.remove('todo-done');
      }
    });

    // delete button
    const delButton = document.createElement('button');
    delButton.classList.add('del-button');
    delButton.innerText = 'X';
    delButton.addEventListener('click', () => {
      this.deleteTodo(todo);
    });

    // event listener for editing todo
    todoItem.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('done-status')
        || e.target.classList.contains('del-button')
      ) {
        return;
      }
      const todoSubmit = document.querySelector('#todo-submit');
      const editSubmit = document.createElement('button');
      editSubmit.classList.add('edit-submit');
      editSubmit.innerText = 'Confirm Edit';

      const todoForm = document.querySelector('.todo-form');
      const formContainer = document.querySelector('.form-container');
      todoForm.style.visibility = 'visible';
      formContainer.style.visibility = 'visible';

      todoSubmit.replaceWith(editSubmit);

      document.querySelector('#title').value = todo.title;
      document.querySelector('#desc').value = todo.desc;
      document.querySelector('#dueDate').value = todo.dueDate;
      document.querySelector('#priority').value = todo.priority;
      document.querySelector('#tag').value = todo.tag;

      document
        .querySelector('.form-container')
        .addEventListener('click', (container) => {
          if (document.querySelector('.todo-form').contains(container.target)) {
            return;
          }
          todoForm.style.visibility = 'hidden';
          formContainer.style.visibility = 'hidden';
          editSubmit.replaceWith(todoSubmit);

          document.querySelector('#title').value = '';
          document.querySelector('#desc').value = '';
          document.querySelector('#dueDate').value = '';
          document.querySelector('#priority').value = 'low';
          document.querySelector('#tag').value = '';
        });

      editSubmit.addEventListener('click', () => {
        if (!document.querySelector('#title').value.trim().length) {
          return;
        }
        todo.setTitle(document.querySelector('#title').value);
        todo.setDesc(document.querySelector('#desc').value);
        todo.setDueDate(document.querySelector('#dueDate').value);
        todo.setPriority(document.querySelector('#priority').value);
        todo.setTag(document.querySelector('#tag').value);
        this.updateLocalStorage();
        todoForm.style.visibility = 'hidden';
        formContainer.style.visibility = 'hidden';
        editSubmit.replaceWith(todoSubmit);

        document.querySelector('#title').value = '';
        document.querySelector('#desc').value = '';
        document.querySelector('#dueDate').value = '';
        document.querySelector('#priority').value = 'low';
        document.querySelector('#tag').value = '';

        if (getCurrentSelector() === 'all') {
          this.printAllTodos();
        } else if (getCurrentSelector() === 'today') {
          this.printTodayTodos();
        } else if (getCurrentSelector().startsWith('tag:')) {
          this.printTagTodos(getCurrentSelector().split(':')[1]);
        }
        this.updateLocalStorage();
      });
    });

    // putting date and delete button together
    const todoEnd = document.createElement('div');
    todoEnd.classList.add('todo-end');
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
    if (getCurrentSelector() === 'all') {
      this.printAllTodos();
    } else if (getCurrentSelector() === 'today') {
      this.printTodayTodos();
    } else if (getCurrentSelector().startsWith('tag:')) {
      this.printTagTodos(getCurrentSelector().split(':')[1]);
    }
    this.updateLocalStorage();
  }

  loadLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todoList'));
    todos.forEach((tag) => {
      this.addTag(tag.name);
      tag.list.forEach((todo) => {
        this.addTodo(
          todo.title,
          todo.desc,
          todo.dueDate,
          todo.priority,
          todo.tag,
          todo.done,
        );
      });
    });
  }

  updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.tags));
  }
}
