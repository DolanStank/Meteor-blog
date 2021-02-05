import { check } from 'meteor/check';
import { BlogCollection } from '/imports/db/BlogCollection';

Meteor.Methods({
    'blogs.insert'(content, author) {
        check(content, String);
        check(author, String);
        
        BlogCollection.insert({
            blogContent: content,
            blogAuthor: author,
            createdAt: new Date
        })
    }
})