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

        if (!this.userId) {
            throw new Meteor.Error('user.unauthorized');
        }

        // I couldn't find a better way to get usename
        const username = Meteor.users.find({_id: this.userId}).fetch()[0].username;
        BlogCollection.insert({
            title: title,
            content: content,
            userId: this.userId,
            author: username,
            isPosted: true,
            createdAt: new Date
        });
    },

    'blogs.remove'(blogId) {
        if (!this.userId) {
            throw new Meteor.Error('user.unauthorized');
        }
        if(!Meteor.users.find({_id: this.userId}).fetch()[0].isAdmin) {
            throw new Meteor.Error('only admins can remove blogs');
        }
        BlogCollection.remove(blogId, (err) => {
            if(err) {
                console.log(err);
            } 
        })
    },
    

    'blogs.update'(blogId, blogData) {
        if (!this.userId) {
            throw new Meteor.Error('user.unauthorized');
        }
        if(!Meteor.users.find({_id: this.userId}).fetch()[0].isAdmin) {
            throw new Meteor.Error('only admin can edit blogs');
        }
        BlogCollection.update(blogId, blogData, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    },

})