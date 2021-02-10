import React from 'react';
import { Blog } from './Blog';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from "react-router-dom";
import { BlogCollection } from '/imports/db/BlogCollection';

export const HomePage = () => {

    const { blogs } = useTracker(() => {
        const blogs = BlogCollection.find().fetch();
        return { blogs }
    });
    

    return (
        <div>
            <h1>Blogs:</h1>
            <Link to="createBlog">
                <button>create new</button>
            </Link>
            {blogs.map(blog => (
                <Blog
                    key={blog._id}
                    content={blog.content}
                    title={blog.title}
                    author={blog.userId}
                    createdAt={blog.createdAt}               
                />
            ))}
        </div>
    );
}