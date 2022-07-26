import Todo from './Todo';

export default class Tag {
  constructor(name) {
    this.name = name;
    this.list = [];
  }

  addTodo(title, desc, date, priority, tag) {
    let newTodo = new Todo(title, desc, date, priority, tag);
    this.list.push(newTodo);
  }

  getTodoList() {
    return this.list;
  }
}
