import Overview from './Overview';
import './style.css';

const mainOverview = new Overview();

// if local storage isn't empty, load it
if (localStorage.getItem('todoList') !== null) {
  mainOverview.loadLocalStorage();
  mainOverview.printAllTodos();
}

document.querySelector('#todo-submit').addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  if (!title.trim().length) {
    return;
  }
  const desc = document.querySelector('#desc').value;
  const date = document.querySelector('#dueDate').value;
  const priority = document.querySelector('#priority').value;
  const tag = document.querySelector('#tag').value;

  mainOverview.addTodo(title, desc, date, priority, tag, false);

  mainOverview.printAllTodos();

  const todoForm = document.querySelector('.todo-form');
  const formContainer = document.querySelector('.form-container');
  todoForm.style.visibility = 'hidden';
  formContainer.style.visibility = 'hidden';
  document.querySelector('#title').value = '';
  document.querySelector('#desc').value = '';
  document.querySelector('#dueDate').value = '';
  document.querySelector('#priority').value = 'low';
  document.querySelector('#tag').value = '';
});

document.querySelector('#selector').addEventListener('change', () => {
  const selector = document.querySelector('#selector').value;
  if (selector === 'all') {
    mainOverview.printAllTodos();
  } else if (selector === 'today') {
    mainOverview.printTodayTodos();
  } else if (selector.startsWith('tag:')) {
    const tag = selector.split(':')[1];
    mainOverview.printTagTodos(tag);
  }
});

document.querySelector('#add-todo-menu').addEventListener('click', () => {
  const todoForm = document.querySelector('.todo-form');
  const formContainer = document.querySelector('.form-container');
  todoForm.style.visibility = 'visible';
  formContainer.style.visibility = 'visible';
});

document
  .querySelector('.form-container')
  .addEventListener('click', (e) => {
    if (!document.querySelector('.todo-form').contains(e.target)) {
      const todoForm = document.querySelector('.todo-form');
      const formContainer = document.querySelector('.form-container');
      todoForm.style.visibility = 'hidden';
      formContainer.style.visibility = 'hidden';
    }
  });

mainOverview.printAllTodos();
