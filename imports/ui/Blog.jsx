import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useLocation } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';
import { BlogCollection } from '/imports/db/BlogCollection';
import { Link } from "react-router-dom";
import { BlogSnippet } from './BlogSnippet';
import { ErrorForm } from './ErrorForm';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const Blog = () => {

    let query = useQuery();
    const history = useHistory();
    const blogId = query.get("id");
    const [edit, setEdit] = useState(true);
    const [blogData, setBlogData] = useState(false);

    const { recentBlogs, noBlog, isLoading } = useTracker(() => {
        const noDataAvailable = { blogs: [], recentBlogs: [], blogData: false, noBlog: false};
        const handler = Meteor.subscribe('blogs');
    
        if (!handler.ready()) {
          return { ...noDataAvailable, isLoading: true };
        }
    
        const blogs = BlogCollection.find().fetch();
        const recentBlogs = BlogCollection.find({}, {sort: {createdAt: -1}}).fetch().slice(0,3);
        if (!BlogCollection.find({_id: blogId}).fetch().length) {
            return {noBlog: true}
        }
        if (blogId !== blogData._id) {
            setBlogData(blogs.find(blog => blog._id === blogId));
        }
    
        return { blogs, recentBlogs };
    });

    const { isAdmin } = useTracker(() => {
        const noDataAvailable = { user: {}};
        const handler = Meteor.subscribe('user.isAdmin');

        if (!handler.ready()) {
            return noDataAvailable;
        }
        const isAdmin = Meteor.users.find().fetch()[0].isAdmin;
        return { isAdmin };
    });

    const deleteBlog = () => {
        Meteor.call('blogs.remove', blogId, (err) => {
            if (err) {
                console.log(err);
            } else {
                history.push("/");
            }

        })
    }

    const handelTitleChange = e => {
        setBlogData({...blogData, title: {html: e.target.value}});
    }

    const handelContentChage = e => {
        setBlogData({...blogData, content: {html: e.target.value}});
    }
    
    const editBlog = () => {
        setEdit(false);
    }

    const onAccept = () => {
        Meteor.call('blogs.update', blogId, blogData, err => {
            if (err) {
                console.log(err);
            } else {
                history.push("/")
            }
        })
    }
    
    const onCancel = () => {
        history.push("/");
    }

    if (isLoading) {
        return (<h1>loading...</h1>)
    }

    if (!Meteor.user()) {
        return (
            <ErrorForm text="you need to login to view blogs!" />
        );
    }

    if (noBlog) {
        return (<ErrorForm text="that blog does not exist" />)
    }
    
    const time = blogData ? `${blogData.createdAt.getDate()}.${blogData.createdAt.getMonth() + 1}. ${blogData.createdAt.getFullYear()}` : "";
    return (
        <>
            <div className="blog-form">
                {!blogData ? <p>loading</p> :
                <>
                    <p className="blog-author">{blogData.author}</p>
                    <ContentEditable 
                        className="title" 
                        html={blogData.title.html} 
                        onChange={handelTitleChange} 
                        disabled={edit}
                    />
                    <ContentEditable 
                        className="content" 
                        html={blogData.content.html} 
                        onChange={handelContentChage}
                        disabled={edit}
                    />
                    <p className="blog-date">{time}</p>

                    {isAdmin && <><button onClick={deleteBlog}>delete</button>
                    {!edit ? 
                    <>
                        <button onClick={onAccept}>accept</button>
                        <button onClick={onCancel}>cancel</button>
                    </>
                    :
                    <button onClick={editBlog}>edit</button>}</>}
                </>
                }
            </div>
            <div className="recent-blogs">
                {recentBlogs.map(blog => (
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
        </>
    )

}