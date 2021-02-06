import React from 'react';
import { Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

export const NavBar = () => {
    const user = useTracker(() => Meteor.user());

    return (
        <nav className="nav">
            <Link to="/">
                <button>Home page</button>
            </Link>
            {user ? (
            <button onClick={() => Meteor.logout()}>Logout</button>
            )
            : ( <div>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Sign in</button>
            </Link></div>
            )}
        </nav>
    );
}