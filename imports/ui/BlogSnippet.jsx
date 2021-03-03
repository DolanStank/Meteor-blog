import React from 'react';
import ContentEditable from 'react-contenteditable';

export const BlogSnippet = ({ title, author, createdAt }) => {

    const time = `${createdAt.getDate()}.${createdAt.getMonth() + 1}. ${createdAt.getFullYear()}`

    return (
        <div className="blog-snippet">
            <b>
            <p className="title" dangerouslySetInnerHTML={{__html: title}} disabled={true}/>
            </b>
            <p>by: {author} created on: {time}</p>
        </div>
    );
}