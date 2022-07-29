export default class Todo {
  constructor(title, desc, dueDate, priority, tag, done) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tag = tag;
    this.done = done;
  }
}
