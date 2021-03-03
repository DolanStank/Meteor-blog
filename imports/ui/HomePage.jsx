import React, { useState } from 'react';
import { BlogSnippet } from './BlogSnippet';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from "react-router-dom";
import { BlogCollection } from '/imports/db/BlogCollection';
import { Modal } from './Modal';
import ContentEditable from 'react-contenteditable';

export const HomePage = () => {

    const initialState = {
        title: '',
        content: '',
        isPosted: false
    };

    const [status, setStatus] = useState(initialState);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { isAdmin } = useTracker(() => {
        const handler = Meteor.subscribe('user.isAdmin');

        if (!Meteor.user()) {
            return { isAdmin: false}
        }
        return { isAdmin : handler.ready() ? Meteor.users.findOne().isAdmin : false }
    });

    const { blogs, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('blogs', isAdmin);

        return {
            blogs: BlogCollection.find().fetch(),
            isLoading: !handler.ready(),
         };
    });

    const showModal = () => {
        setModalIsOpen(true);
    }

    const handleChange = e => {
        if (e.target.type === "checkbox") {
            setStatus({...status, [e.target.name]: !status.isPosted});
        } else {
            setStatus({...status, [e.currentTarget.getAttribute("name")]: e.target.value});
        }
    };

    const handlePost = () => {
        Meteor.call('blogs.insert', status.title, status.content, status.isPosted);
        setModalIsOpen(false);
        setStatus(initialState);
    }

    return (
        <div>
            {isLoading && <p>loading</p>}
            <h1>Blogs:</h1>
            {Meteor.user() &&
                <button onClick={showModal}>create new</button>
            }

            <Modal isOpen={modalIsOpen} onPost={handlePost}>
                <h2>Create a new blog</h2>
                    <ContentEditable className="title" html={status.title} onChange={handleChange} name="title" value={status.title}/>
                    <ContentEditable className="content" html={status.content} onChange={handleChange} name="content" value={status.content}/>
                <button onClick={handlePost}>post</button>
                <button onClick={() => setModalIsOpen(false)}>cancel</button><br />
                <label>Post blog?
                    <input type="checkbox" onChange={handleChange} name="isPosted" value={status.isPosted}/>
                </label>
            </Modal>

            {blogs.map(blog => (
                <Link key={blog._id} to={`/Blog/${blog.alias}`}>
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
