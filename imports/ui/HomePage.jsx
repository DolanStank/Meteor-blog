import React from 'react';
import { Blog } from './Blog';
import { useTracker } from 'meteor/react-meteor-data';
import { BlogCollection } from '/imports/db/BlogCollection';

export const HomePage = () => {

    const { blogs } = useTracker(() => {
        const blogs = BlogCollection.find().fetch();
        return { blogs }
    });

    return (
        <div>
            <h1>Blogs:</h1>
            {blogs.map(blog => (
                <Blog
                    key={blog._id}
                    content={blog.blogContent}
                    author={blog.blogAuthor}
                    createdAt={blog.createdAt}               
                />
            ))}
        </div>
    );
}