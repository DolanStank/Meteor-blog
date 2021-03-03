import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';

export const Modal = ({ isOpen, children }) => {

    const modalClassName = isOpen ? 'modal display-block' : 'modal display-none';

    return (
        <div className={modalClassName}>
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
}