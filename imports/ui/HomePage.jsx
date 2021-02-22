import React from 'react';
import { BlogSnippet } from './BlogSnippet';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from "react-router-dom";
import { BlogCollection } from '/imports/db/BlogCollection';

export const HomePage = () => {

    const { blogs, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('blogs');

        return {
            blogs: BlogCollection.find().fetch(),
            isLoading: !handler.ready()
        };
    }, []);

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
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
