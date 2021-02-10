import React from 'react';
import ContentEditable from 'react-contenteditable';

export const Blog = ({ content, title, author, createdAt }) => {
    const time = `${createdAt.getDate()}.${createdAt.getMonth() + 1}. ${createdAt.getFullYear()}`
    return (
        <div className="blog-form">
            <ContentEditable className="title" html={title.html} disabled={true}/>
            <p className="blog-author">{author}</p>
            <ContentEditable className="content" html={content.html} disabled={true}/>
            <p className="blog-date">{time}</p>
        </div>
    )

}