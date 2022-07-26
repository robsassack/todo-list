import Tag from './Tag';

export default class Overview {
  constructor() {
    this.tags = [];
  }

  addTag(tag) {
    if (this.tags.length === 0) {
      console.log("Creating new tag")
      let newTag = new Tag(tag);
      this.tags.push(newTag);
    } else if (this.uniqueTag(tag)) {
      console.log("Creating new tag - no repeats")
      let newTag = new Tag(tag);
      this.tags.push(newTag);
    }
  }

  uniqueTag(tag) {
    let repeat = true;
    this.tags.forEach(item => {
      if (item.name === tag) {
        console.log('repeat tag found');
        repeat = false;
      }
    });
    return repeat;
  }
}
