import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';

export const CreateBlog = () => {

    const user = useTracker(() => Meteor.user());
    const history = useHistory();
    
    const title = useRef('');
    const content = useRef('');

    const handelTitleChange = e => {
        title.current = {html: e.target.value};
    }

    const handelContentChange = e => {
        content.current = {html: e.target.value};
    }

    const onPost = (e) => {
        e.preventDefault();
        
        Meteor.call('blogs.insert', title.current, content.current, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                history.push('/');
            }
        })
    }

    const onCancel = (e) => {
        e.preventDefault();
    }

    return (
        <div className="blog-form">
            <form>
                <ContentEditable className="title" html={title.current} onChange={handelTitleChange} />
                <ContentEditable className="content" html={content.current} onChange={handelContentChange} />
                <button onClick={onPost}>post</button>
                <button onClick={onCancel}>cancel</button>
            </form>
        </div>
    );
}