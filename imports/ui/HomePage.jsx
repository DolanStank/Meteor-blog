import React from 'react';
import { BlogSnippet } from './BlogSnippet';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from "react-router-dom";
import { BlogCollection } from '/imports/db/BlogCollection';

export const HomePage = () => {

    const { blogs, isLoading } = useTracker(() => {
        const noDataAvailable = { blogs: [] };
        
        const handler = Meteor.subscribe('blogs');
    
        if (!handler.ready()) {
          return { ...noDataAvailable, isLoading: true };
        }
    
        const blogs = BlogCollection.find().fetch();
    
        return { blogs };
    });


    return (
        <div>
            {isLoading && <p>loading</p>}
            <h1>Blogs:</h1>
            {Meteor.user() &&
                <Link to="createBlog">
                    <button>create new</button>
                </Link>
            }
            {blogs.map(blog => (
                <Link key={blog._id} to={`Blog?id=${blog._id}`}>
                    <BlogSnippet
                        key={blog._id}
                        content={blog.content}
                        title={blog.title}
                        author={blog.author}
                        createdAt={blog.createdAt}               
                    />
                </Link>
            ))}
        </div>
    );
}
