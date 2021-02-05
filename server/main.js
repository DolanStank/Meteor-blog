import { Meteor } from 'meteor/meteor';
import { BlogCollection } from '/imports/db/BlogCollection';

const insertBlog = (content, author) => BlogCollection.insert({
  blogContent: content,
  blogAuthor: author,
  createdAt: new Date
})

Meteor.startup(() => {
  if (BlogCollection.find().count() === 0) {
    insertBlog("lorem ipsum", "Lan Pavletič");
  }
});

console.log(BlogCollection.find().fetch());