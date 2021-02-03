import React from 'react';

export const Blog = () => {
    
    return (
        <div className="blog-form">
            <h3 className="blog-title">Blog title</h3>
            <p className="blog-author">Author of blog</p>
            <div className="blog-content" contentEditable="true"></div>
            <p className="blog-date">time of posting</p>
        </div>
    )

}