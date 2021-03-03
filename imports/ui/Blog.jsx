import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useParams, useHistory } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import { BlogCollection } from '/imports/db/BlogCollection';
import { BlogSnippet } from './BlogSnippet';
import { ErrorForm } from './ErrorForm';
import { Modal } from './Modal';

export const Blog = () => {

    const initialState = {
        title: '',
        content: '',
        isPosted: false
    };

    let { alias } = useParams();
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [status, setStatus] = useState(initialState);

    const { isAdmin } = useTracker(() => {
        const handler = Meteor.subscribe('user.isAdmin');
        if (!Meteor.user()) {
            return { isAdmin: false}
        }
        return { isAdmin : handler.ready() ? Meteor.users.findOne().isAdmin : false }
    });

    const { recentBlogs, blogData, isLoading, blogId } = useTracker(() => {
        const handler = Meteor.subscribe('blogs', isAdmin);

        return {
            blogData: BlogCollection.findOne({ alias: alias }),
            recentBlogs: BlogCollection.find({ alias: { $ne: alias}}, {sort: {createdAt: -1}}).fetch().slice(0, 3),
            isLoading: !handler.ready(),
            blogId: (handler.ready() && BlogCollection.findOne({ alias: alias }))
            ? BlogCollection.findOne({alias: alias})._id : undefined
        }
    }, [alias]);

    const handleDeleteBlog = () => {
        Meteor.call('blogs.remove', blogId);
    }

    const handleChange = e => {
        if (e.target.type === "checkbox") {
            setStatus({...status, [e.target.name]: !status.isPosted});
        } else {
            setStatus({...status, [e.currentTarget.getAttribute("name")]: e.target.value});
        }
    };

    const handleEdit = () => {
        setStatus({
            title: blogData.title,
            content: blogData.content,
            isPosted: blogData.isPosted,
        });
        setModalIsOpen(true);
    }

    const handlePost = () => {
        const newBlogData = {
            ...blogData,
            title: status.title,
            content: status.content,
            isPosted: status.isPosted
        }
        console.log(blogId);
        Meteor.call('blogs.update', blogId, newBlogData, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(res);
        });
        setModalIsOpen(false);
        history.push("/");
    };

    if (isLoading) {
        return (<h1>loading...</h1>)
    }

    if (!Meteor.user()) {
        return (
            <ErrorForm text="you need to login to view blogs!" />
        );
    }

    if (!blogData) {
        return (<ErrorForm text="that blog does not exist" />)
    }

    const time = blogData ? `${blogData.createdAt.getDate()}.${blogData.createdAt.getMonth() + 1}. ${blogData.createdAt.getFullYear()}` : "";
    return (
        <>
            <Modal isOpen={modalIsOpen} onPost={handlePost}>
                <h2>Edit this blog</h2>
                    <ContentEditable className="title" html={status.title} onChange={handleChange} name="title" value={status.title}/>
                    <ContentEditable className="content" html={status.content} onChange={handleChange} name="content" value={status.content}/>
                <button onClick={handlePost}>Accept edit</button>
                <button onClick={() => setModalIsOpen(false)}>cancel</button><br />
                <label>Post blog
                    <input type="checkbox" onChange={handleChange} name="isPosted" checked={status.isPosted}/>
                </label>
            </Modal>

            <div className="blog-form">
                {!blogData ? <p>loading</p> :
                <>
                    <p className="blog-author">{blogData.author}</p>
                    <p
                        className="title"
                        dangerouslySetInnerHTML={{__html: blogData.title}}
                        onChange={handleChange}
                    ></p>
                    <p
                        className="content"
                        dangerouslySetInnerHTML={{__html: blogData.content}}
                        onChange={handleChange}
                    ></p>
                    <p className="blog-date">{time}</p>

                    {(isAdmin || blogData.userId === Meteor.userId()) && <><button onClick={handleDeleteBlog}>delete</button>
                    <button onClick={handleEdit}>edit</button></>}
                </>
                }
            </div>
            <div className="recent-blogs">
                {recentBlogs.map(blog => (
                    <Link key={blog._id} to={`/Blog/${blog._id}`}>
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
        </>
    )

}