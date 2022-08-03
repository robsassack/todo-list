export default class Todo {
  constructor(title, desc, dueDate, priority, tag, done) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tag = tag;
    this.done = done;
  }

  setTitle(title) {
    this.title = title;
  }

  setDesc(desc) {
    this.desc = desc;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setTag(tag) {
    this.tag = tag;
  }

  setDone(done) {
    this.done = done;
  }
}
