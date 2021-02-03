import { Meteor } from 'meteor/meteor';
import { BlogCollection } from '/imports/db/BlogCollection';

const insertBlog = () => BlogCollection.insert({})

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
});
