import Tag from './Tag';

export default class Overview {
  constructor() {
    this.tags = [];
  }

  addTag(tag) {
    // console.log("Creating new tag")
    let newTag = new Tag(tag);
    this.tags.push(newTag);
  }
}
