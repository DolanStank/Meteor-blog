import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { BlogCollection } from '/imports/db/BlogCollection';

createAlias = (blogTitle) => {
    return blogTitle.replace("<br>", "").trim().split(" ").join("-");
}

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

    'blogs.insert'(title, content, isPosted) {

        if (!this.userId) {
            throw new Meteor.Error('user.unauthorized');
        }

        const username = Meteor.users.findOne({_id: this.userId}).username;

        BlogCollection.insert({
            title: title,
            content: content,
            userId: this.userId,
            author: username,
            isPosted: isPosted,
            createdAt: new Date,
            alias: createAlias(title),
        });
    },

    'blogs.remove'(blogId) {
        if (!this.userId) {
            throw new Meteor.Error('user.unauthorized');
        }
        if(!Meteor.users.findOne({_id: this.userId}).isAdmin) {
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
        if(!Meteor.users.findOne({_id: this.userId}).isAdmin && BlogCollection.findOne({_id: blogId}).userId !== this.userId) {
            throw new Meteor.Error('only admin can edit blogs');
        }

        BlogCollection.update(blogId, {...blogData, alias: createAlias(blogData.title)}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    },

})