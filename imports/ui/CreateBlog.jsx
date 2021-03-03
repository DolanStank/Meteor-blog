import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Modal } from './Modal';

export const CreateBlog = () => {

    const initialState = {
        title: '',
        content: '',
        isPosted: false
    };

    const [status, setStatus] = useState(initialState);

    const handleChange = e => {
        if (e.target.type === "checkbox") {
            setStatus({...status, [e.target.name]: !status.isPosted});
        } else {
            setStatus({...status, [e.currentTarget.getAttribute("name")]: e.target.value});
        }
    };

    const handlePost = () => {
        onPost(status);
        setStatus(initialState);
        onClose();
    }

    return (
        <Modal>
            <h2>Create a new blog</h2>
            <ContentEditable className="title" html={status.title} onChange={handleChange} name="title" value={status.title}/>
            <ContentEditable className="content" html={status.content} onChange={handleChange} name="content" value={status.content}/>
            <button onClick={handlePost}>post</button>
            <button onClick={onClose}>cancel</button><br />
            <label>Post blog?
                <input type="checkbox" onChange={handleChange} name="isPosted" value={status.isPosted}/>
            </label>
        </Modal>
    );
}