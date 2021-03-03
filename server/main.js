import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/CollectionMethods';
import '/imports/api/BlogPublication';

//defining admin account
const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup(() => {

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })

    const userId = Accounts.findUserByUsername(SEED_USERNAME)._id;
    Meteor.users.update(userId, {
      $set: {
        isAdmin: true
      }
    });
  }
});
