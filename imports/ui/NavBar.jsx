import React from 'react';
import { Link } from "react-router-dom";

export const NavBar = () => {
    
    return (
        <nav className="nav">
            <Link to="/">
                <button>Home page</button>
            </Link>

            <Link to="/login">
                <button>Login</button>
            </Link>

            <Link to="/signup">
                <button>Sign in</button>
            </Link>
        </nav>
    );
}