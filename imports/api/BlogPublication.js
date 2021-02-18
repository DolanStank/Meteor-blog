import { Meteor } from 'meteor/meteor';
import { BlogCollection } from '/imports/db/BlogCollection';

Meteor.publish('blogs', function publishBlogs() {
    return BlogCollection.find({});
});

Meteor.publish('user.isAdmin', function userIsAdmin() {
    return Meteor.users.find({_id: this.userId});
})
