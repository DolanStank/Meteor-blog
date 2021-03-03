import { Meteor } from 'meteor/meteor';
import { BlogCollection } from '/imports/db/BlogCollection';

Meteor.publish('blogs', function publishBlogs(isAdmin) {
    return BlogCollection.find(!isAdmin ? {$or: [{isPosted: true}, {userId: this.userId}]}: {});
});

Meteor.publish('user.isAdmin', function userIsAdmin() {
    return Meteor.users.find({_id: this.userId});
})
