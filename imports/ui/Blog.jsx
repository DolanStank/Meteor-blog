import React from 'react';

export const Blog = ({ content, title, author, createdAt }) => {
    const time = `${createdAt.getDate()}.${createdAt.getMonth() + 1}. ${createdAt.getFullYear()}`
    return (
        <div className="blog-form">
            <h3 className="blog-title">{title}</h3>
            <p className="blog-author">{author}</p>
            <div className="blog-content">{content}</div>
            <p className="blog-date">{time}</p>
        </div>
    )

}