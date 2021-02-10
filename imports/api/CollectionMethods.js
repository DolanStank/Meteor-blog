import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { BlogCollection } from '/imports/db/BlogCollection';

Meteor.methods({
    'userExists'(username, email) {
        check(username, String);
        check(email, String);
        if (Accounts.findUserByUsername(username)) {
            throw new Meteor.Error('userExits.username', 'username already exits in collection');
        }
        if (Accounts.findUserByEmail(email)) {
            throw new Meteor.Error('userExits.email', 'email already exits in collection');
        }
        return true;
    },

    'blogs.insert'(title, content) {
        console.log(content)

        if (!this.userId) {
            throw new Meteor.Error('user not authorized');
        }

        BlogCollection.insert({
            title: title,
            content: content,
            userId: this.userId,
            createdAt: new Date
        });

    }
})