import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { BlogCollection } from '/imports/db/BlogCollection';
import '/imports/api/CollectionMethods';

const insertBlog = (content, title, author) => BlogCollection.insert({
  Title: title,
  Content: content,
  Author: author,
  createdAt: new Date
})

//defining admin account
const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup(() => {

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  }

  if (BlogCollection.find().count() === 0) {
    insertBlog("lorem ipsum", "random latin text", "emerald3032");
  }
});
